import * as React from "react";
import { useState, useEffect } from "react";
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import {CssBaseline, Divider, IconButton} from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ResponsiveAppBar from "./component/ResponsiveAppBar.jsx";
import ListeNouvelles from "./component/ListeNouvelles.jsx";
import LoginContext from "./component/LoginContext.jsx";
import ListeNouvellesContext from "./component/ListeNouvellesContext.jsx";
import RechercheCritere from "./component/RechercheCritere.jsx";
import { getCriteriaForUser, saveCriteriaForUser } from "./scripts/critereStorage.js";
import { getNouvelles } from "./scripts/storage.js";
import { getLogin, saveLogin } from "./scripts/loginStorage.js";
import ListeBookmarks from "./component/ListeBookmarks.jsx";
const drawerWidth = 300;

const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        flexGrow: 1,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: -drawerWidth,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginRight: 0,
        }),
        position: 'relative',
    }),
);

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));

function App() {
    const theme = useTheme();
    // L'état du login est initialisé en premier
    const [login, setLogin] = useState(getLogin);

    // L'état des critères est ensuite initialisé EN FONCTION de l'utilisateur connecté
    const [appliedCriteria, setAppliedCriteria] = useState(() => getCriteriaForUser(login));

    const [listeNouvelles, setListeNouvelles] = useState(getNouvelles);
    const [creerNouvelleDrawerOuvert, setCreerNouvelleDrawerOuvert] = useState(false);
    const [pageBookmarkOuverte, setPageBookmarkOuverte] = useState(false);
    const [rechercheOuvert, setRechercheOuvert] = useState(false);

    // EFFET 1 : Sauvegarde les changements de l'utilisateur
    useEffect(() => {
        saveLogin(login);
    }, [login]);

    // EFFET 2 : Recharge les critères quand l'utilisateur CHANGE
    useEffect(() => {
        const userCriteria = getCriteriaForUser(login);
        setAppliedCriteria(userCriteria);
    }, [login]); // Se déclenche à chaque changement de 'login'

    // EFFET 3 : Sauvegarde les critères pour l'utilisateur ACTIF quand ils changent
    useEffect(() => {
        saveCriteriaForUser(login, appliedCriteria);
    }, [appliedCriteria, login]); // Se déclenche si les critères OU l'utilisateur changent

    const handleRechercheOpen = () => setRechercheOuvert(true);
    const handleRechercheClose = () => setRechercheOuvert(false);

    return (
        <LoginContext.Provider value={{login, setLogin}}>
            <ListeNouvellesContext.Provider value={{listeNouvelles, setListeNouvelles}}>
                <Box sx={{display: 'flex'}}>
                    <CssBaseline/>
                    <ResponsiveAppBar
                        setCreerNouvelleDrawerOuvert={setCreerNouvelleDrawerOuvert}
                        rechercheOuvert={rechercheOuvert}
                        handleRechercheOpen={handleRechercheOpen}
                        drawerWidth={drawerWidth}
                        setPageBookmarkOuverte={setPageBookmarkOuverte}
                    />
                    <Main open={rechercheOuvert}>
                        <DrawerHeader/>
                        {/* On passe les critères à la liste des nouvelles */}
                        {pageBookmarkOuverte?
                        <ListeBookmarks 
                            creerNouvelleDrawerOuvert={creerNouvelleDrawerOuvert} 
                            setCreerNouvelleDrawerOuvert={setCreerNouvelleDrawerOuvert}
                        />
                        :<ListeNouvelles 
                            creerNouvelleDrawerOuvert={creerNouvelleDrawerOuvert} 
                            setCreerNouvelleDrawerOuvert={setCreerNouvelleDrawerOuvert}
                            appliedCriteria={appliedCriteria}
                        />
                        }
                    </Main>
                    <Drawer
                        sx={{
                            width: drawerWidth,
                            flexShrink: 0,
                            '& .MuiDrawer-paper': {
                                width: drawerWidth,
                            },
                        }}
                        variant="persistent"
                        anchor="right"
                        open={rechercheOuvert}
                    >
                        <DrawerHeader>
                            <IconButton onClick={handleRechercheClose}>
                                {theme.direction === 'rtl' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                            </IconButton>
                        </DrawerHeader>
                        <Divider/>
                        {/* On passe les critères et leur setter au composant de recherche */}
                        <RechercheCritere
                            appliedCriteria={appliedCriteria}
                            setAppliedCriteria={setAppliedCriteria}
                        />
                    </Drawer>
                </Box>
            </ListeNouvellesContext.Provider>
        </LoginContext.Provider>
    )
}

export default App;