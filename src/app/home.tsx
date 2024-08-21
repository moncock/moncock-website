'use client';
import { Grid, Link, Theme, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      display: 'flex',
      justifyContent: 'flex-start',
      flexDirection: 'column',
      alignItems: 'center',
    },
    bannerContainer: {
      height: 500,
      backgroundColor: theme.palette.customColors.backgroundBanner,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    galleryContainer: {
      backgroundColor: theme.palette.customColors.backgroundGallery,
      width: '100%',
      padding: theme.spacing(10),
      alignItems: 'center',
      display: 'flex',
    },
    galleryBoxSlideLeft: {
      animation: `swipeLeft 10000ms linear infinite`,
      display: 'flex',
      flexDirection: 'row',
      marginBottom: 50,
    },
    galleryBoxSlideRight: {
      animation: `swipeRight 10000ms linear infinite`,
      display: 'flex',
      flexDirection: 'row',
    },
    teamSupportContainer: {
      backgroundColor: theme.palette.customColors.backgroundTeamSupport,
      width: '100%',
      paddingTop: theme.spacing(15),
      paddingBottom: theme.spacing(20),
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
    },
    textSupport: {
      color: theme.palette.common.white,
      textDecoration: 'underline',
    },
    boxTextSupport: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 50,
    },
    footerContainer: {
      backgroundColor: theme.palette.customColors.backgroundFooter,
      width: '100%',
      paddingTop: theme.spacing(15),
      paddingBottom: theme.spacing(20),
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
    },
    boxImgMoncock: {
      display: 'flex',
      width: 300,
    },
    boxImg: {
      display: 'flex',
      width: 200,
    },
    img: {
      height: '100%',
      width: '100%',
    },
  }),
  {
    name: 'MuiCustomStyle',
  }
);

export default function HomePage() {
  const classes = useStyles();
  const theme = useTheme();

  const listGallery = [
    'https://firebasestorage.googleapis.com/v0/b/moncock-ba57f.appspot.com/o/moncock%2FCckk_001.PNG?alt=media&token=d60adc4a-e358-499c-9fe4-680b39eb0602',
    'https://firebasestorage.googleapis.com/v0/b/moncock-ba57f.appspot.com/o/moncock%2FCckk_002.PNG?alt=media&token=93f797fb-bdb1-4a69-a1ce-e55f03f12a76',
    'https://firebasestorage.googleapis.com/v0/b/moncock-ba57f.appspot.com/o/moncock%2FCckk_003.PNG?alt=media&token=aff2ff9d-4dc0-4e23-b71d-19b301f6c733',
    'https://firebasestorage.googleapis.com/v0/b/moncock-ba57f.appspot.com/o/moncock%2FCckk_004.PNG?alt=media&token=8814f750-5590-47e5-9b1a-3e8a8313cc44',
    'https://firebasestorage.googleapis.com/v0/b/moncock-ba57f.appspot.com/o/moncock%2FCckk_005.PNG?alt=media&token=92ce1a25-05ba-4431-af73-f5b06e45c856',
    'https://firebasestorage.googleapis.com/v0/b/moncock-ba57f.appspot.com/o/moncock%2FCckk_006.PNG?alt=media&token=afd718cd-35d7-4579-ac68-51a472327c59',
    'https://firebasestorage.googleapis.com/v0/b/moncock-ba57f.appspot.com/o/moncock%2FCckk_007.PNG?alt=media&token=2f8e2c0b-1d03-4961-92ee-e0ed4d991ae8',
    'https://firebasestorage.googleapis.com/v0/b/moncock-ba57f.appspot.com/o/moncock%2FCckk_009.PNG?alt=media&token=fc919d98-68ec-41aa-b162-69c6d2cccecd',
    './images/pfp/Cckk_011.PNG',
    './images/pfp/Cckk_018.PNG',
    './images/pfp/Cckk_020.PNG',
    './images/pfp/Cckk_042.jpeg',
    './images/pfp/Cckk_056.png',
    './images/pfp/Cckk_061.jpg',
  ];
  const [loading, setLoading] = useState(true);

  useEffect(() => setLoading(false), []);

  if (loading) {
    return null;
  }

  return (
    <Grid container className={classes.container}>
      <Grid item className={classes.bannerContainer}>
        <Grid item className={classes.boxImgMoncock}>
          <img
            className={classes.img}
            src="./images/pfp/moncock_pic.PNG"
            alt="moncock_pic"
          />
        </Grid>
        <Typography
          style={{
            fontSize: 120,
            color: theme.palette.primary.main,
            marginLeft: 20,
          }}
        >
          Welcome moncock
        </Typography>
      </Grid>
      {!!listGallery && (
        <Grid item container className={classes.galleryContainer}>
          <Grid item className={classes.galleryBoxSlideLeft}>
            {listGallery?.map((item) => (
              <Grid key={item} className={classes.boxImg}>
                <img className={classes.img} src={item} alt={item} />
              </Grid>
            ))}
          </Grid>
          <Grid item className={classes.galleryBoxSlideRight}>
            {listGallery?.map((item) => (
              <Grid key={item} className={classes.boxImg}>
                <img className={classes.img} src={item} alt={item} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}
      <Grid item container className={classes.teamSupportContainer}>
        <Grid item style={{ marginBottom: 50 }}>
          <Typography
            variant="h1"
            style={{
              textAlign: 'center',
              color: theme.palette.common.white,
              fontSize: 70,
            }}
          >
            Team & Support
          </Typography>
        </Grid>
        <Grid
          item
          container
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Grid
            item
            style={{
              display: 'flex',
              marginRight: 200,
            }}
          >
            <Grid item className={classes.boxImg}>
              <img
                className={classes.img}
                src="./images/twit_logo.jpg"
                alt="twit_logo"
              />
            </Grid>
            <Grid item className={classes.boxTextSupport}>
              <Link href="https://x.com/monad_xyz" underline="always">
                <Typography variant="h2" className={classes.textSupport}>
                  @monad_xyz
                </Typography>
              </Link>
              <Link href="https://x.com/monadthailand" underline="always">
                <Typography variant="h2" className={classes.textSupport}>
                  @monadthailand
                </Typography>
              </Link>
              <Link href="https://x.com/moncock_xyz" underline="always">
                <Typography variant="h2" className={classes.textSupport}>
                  @moncock_xyz
                </Typography>
              </Link>
            </Grid>
          </Grid>

          <Grid
            item
            style={{
              display: 'flex',
            }}
          >
            <Grid item className={classes.boxImg}>
              <img
                className={classes.img}
                src="./images/discord_logo.png"
                alt="discord_logo"
              />
            </Grid>
            <Grid item className={classes.boxTextSupport}>
              <Typography variant="h2" className={classes.textSupport}>
                Discord channel
              </Typography>
              <Link href="https://discord.gg/monad" underline="always">
                <Typography variant="h2" className={classes.textSupport}>
                  @Monad
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* <Grid item container className={classes.footerContainer}></Grid> */}
    </Grid>
  );
}
