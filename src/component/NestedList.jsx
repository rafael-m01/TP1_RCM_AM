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

export default function NestedList({sections}) {
    const [open, setOpen] = React.useState(false);
    const utilisateurs = ['Alexis', 'Rafael', 'Bob', 'Admin'];
    const {setLogin} = useContext(LoginContext)

    const handleClick = () => {
        setOpen(!open);
    };

    const handleLoginUtilisateurClick = (utilisateur) => {
        setLogin(utilisateur)
    }

    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            {sections.map(section =>
                section !== "Login"?
                    <>
                        <ListItemButton key={section}>
                            <ListItemText primary={section} />
                        </ListItemButton>
                        <Divider />
                    </>
                    :
                    <>
                        <ListItemButton key={section} sx={{pl:2}} onClick={handleClick}>
                            <ListItemText primary={section} />
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
                    </>

            )}
        </List>
    );
}