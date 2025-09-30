import * as React from 'react';
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
import {styled} from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';

const more = ['Statistiques', 'Se déconnecter'];

// Correction : On ajoute 'drawerWidth' à la liste des props à ne pas transmettre au DOM
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open' && prop !== 'drawerWidth',
})(({theme, open, drawerWidth}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
    }),
}));


function ResponsiveAppBar({setCreerNouvelleOuvert, rechercheOuvert, handleRechercheOpen, drawerWidth}) {
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

    const handleClickMoreMenuOption = (setting) => {
        if (setting === 'Se déconnecter') {
            setLogin("Se connecter")
        } else {
            console.log("Stats!")
        }
        handleCloseUserMenu()
    }

    const handleDrawerCreerNouvelleOpen = () => {
        setCreerNouvelleOuvert(true);
    };

    return (
        <>
            <AppBar position="fixed" open={rechercheOuvert} drawerWidth={drawerWidth} color="default">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <GamepadIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            [GameNews]
                        </Typography>

                        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon/>
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
                                sx={{display: {xs: 'block', md: 'none'}}}
                            >
                                <NestedList handleDrawerCreerNouvelleOpen={handleDrawerCreerNouvelleOpen}/>
                            </Menu>
                        </Box>
                        <GamepadIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: {xs: 'flex', md: 'none'},
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
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}, justifyContent: 'space-evenly'}}>
                            <Box key={"Se connecter"} sx={{display: 'flex', alignItems: 'center'}}>
                                <SplitButton/>
                            </Box>
                            <Button
                                key={"Créer une nouvelle"}
                                onClick={login !== "Se connecter" ? handleDrawerCreerNouvelleOpen : null}
                                sx={{
                                    my: 2,
                                    color: 'black',
                                    fontWeight: "bold",
                                    display: 'block',
                                    '&:hover': {backgroundColor: 'rgba(125, 125, 125, 0.2)'},
                                }}
                            >
                                Créer une nouvelle
                            </Button>
                            <Button
                                key="Recherche"
                                onClick={handleRechercheOpen}
                                sx={{
                                    my: 2,
                                    color: 'black',
                                    fontWeight: "bold",
                                    display: 'block',
                                    '&:hover': {backgroundColor: 'rgba(125, 125, 125, 0.2)'},
                                }}
                            >
                                Recherche
                            </Button>
                        </Box>
                        <Box sx={{flexGrow: 0}}>
                            <Tooltip title="More">
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <MoreHorizIcon/>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{mt: '45px'}}
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
                                        <Typography sx={{textAlign: 'center'}}>{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}

export default ResponsiveAppBar;