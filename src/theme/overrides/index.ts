import { Settings } from '@configs/types';

import MuiAccordion from './accordion';
import MuiAlerts from './alerts';
import MuiAutocomplete from './autocomplete';
import MuiAvatar from './avatars';
import MuiBackdrop from './backdrop';
import MuiBadge from './badge';
import MuiBreadcrumb from './breadcrumbs';
import MuiButton from './button';
import MuiButtonGroup from './button-group';
import MuiCard from './card';
import MuiCheckbox from './checkbox';
import MuiChip from './chip';
import MuiDataGrid from './dataGrid';
import MuiDialog from './dialog';
import MuiDivider from './divider';
import MuiDrawer from './drawer';
import FabButton from './fab';
import MuiIconButton from './icon-button';
import MuiInput from './input';
import MuiLink from './link';
import MuiList from './list';
import MuiMenu from './menu';
import MuiPagination from './pagination';
import MuiPaper from './paper';
import MuiPopover from './popover';
import MuiProgress from './progress';
import MuiRadio from './radio';
import MuiRating from './rating';
import MuiSelect from './select';
import MuiSlider from './slider';
import MuiSnackbar from './snackbar';
import MuiSwitches from './switches';
import MuiTable from './table';
import MuiTabs from './tabs';
import MuiTimeline from './timeline';
import MuiToggleButton from './toggleButton';
import MuiTooltip from './tooltip';
import MuiTypography from './typography';

const Overrides = (settings: Settings) => {
  const { skin } = settings;

  const chip = MuiChip();
  const list = MuiList();
  const menu = MuiMenu();
  const tabs = MuiTabs();
  const radio = MuiRadio();
  const input = MuiInput();
  const tables = MuiTable();
  const alerts = MuiAlerts();
  const button = MuiButton();
  const rating = MuiRating();
  const slider = MuiSlider();
  const cards = MuiCard(skin);
  const avatars = MuiAvatar();
  const divider = MuiDivider();
  const tooltip = MuiTooltip();
  const fabButton = FabButton();
  const dialog = MuiDialog(skin);
  const checkbox = MuiCheckbox();
  const backdrop = MuiBackdrop();
  const dataGrid = MuiDataGrid();
  const progress = MuiProgress();
  const drawer = MuiDrawer(skin);
  const switches = MuiSwitches();
  const timeline = MuiTimeline();
  const popover = MuiPopover(skin);
  const accordion = MuiAccordion();
  const pagination = MuiPagination();
  const snackbar = MuiSnackbar(skin);
  const breadcrumb = MuiBreadcrumb();
  const buttonGroup = MuiButtonGroup();
  const autocomplete = MuiAutocomplete(skin);

  return Object.assign(
    chip,
    list,
    menu,
    tabs,
    cards,
    radio,
    input,
    alerts,
    button,
    dialog,
    rating,
    slider,
    drawer,
    tables,
    avatars,
    divider,
    MuiLink,
    popover,
    tooltip,
    checkbox,
    backdrop,
    MuiBadge,
    dataGrid,
    MuiPaper,
    progress,
    snackbar,
    switches,
    timeline,
    accordion,
    MuiSelect,
    fabButton,
    breadcrumb,
    pagination,
    buttonGroup,
    autocomplete,
    MuiIconButton,
    MuiTypography,
    MuiToggleButton
  );
};

export default Overrides;
