import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import {useContext} from "react";
import LoginContext from "./LoginContext.jsx";
import Divider from "@mui/material/Divider";
import { saveLogin } from "../scripts/loginStorage.js";

//Composant MUI copié et adapté pour l'affichage du site
export default function NestedList({handleDrawerCreerNouvelleOpen, handleRechercheOpen}) {
    //State créé par MUI utilisé pour ouvrir et fermer la NestedList
    const [open, setOpen] = React.useState(false);
    //Array contenant les utilisateurs de l'application
    const utilisateurs = ['Alexis', 'Rafael', 'Bob', 'Admin'];
    //Utilisation du contexte pour avoir accès au state setter setLogin
    const {setLogin} = useContext(LoginContext)


    //handle MUI pour fermer ou ouvrir la nestedList du menu mobile
    const handleClick = () => {
        setOpen(!open);
    };

    //handle pour changer l'utilisateur actif à l'utilisateur selectionné dans le menu
    const handleLoginUtilisateurClick = (utilisateur) => {
        setLogin(utilisateur)
        saveLogin(utilisateur);
    }

    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            <ListItemButton key={"Se connecter"} sx={{pl:2}} onClick={handleClick}>
                <ListItemText primary={"Se connecter"} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {utilisateurs.map(utilisateur =>
                        <ListItemButton key={utilisateur} sx={{ pl: 4 }} onClick={() => handleLoginUtilisateurClick(utilisateur)}>
                            <ListItemIcon>
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText primary={utilisateur} />
                        </ListItemButton>
                    )}
                </List>
            </Collapse>
            <Divider />
            <ListItemButton key={"Créer une nouvelle"} onClick={handleDrawerCreerNouvelleOpen}>
                <ListItemText primary={"Créer une nouvelle"} />
            </ListItemButton>
            <Divider />
            <ListItemButton key={"Recherche"} onClick={handleRechercheOpen}>
                <ListItemText primary={"Recherche"} />
            </ListItemButton>
            <Divider />
        </List>
    );
}