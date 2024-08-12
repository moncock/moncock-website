'use client';
import {
    Button,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Theme,
    Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles((theme: Theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignItems: 'center'
    },
    eventContainer: {
        backgroundColor: theme.palette.secondary.main,
        width: '100%',
        padding: theme.spacing(10),
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    textEvent: {
        fontSize: 80,
        color: theme.palette.common.white,
        textShadow: `8px 8px ${theme.palette.primary.main}`
    },
    cardEvent: {
        width: 180,
        paddingTop: '10px',
        paddingRight: '10px',
        paddingLeft: '10px',
        backgroundColor: theme.palette.primary.main,
        borderRadius: '10px',
        boxShadow: `5px 5px 20px ${theme.palette.grey[800]}`,
        marginLeft: 20
    },
    cardContent: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    },
    textItemEvent: {
        color: theme.palette.common.white
    },
    buttonSeeMore: {
        padding: '10px 50px 10px 50px',
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black,
        boxShadow: `5px 5px 5px ${theme.palette.grey[800]}`,
        '&:hover': {
            backgroundColor: theme.palette.grey[200]
        }
    }
}));

export default function HomePage() {
    const classes = useStyles();
    const theme = useTheme();

    const listEvent = [
        {
            id: '66b24cbc48ce87925fdffd7a',
            name: 'Event 1',
            img: 'https://firebasestorage.googleapis.com/v0/b/moncock-ba57f.appspot.com/o/moncock%2FCckk_001.PNG?alt=media&token=d60adc4a-e358-499c-9fe4-680b39eb0602'
        },
        {
            id: '66b24cbc48ce87925fdffd7b',
            name: 'Event 2',
            img: 'https://firebasestorage.googleapis.com/v0/b/moncock-ba57f.appspot.com/o/moncock%2FCckk_002.PNG?alt=media&token=93f797fb-bdb1-4a69-a1ce-e55f03f12a76'
        },
        {
            id: '66b24cbc48ce87925fdffd7c',
            name: 'Event 3',
            img: 'https://firebasestorage.googleapis.com/v0/b/moncock-ba57f.appspot.com/o/moncock%2FCckk_003.PNG?alt=media&token=aff2ff9d-4dc0-4e23-b71d-19b301f6c733'
        },
        {
            id: '66b24cbc48ce87925fdffd7d',
            name: 'Event 4',
            img: 'https://firebasestorage.googleapis.com/v0/b/moncock-ba57f.appspot.com/o/moncock%2FCckk_004.PNG?alt=media&token=8814f750-5590-47e5-9b1a-3e8a8313cc44'
        },
        {
            id: '66b24cbc48ce87925fdffd7e',
            name: 'Event 5',
            img: 'https://firebasestorage.googleapis.com/v0/b/moncock-ba57f.appspot.com/o/moncock%2FCckk_005.PNG?alt=media&token=92ce1a25-05ba-4431-af73-f5b06e45c856'
        }
    ];

    return (
        <Grid container className={classes.container} sx={{ mb: 8 }}>
            <Grid
                item
                sx={{
                    height: 400,
                    backgroundColor: theme.palette.background.default,
                    width: '100%'
                }}
            >
                <Typography>Img</Typography>
            </Grid>

            <Grid item container className={classes.eventContainer}>
                <Grid item>
                    <Typography className={classes.textEvent}>EVENT</Typography>
                </Grid>
                <Grid item sx={{ display: 'flex' }}>
                    {listEvent
                        ?.filter((item) => !!item)
                        .map((item) => (
                            <Card key={item?.id} className={classes.cardEvent}>
                                <CardMedia
                                    component="img"
                                    sx={{ height: 150, borderRadius: 3 }}
                                    image={item?.img}
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography
                                        variant="h5"
                                        className={classes.textItemEvent}
                                    >
                                        {item?.name || ''}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        size="large"
                        className={classes.buttonSeeMore}
                    >
                        <Typography variant="h2">See More</Typography>
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}
