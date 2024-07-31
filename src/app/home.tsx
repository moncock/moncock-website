'use client';
import { makeStyles } from '@mui/styles';

import { Grid } from '@mui/material';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignItems: 'center'
    }
});

export default function HomePage() {
    const classes = useStyles();

    return <Grid container className={classes.container} sx={{ mb: 8 }}></Grid>;
}
