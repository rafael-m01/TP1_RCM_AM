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

//Composant MUI copié et grandement adapté pour l'affichage du site
function ResponsiveAppBar({setCreerNouvelleDrawerOuvert, setPageBookmarkOuverte, rechercheOuvert, handleRechercheOpen, drawerWidth}) {
    //State créé par MUI
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    //State créé par MUI
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    //Utilisation du contexte pour avoir accès au state et au setter login et setLogin
    const {login, setLogin} = useContext(LoginContext);

    //handle MUI pour aider la position de l'ouverture du menu 3 barres mobile
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    //handle MUI pour aider la position de l'ouverture du menu 3 points
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    //handle MUI pour la fermeture du menu ouvrant 3 barres mobile
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    //handle MUI pour la fermeture du menu ouvrant 3 points
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    //handle s'occupant du fonctionnement de chaque option du menu 3 points
    const handleClickMoreMenuOption = (menu) => {

        if(menu === "Se déconnecter"){
            //Change le login au default
            setLogin("Se connecter")
            //Ramène à la page liste nouvelles de base si on était
            // sur la liste bookmarks en cliquant se déconnecter
            handleRetourListeNouvelles()
        }else if(menu === "Statistiques"){
            console.log("Stats!")
        }else{
            //Ouvre la page de la liste de bookmarks de l'utilisateur
            setPageBookmarkOuverte(true)
        }
        handleCloseUserMenu()
    }

    //handle pour ouvrir la section creerNouvelle
    const handleDrawerCreerNouvelleOpen = () => {
        setCreerNouvelleDrawerOuvert(true);
    };

    //handle pour ramener à la page liste nouvelles de base si on était sur la liste bookmarks
    const handleRetourListeNouvelles = () => {
        setPageBookmarkOuverte(false);
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
                            onClick={handleRetourListeNouvelles}
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
                                <NestedList handleDrawerCreerNouvelleOpen={handleDrawerCreerNouvelleOpen} handleRechercheOpen={handleRechercheOpen}/>
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

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'space-evenly' }}>
                            <Box key={"Se connecter"} sx={{ display: 'flex', alignItems: 'center' }}>
                                <SplitButton setPageBookmarkOuverte={setPageBookmarkOuverte} />
                            </Box>
                            <Button
                                key={"Créer une nouvelle"}
                                //Ne place le listener sur le bouton creerNouvelle que si un utilisateur est connecté
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
                                {/* N'affiche l'option de menu Bookmarks que si un utilisateur est connecté */}
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
        </>
    );
}

export default ResponsiveAppBar;