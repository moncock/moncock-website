// https://docs.ethers.org/v6/getting-started/
let provider = null;
let signer = null;
let wallet = null;
let contract = null;
let token = null;
let reader = new ethers.Contract(CONTRACT_ADDR, CONTRACT_ABI, new ethers.JsonRpcProvider(CHAIN_RPC));
let rsupply = MAX_SUPPLY;
let minted_out = false;
let addr_proof = [];
let proof_cache = {};
let raw_chain_id = null;

// main
update_supply();
let tweet_modal = new bootstrap.Modal($('.modal')[0]);
$('.btn-tweet').attr('href', 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(TWEET_TEXT));

// enable tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

// connect button
$('#connect').click(async _ => {
  if (window.ethereum === undefined) {
    alert('Please open by MetaMask browser');
    return;
  }

  // press button effect
  $('#connect').addClass('disabled');

  // connect metamask
  provider = new ethers.BrowserProvider(window.ethereum)
  signer = await provider.getSigner();

  // switch chain
  let changed = await switch_chain();
  if (changed) return;

  console.log('💬', 'connecting wallet..');

  // 1) check mint enabled
  /* reduce page load
  let mint_enabled = await reader.getFunction('mintEnabled').staticCall();
  if (!mint_enabled) {
    show_mint_disabled();
    return;
  }
  */

  // 2) check whitelist
  if (PROOF_URL != null) {
    let mm_addr = signer.address.toLowerCase();
    let c1 = mm_addr[2]; // 0x[_]
    let proofs = proof_cache[c1];
    if (!proofs) {
      let url = PROOF_URL + `${c1}.json?t=${+(new Date())}`;
      try {
        proofs = await $.get(url);
      }
      catch (err) {
        console.error(err);
        proofs = {};
      }
      proof_cache[c1] = proofs;
    }
    addr_proof = proofs[mm_addr] || [];
    let pass = addr_proof.length > 0;
    console.log(addr_proof, proof_cache);
    if (!pass) {
      show_wl_only();
      return;
    }
  }

  // get remaining qty
  let minted_qty = await reader.getFunction('numberMinted').staticCall(signer.address);
  let remaining_qty = MINT_PER_WALLET - parseInt(minted_qty);
  if (MAX_SUPPLY > 0) remaining_qty = Math.min(remaining_qty, rsupply);

  // update connect/disconnect buttons
  hide_connect();
  show_disconnect();

  // 1) mintable
  if (remaining_qty > 0) {
    $('#mint_qty')
      .attr('max', remaining_qty)
      .val(remaining_qty)
      .removeClass('d-none');
    update_mint_button(remaining_qty)
      .removeClass('d-none');
  }
  // 2) minted
  else {
    show_minted();
  }
});
$('#disconnect').click(_ => {
  $('#connect')
    .removeClass('disabled')
    .removeClass('d-none');
  $('#mint_qty')
    .attr('disabled', false)
    .addClass('d-none');
  $('#mint')
    .removeClass('disabled')
    .addClass('d-none');
  $('#minting').addClass('d-none');
  $('#msg').addClass('d-none');
  $('#disconnect').addClass('d-none');
  tweet_modal.hide();
});

// mint slider
$('#mint_qty').on('input', function() {
  let qty = +$(this).val();
  update_mint_button(qty);
});

// mint button
$('#mint').click(async _ => {
  $('#mint_qty').attr('disabled', true);
  $('#mint').addClass('d-none');
  $('#minting').removeClass('d-none');
  // recheck chain before mint
  let [ok, msg] = await validate_chain();
  if (!ok) {
    reset_mint_button();
    alert(msg);
    return;
  }
  let qty = +$('#mint').attr('qty');
  // prepare buy with ERC20
  if (erc20_mint && paid_mint) {
    token = new ethers.Contract(TOKEN_ADDR, ERC20_ABI, signer);
    let balance = await token.getFunction('balanceOf').staticCall(signer.address);
    let allowance = await token.getFunction('allowance').staticCall(signer.address, CONTRACT_ADDR);
    let total_price = ethers.parseUnits((MINT_PRICE * qty).toString(), 18);

    console.log('balance     :', balance);
    console.log('allowance   :', allowance);
    console.log('total price :', total_price);

    // token not enough
    if (balance < total_price) {
      reset_mint_button();
      alert(`$${TOKEN_SYMBOL} is not enough`);
      return;
    }
    // approve more allowance
    if (allowance < total_price) {
      try {
        let tx = await token.getFunction('approve').send(CONTRACT_ADDR, total_price);
        let receipt = await tx.wait();
        if (receipt.status != 1) { // 1 success, 0 revert
          reset_mint_button();
          console.error('approve error', receipt);
          return;
        }
      }
      catch (error) {
        reset_mint_button();
        console.error('approve error', error);
        return;
      }
    }
  }
  // mint
  contract = new ethers.Contract(CONTRACT_ADDR, CONTRACT_ABI, signer);
  mint_by_gas_rate(contract, qty, addr_proof, MINT_GAS_RATE)
    .then(tx => {
      console.log(tx);
      return tx.wait();
    })
    .then(receipt => { // https://docs.ethers.org/v6/api/providers/#TransactionReceipt
      console.log(receipt);
      $('#minting').addClass('d-none');
      if (receipt.status != 1) { // 1 success, 0 revert
        alert(JSON.stringify(receipt.toJSON()));
        $('#mint_qty').attr('disabled', false);
        $('#mint').removeClass('d-none');
        return;
      }
      if (TWEET_TEXT) tweet_modal.show();
      play_party_effect();
      show_minted();
    })
    .catch(e => {
      reset_mint_button();
      alert(e);
    });
});

if (window.ethereum) {
  // reconnect when switch account
  window.ethereum.on('accountsChanged', function (accounts) {
    if (minted_out) return;
    console.log('💬', 'changed account');
    $('#disconnect').click();
    is_chain_ready(_ => $('#connect').click());
  });
  // disconnect when switch chain
  window.ethereum.on('chainChanged', function (networkId) {
    raw_chain_id = networkId;
    if (minted_out) return;
    console.log('💬', 'changed chain');
    $('#disconnect').click();
    is_chain_ready(_ => $('#connect').click());
  });
}

// web3 functions
function update_supply() {
  $('#supply').html('Minted: ...');
  if (MAX_SUPPLY > 0) {
    reader.getFunction('remainingSupply').staticCall().then(s => {
      rsupply = parseInt(s);
      let minted = MAX_SUPPLY - rsupply;
      $('#supply').html(`Minted: ${minted}/${MAX_SUPPLY}`);
      // minted out ?
      minted_out = minted >= MAX_SUPPLY;
      if (!minted_out)
        $('#connect').removeClass('disabled');
      else
        show_minted_out();
    });
  }
  else { // open edition
    reader.getFunction('totalSupply').staticCall().then(s => {
      let minted = parseInt(s);
      $('#supply').html(`Minted: ${minted}/∞`);
      $('#connect').removeClass('disabled');
    });
  }
}
function is_chain_ready(callback) {
  let ready = parseInt(raw_chain_id) == CHAIN_ID;
  if (ready && callback) callback();
  return ready;
}
function handle_chain_exception(err) {
  let msg = `Please change network to [${CHAIN_NAME}] before mint.`;
  alert(`${msg}\n\n----- Error Info -----\n[${err.code}] ${err.message}`);
  $('#connect').removeClass('disabled');
}
async function validate_chain() {
  // https://ethereum.stackexchange.com/questions/134610/metamask-detectethereumprovider-check-is-connected-to-specific-chain
  let { chainId } = await provider.getNetwork();
  raw_chain_id = chainId;
  let ok = is_chain_ready();
  let msg = ok ? null : `Please change network to [${CHAIN_NAME}] before mint.`;
  return [ ok, msg ];
}
async function switch_chain() {
  // https://docs.metamask.io/wallet/reference/wallet_addethereumchain/
  let [ok, _] = await validate_chain();
  if (ok) return false;
  // switch chain
  try {
    await window.ethereum.request({
      "method": "wallet_switchEthereumChain",
      "params": [
        {
          "chainId": "0x" + CHAIN_ID.toString(16),
        }
      ]
    });
    return true;
  }
  // if chain not found, add chain
  catch(error) {
    if ([-32603, 4902].includes(error.code)) { // chain not added
      try {
        await window.ethereum.request({
          "method": "wallet_addEthereumChain",
          "params": [
            {
              "chainId": "0x" + CHAIN_ID.toString(16),
              "chainName": CHAIN_NAME,
              "rpcUrls": [
                CHAIN_RPC,
              ],
              //"iconUrls": [
              //  "https://xdaichain.com/fake/example/url/xdai.svg",
              //  "https://xdaichain.com/fake/example/url/xdai.png"
              //],
              "nativeCurrency": {
                "name": CHAIN_SYMBOL,
                "symbol": CHAIN_SYMBOL,
                "decimals": 18
              },
              "blockExplorerUrls": [
                CHAIN_EXPLORER,
              ]
            }
          ]
        });
      }
      catch(error) {
        handle_chain_exception(error);
      }
    }
    else {
      handle_chain_exception(error);
    }
    return true;
  }
}
async function mint_by_gas_rate(contract, qty, proof, gas_rate=1) {
  if ((gas_rate == 1) && (erc20_mint || free_mint)) {
    return contract.getFunction('mint').send(qty, proof);
  }
  let mint_fn = contract.getFunction('mint');
  let params = [ qty, proof ];
  let custom = {};
  // value
  if (eth_mint && paid_mint) {
    let wei = ethers.parseEther((MINT_PRICE * qty).toString());
    custom.value = wei;
  }
  // gas rate
  if (gas_rate != 1) {
    let gas_limit = await mint_fn.estimateGas(...params);
    gas_limit = Math.ceil(Number(gas_limit) * gas_rate);
    custom.gasLimit = gas_limit;
  }
  return mint_fn.send(...params, custom);
}
async function load_contract_obj() { // for console use
  provider = new ethers.BrowserProvider(window.ethereum)
  signer = await provider.getSigner();
  let [ok, msg] = await validate_chain();
  if (!ok) { console.warn(msg); return; }
  contract = new ethers.Contract(CONTRACT_ADDR, CONTRACT_ABI, signer);
  console.log('done');
}

// common
function short_addr(addr) {
  return addr.substr(0, 5) + '...' + addr.slice(-4);
}
function play_party_effect() {
  party.confetti(document.body, {
      count: 120,
      size: 2,
  });
}
function update_mint_button(qty) {
  let label = 'FREE';
  if (paid_mint) {
    let sum_price = MINT_PRICE * qty;
    sum_price = sum_price.toLocaleString('en-US', { maximumFractionDigits: 6 });
    label = `${sum_price} ${TOKEN_SYMBOL}`;
  }
  return $('#mint')
          .text(`Mint`) //.text(`Mint x${qty} (${label})`) --- custom (1/1) mint text
          .attr('qty', qty);
}
function reset_mint_button() {
  $('#mint_qty').attr('disabled', false);
  $('#mint').removeClass('d-none');
  $('#minting').addClass('d-none');
}
function show_msg(msg, auto=false) {
  hide_connect();
  $('#msg').text(msg).removeClass('d-none');
  if (auto) show_disconnect();
}
function hide_connect() {
  return $('#connect').addClass('d-none');
}
function show_disconnect() {
  let btn = $('#disconnect').removeClass('d-none');
  if (signer != null) btn.text(`Disconnect ${short_addr(signer.address)}`);
  return btn;
}
let show_minted = _ => show_msg('Minted');
let show_wl_only = _ => show_msg("You're not eligible", true);
let show_minted_out = _ => show_msg('Minted Out');
let show_mint_disabled = _ => show_msg('Mint disabled');

// aliases
let free_mint = MINT_PRICE == 0;
let paid_mint = MINT_PRICE > 0;
let erc20_mint = TOKEN_SYMBOL != CHAIN_SYMBOL;
let eth_mint  = TOKEN_SYMBOL == CHAIN_SYMBOL;
