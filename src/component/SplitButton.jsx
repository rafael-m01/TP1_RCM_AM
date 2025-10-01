import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import {useContext} from "react";
import LoginContext from "./LoginContext.jsx";

const utilisateurs = ['Alexis', 'Rafael', 'Bob', 'Admin'];

//Composant MUI copié et adapté pour l'affichage du site
export default function SplitButton({setPageBookmarkOuverte}) {
    //State créé par MUI pour controller l'ouverture et fermeture du dropdown du SplitButton
    const [open, setOpen] = React.useState(false);
    //State créé par MUI
    const anchorRef = React.useRef(null);
    //State créé par MUI utilisé pour remplacer le texte affiché sur le SplitButton lorsqu'une selection est fait
    const [label, setLabel] = React.useState("Se connecter");
    //Utilisation du contexte pour avoir accès au state et au setter login et setLogin
    const {login, setLogin} = useContext(LoginContext)

    //handle qui s'occupe de changer l'utilisateur en cours à l'utilisateur choisi
    const handleMenuItemClick = (event, option) => {
        //Renvois à la page de base liste nouvelles si l'utilisateur est changé en étant dans la liste bookmarks
        if(login !== option){
            setPageBookmarkOuverte(false);
        }
        setLabel(option);
        setLogin(option)
        setOpen(false);
    };

    //handle MUI s'occupant de fermer et ouvrir les choix du splitButton
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    //handle MUI s'occupant de fermer les choix du splitButton
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    return (
        <React.Fragment>
            <ButtonGroup
                variant="contained"
                ref={anchorRef}
                aria-label="Button group with a nested menu"
                color="inherit"
            >
                <Button sx={{fontWeight:"bold"}}>{login}</Button>
                <Button
                    size="small"
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}

                >
                    <ArrowDropDownIcon />
                </Button>
            </ButtonGroup>
            <Popper
                sx={{ zIndex: 1 }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu" autoFocusItem>
                                    {/* Parcous la map utilisateurs et créé une option de menu pour chaque */}
                                    {utilisateurs.map((option) => (
                                        <MenuItem
                                            key={option}
                                            selected={option === label}
                                            onClick={(event) => handleMenuItemClick(event, option)}

                                        >
                                            {option}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </React.Fragment>
    );
}