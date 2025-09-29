import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import {useContext} from "react";
import LoginContext from "./LoginContext.jsx";
import ListeNouvellesContext from "./ListeNouvellesContext.jsx";

const drawerWidth = "100%";
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'relative',
    alignItems: 'center',
    paddingTop: "70px",
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));
var idGlobal = 21;

export default function CreerNouvelle({creerNouvelleDrawerOuvert, setCreerNouvelleDrawerOuvert, nouvelleEnModification, setNouvelleEnModification}) {
    const typesDeJeux = ["Sandbox", "Platformer", "Simulator", "First-person", "Adventure", "Puzzle", "Fighting", "Racing", "Stealth", "Strategy"]
    const {login} = useContext(LoginContext)
    const {setListeNouvelles} = useContext(ListeNouvellesContext)

    const handleDrawerClose = () => {
        setCreerNouvelleDrawerOuvert(false);
        setNouvelleEnModification(null);
    };

    const Box = styled('div')(() => ({
        backgroundColor:"#1f1f1f"
    }));

    function ajouterNouvelle(event){
        event.preventDefault()
        const formData = new FormData(event.target);
        const nouvelle = {
            id:idGlobal,
            titre:formData.get("titre"),
            image:formData.get("image"),
            texteComplet:formData.get("texteComplet"),
            datePublication:new Date().toISOString().split("T")[0],
            resume:formData.get("resume"),
            createur:login,
            typeDeJeux:formData.get("typeDeJeux")
        }
        setListeNouvelles((oldListeNouvelles) => ([nouvelle, ...oldListeNouvelles]))
        setCreerNouvelleDrawerOuvert(false);
    }

    function modifierNouvelle(event){
        event.preventDefault()
        const formData = new FormData(event.target);
        setListeNouvelles((oldListeNouvelles) => (oldListeNouvelles.map(nouvelle =>
            nouvelle.id === nouvelleEnModification.id
                ? {...nouvelle,
                    titre:formData.get("titre"),
                    image:formData.get("image"),
                    texteComplet:formData.get("texteComplet"),
                    datePublication:new Date().toISOString().split("T")[0],
                    resume:formData.get("resume"),
                    createur:login,
                    typeDeJeux:formData.get("typeDeJeux")}
                : nouvelle
        )));
        setNouvelleEnModification(null);
        setCreerNouvelleDrawerOuvert(null);
    }

    return (
        <Box>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                    },
                    backgroundColor:"#2b2b2b"
                }}
                variant="persistent"
                anchor="top"
                open={creerNouvelleDrawerOuvert}
            >
                <DrawerHeader sx={{
                    backgroundColor:"#1f1f1f",
                    justifyContent: "center",
                    fontWeight:"bold",
                    color:"white"
                }}>
                    <IconButton onClick={handleDrawerClose}>
                        <KeyboardArrowUpIcon sx={{color:"white"}}/>
                    </IconButton>
                    {nouvelleEnModification==null?"Créer une nouvelle":"Modifier une nouvelle"}
                </DrawerHeader>
                <Divider />
                <Box sx={{
                    backgroundColor:"#7d7d7d",
                }}>
                    <FormControl component="form" onSubmit={nouvelleEnModification==null?ajouterNouvelle:modifierNouvelle} sx={{
                        display:"flex"
                    }}>
                        <Stack direction="row" spacing={2} sx={{
                            marginLeft:"2%",
                            marginTop:"1%"
                        }}>
                            <TextField defaultValue={nouvelleEnModification != null?nouvelleEnModification.titre:""} name="titre" label="Titre" required={true} margin="normal" variant="filled"  size="small" sx={{
                                backgroundColor:"white",
                                width:"70%",
                            }}></TextField>
                            <TextField
                                name="typeDeJeu"
                                select
                                label="Type de jeu"
                                variant="standard"
                                defaultValue={nouvelleEnModification != null?nouvelleEnModification.typeDeJeu:typesDeJeux[0]}
                                sx={{
                                    backgroundColor:"#f0f0f0",
                                    width:"20%",
                                }}
                            >
                                {typesDeJeux.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Stack>
                        <Stack direction="row" spacing={2} sx={{
                            marginLeft:"2%",
                            marginTop:"1%"
                        }}>
                            <TextField defaultValue={nouvelleEnModification != null?nouvelleEnModification.texteComplet:""} name="texteComplet" multiline rows={8} label="Texte complet" required={true} margin="normal" size="small" variant="filled" sx={{
                                backgroundColor:"white",
                                width:"95%"
                            }}></TextField>
                        </Stack>
                        <Stack direction="row" spacing={2} sx={{
                            marginLeft:"2%",
                            marginTop:"1%"
                        }}>
                            <TextField defaultValue={nouvelleEnModification != null?nouvelleEnModification.resume:""} name="resume" label="Résumé" required={true} margin="normal" variant="filled" size="small" sx={{
                                backgroundColor:"white",
                                width:"95%"
                            }}></TextField>
                        </Stack>
                        <Stack direction="row" spacing={2} sx={{
                            marginLeft:"2%",
                            marginTop:"1%",
                            marginBottom:"1%"
                        }}>
                            <TextField defaultValue={nouvelleEnModification != null?nouvelleEnModification.image:""} name="image" label="Image (chemin de fichier)" required={true} margin="normal" variant="filled" size="small" sx={{
                                backgroundColor:"white",
                                width:"70%"
                            }}></TextField>
                            <Button type="submit" color="primary" variant="contained">{nouvelleEnModification==null?"Ajouter la nouvelle":"Modifier la nouvelle"}</Button>
                        </Stack>
                    </FormControl>
                </Box>
            </Drawer>
        </Box>
    );
}