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
import {styled} from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';

function ResponsiveAppBar({setCreerNouvelleOuvert, setPageBookmarkOuverte}) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const {login, setLogin} = useContext(LoginContext);

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

    const handleClickMoreMenuOption = (menu) => {
        if(menu === "Se déconnecter"){
            setLogin("Se connecter")
            setPageBookmarkOuverte(false)
        }else if(menu === "Statistiques"){
            console.log("Stats!")
        }else{
            setPageBookmarkOuverte(true)
        }
        handleCloseUserMenu()
    }

    const handleDrawerCreerNouvelleOpen = () => {
        setCreerNouvelleOuvert(true);
    };

    const handleRetourListeNouvelles = () => {
        setPageBookmarkOuverte(false);
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
                            onClick={handleRetourListeNouvelles}
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
                                <NestedList handleDrawerCreerNouvelleOpen={handleDrawerCreerNouvelleOpen}/>
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
                            <Box key={"Se connecter"} sx={{ display: 'flex', alignItems: 'center' }}>
                                <SplitButton setPageBookmarkOuverte={setPageBookmarkOuverte} />
                            </Box>
                            <Button
                                key={"Créer une nouvelle"}
                                onClick={login !== "Se connecter"?handleDrawerCreerNouvelleOpen:null}
                                sx={{ my: 2, color: 'black', fontWeight:"bold", display: 'block', '&:hover':{backgroundColor: 'rgba(125, 125, 125, 0.2)'},}}
                            >
                                Créer une nouvelle
                            </Button>
                            <Button
                                key="Recherche"
                                onClick={null}
                                sx={{ my: 2, color: 'black', fontWeight:"bold", display: 'block', '&:hover':{backgroundColor: 'rgba(125, 125, 125, 0.2)'},}}
                            >
                                Recherche
                            </Button>
                        </Box>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="More">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <MoreHorizIcon/>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-user"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                                disablePortal
                            >
                                {login !== "Se connecter"?
                                    <MenuItem key={"Bookmarks"} onClick={() => handleClickMoreMenuOption("Bookmarks")}>
                                        <Typography sx={{ textAlign: 'center' }} >Bookmarks</Typography>
                                    </MenuItem>
                                    :null
                                }
                                <MenuItem key={"Statistiques"} onClick={() => handleClickMoreMenuOption("Statistiques")}>
                                    <Typography sx={{ textAlign: 'center' }} >Statistiques</Typography>
                                </MenuItem>
                                <MenuItem key={"Se déconnecter"} onClick={() => handleClickMoreMenuOption("Se déconnecter")}>
                                    <Typography sx={{ textAlign: 'center' }} >Se déconnecter</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        <Toolbar/>
        </>
    );
}
export default ResponsiveAppBar;