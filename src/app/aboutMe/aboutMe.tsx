'use client';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignItems: 'center'
    }
});

export default function AboutMe() {
    const classes = useStyles();

    return <Grid container className={classes.container} sx={{ mb: 8 }}></Grid>;
}
