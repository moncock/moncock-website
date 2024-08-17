'use client';
import { Grid, Theme } from '@mui/material';
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
    galleryContainer: {
      backgroundColor: theme.palette.secondary.main,
      width: '100%',
      padding: theme.spacing(10),
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    textEvent: {
      fontSize: 80,
      color: theme.palette.common.white,
      textShadow: `8px 8px ${theme.palette.primary.main}`,
    },
    cardEvent: {
      width: 180,
      paddingTop: '10px',
      paddingRight: '10px',
      paddingLeft: '10px',
      backgroundColor: theme.palette.primary.main,
      borderRadius: '10px',
      boxShadow: `5px 5px 20px ${theme.palette.grey[800]}`,
      marginLeft: 20,
    },
    cardContent: {
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
    },
    textItemEvent: {
      color: theme.palette.common.white,
    },
    buttonSeeMore: {
      padding: '10px 50px 10px 50px',
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
      boxShadow: `5px 5px 5px ${theme.palette.grey[800]}`,
      '&:hover': {
        backgroundColor: theme.palette.grey[200],
      },
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
    'https://firebasestorage.googleapis.com/v0/b/moncock-ba57f.appspot.com/o/moncock%2FCckk_008.PNG?alt=media&token=ac7d6d68-bd46-4f94-a77d-41187d3e64fc',
    'https://firebasestorage.googleapis.com/v0/b/moncock-ba57f.appspot.com/o/moncock%2FCckk_009.PNG?alt=media&token=fc919d98-68ec-41aa-b162-69c6d2cccecd',
    'https://firebasestorage.googleapis.com/v0/b/moncock-ba57f.appspot.com/o/moncock%2FCckk_010.PNG?alt=media&token=c6502c3b-49d9-4569-915d-c7f4eb21c22a',
  ];
  const [loading, setLoading] = useState(true);

  useEffect(() => setLoading(false), []);

  if (loading) {
    return null;
  }

  return (
    <Grid container className={classes.container} sx={{ mb: 8 }}>
      <Grid
        item
        sx={{
          height: 500,
          backgroundColor: theme.palette.background.default,
          width: '100%',
        }}
      ></Grid>

      <Grid item container className={classes.galleryContainer}>
        <Grid
          item
          style={{
            animation: `swipeLeft 10000ms linear infinite`,
            display: 'flex',
            flexDirection: 'row',
            marginBottom: 50,
          }}
        >
          {listGallery?.map((item) => (
            <Grid style={{ display: 'flex', width: 200 }}>
              <img
                style={{ height: '100%', width: '100%' }}
                src={item}
                alt={item}
              />
            </Grid>
          ))}
        </Grid>
        <Grid
          item
          style={{
            animation: `swipeRight 10000ms linear infinite`,
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          {listGallery?.map((item) => (
            <Grid style={{ display: 'flex', width: 200 }}>
              <img
                style={{ height: '100%', width: '100%' }}
                src={item}
                alt={item}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
