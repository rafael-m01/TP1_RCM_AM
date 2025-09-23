import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SplitButton from "./SplitButton.jsx";
import GamepadIcon from '@mui/icons-material/Gamepad';
import {useContext} from "react";
import LoginContext from "./LoginContext.jsx";
import NestedList from "./NestedList.jsx";
import CreerNouvelle from "./CreerNouvelle.jsx";
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const sections = ['Login', 'Créer une nouvelle', 'Recherche'];
const more = ['Statistiques', 'Logout'];

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const {setLogin} = useContext(LoginContext);
    const [creerNouvelleOuvert, setCreerNouvelleOuvert] = React.useState(false);

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

    const handleClickMoreMenuOption = (setting) => {
        if(setting == 'Logout'){
            setLogin("Login")
        }else{
            console.log("Stats!")
        }
        handleCloseUserMenu()
    }

    const handleDrawerCreerNouvelleOpen = () => {
        setCreerNouvelleOuvert(true);
    };

    const handleDrawerCreerNouvelleClose = () => {
        setCreerNouvelleOuvert(false);
    };

    const AppBar = styled(MuiAppBar)(({theme}) => ({
        zIndex: theme.zIndex.drawer +1
    }))

    return (
        <>
            <AppBar position="fixed" color="default">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <GamepadIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            [GameNews]
                        </Typography>

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
                                sx={{ display: { xs: 'block', md: 'none' } }}
                            >
                                <NestedList sections={sections}/>
                            </Menu>
                        </Box>
                        <GamepadIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            [GameNews]
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'space-evenly' }}>
                            {sections.map((page) =>
                                page === "Login" ? (
                                    <Box key={page} sx={{ display: 'flex', alignItems: 'center' }}>
                                        <SplitButton />
                                    </Box>
                                ) : (
                                    <Button
                                        key={page}
                                        onClick={page === "Créer une nouvelle"?handleDrawerCreerNouvelleOpen:null}
                                        sx={{ my: 2, color: 'black', fontWeight:"bold", display: 'block', '&:hover':{backgroundColor: 'rgba(125, 125, 125, 0.2)'},}}
                                    >
                                        {page}
                                    </Button>
                                )
                            )}
                        </Box>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="More">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <MoreHorizIcon/>
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
                                {more.map((setting) => (
                                    <MenuItem key={setting} onClick={() => handleClickMoreMenuOption(setting)}>
                                        <Typography sx={{ textAlign: 'center' }} >{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        <Toolbar/>
            <CreerNouvelle creerNouvelleOuvert={creerNouvelleOuvert} setCreerNouvelleOuvert={setCreerNouvelleOuvert}/>
        </>
    );
}
export default ResponsiveAppBar;