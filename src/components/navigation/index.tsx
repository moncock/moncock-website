'use client';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Theme, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { activeLinkState, useRecoilState } from '@store/index';
import Link from 'next/link';
import { FC } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignItems: 'center'
    },
    buttonNav: {
        marginRight: theme.spacing(5),
        borderRadius: 0,
        '&:hover': {
            borderBottomWidth: 2,
            borderBottomStyle: 'solid',
            color: theme.palette.secondary.main
        }
    }
}));

const Navbar: FC = () => {
    const theme = useTheme();
    const classes = useStyles();
    const [activeLink, setActiveLink] = useRecoilState<string>(activeLinkState);
    const menuNav = [
        { name: 'HOME', path: '/' },
        // { name: 'EVENT', path: '/event' },
        // { name: 'COMIC', path: '/comic' },
        { name: 'MONCOCK PUNCH', path: '/game' },
        { name: 'MONCOCK RUN', path: '/moncock-run/index.html' },
        { name: 'MINT NFT', path: '/open-edition/index.html' },
        { name: 'MINT NFT SAMPLE 1000', path: '/sample-1000/index.html' }
        // { name: 'ABOUT ME', path: '/aboutMe' }
    ];

    return (
        <AppBar
            position="static"
            sx={{ bgcolor: theme.palette.primary.main, padding: '10px' }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' }
                        }}
                    >
                        {menuNav.map((item) => {
                            return (
                                <Link
                                    onClick={() => {
                                        setActiveLink(item.name);
                                    }}
                                    href={item.path}
                                    key={item.name}
                                >
                                    <Button
                                        className={classes.buttonNav}
                                        sx={{
                                            ...(activeLink === item.name && {
                                                borderBottomWidth: 2,
                                                borderBottomStyle: 'solid',
                                                color: theme.palette.secondary
                                                    .main
                                            })
                                        }}
                                    >
                                        <Typography
                                            variant="h4"
                                            sx={{
                                                ...(activeLink === item.name
                                                    ? {
                                                          color: theme.palette
                                                              .secondary.main
                                                      }
                                                    : {
                                                          color: theme.palette
                                                              .common.white
                                                      }),
                                                '&:hover': {
                                                    color: theme.palette
                                                        .secondary.main
                                                }
                                            }}
                                        >
                                            {item.name}
                                        </Typography>
                                    </Button>
                                </Link>
                            );
                        })}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Navbar;
