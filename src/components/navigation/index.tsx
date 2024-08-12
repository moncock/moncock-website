'use client';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { activeLinkState, useRecoilState } from '@store/index';
import Link from 'next/link';
import { FC } from 'react';

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

const Navbar: FC = () => {
    const [activeLink, setActiveLink] = useRecoilState<string>(activeLinkState);

    return (
        <AppBar position="static" sx={{ bgcolor: '#361D45' }}>
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
                                        sx={{
                                            mr: 1,
                                            color: 'white',
                                            borderRadius: 0,
                                            '&:hover': {
                                                borderBottomWidth: 1,
                                                borderBottomStyle: 'solid'
                                            },
                                            ...(activeLink === item.name && {
                                                borderBottomWidth: 1,
                                                borderBottomStyle: 'solid'
                                            })
                                        }}
                                    >
                                        {item.name}
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
