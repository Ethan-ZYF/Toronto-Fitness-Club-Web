import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import logo from '../images/logo.png';
import { getProfile } from '../../api';

const pages_left = ['Membership', 'Clubs', 'Classes'];

// const settings = ['Profile', 'Logout'];
const settings = {
    Profile: {
        text: 'Profile',
        onclick: () => {
            window.location.href = '/profile';
        }
    },
    Logout: {
        text: 'Logout',
        onclick: () => {
            window.location.href = '/signout';
        }
    }
}

const signupin_settings = {
    Signin: {
        text: 'Sign In',
        onclick: () => {
            window.location.href = '/signin';
        }
    },
    Signup: {
        text: 'Sign Up',
        onclick: () => {
            window.location.href = '/signup';
        }
    }
}

const club_subs = {
    homepage: {
        text: 'Homepage',
        onclick: () => {
            window.location.href = '/dashboard';
        }
    },
    Plans: {
        text: 'Plans',
        onclick: () => {
            window.location.href = '/plans';
        }
    },
    Studios: {
        text: 'Studios',
        onclick: () => {
            window.location.href = '/studios';
        }
    },
    Classes: {
        text: 'Classes',
        onclick: () => {
            window.location.href = '/classes';
        }
    }
}

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [avatar, setAvatar] = React.useState(null);

    useEffect(() => {
        if (localStorage.getItem('user') === null) {
            return;
        }
        const fetchData = async () => {
            const result = await getProfile();
            const profile = result.data;
            setAvatar(profile?.avatar);
        };
        fetchData();
    }, []);


    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            {/* style={{ background: '#F8CA5A' }} */}

            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Avatar variant={"rounded"} alt="The image" src={logo} style={{
                        width: 70,
                        height: 60,
                    }} />

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {Object.keys(club_subs).map((page) => (
                            <MenuItem key={page} onClick={club_subs[page].onclick}>
                                {club_subs[page].text}
                            </MenuItem>
                        ))}

                    </Box>
                    {localStorage.getItem('user') ?
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar src={avatar} sx={{ width: 40, height: 40 }} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {Object.keys(settings).map((setting) => (
                                    <MenuItem key={setting} onClick={settings[setting].onclick}>
                                        <Typography textAlign="center">{settings[setting].text}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>

                        </Box>
                        :
                        <Box
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                alignItems: 'center',
                            }}
                        >
                            {Object.keys(signupin_settings).map((page) => (
                                <Button
                                    key={page}
                                    onClick={signupin_settings[page].onclick}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
