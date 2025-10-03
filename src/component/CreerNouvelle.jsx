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
import { saveNouvelles } from '../scripts/storage.js';

const drawerWidth = "100%";
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'relative',
    alignItems: 'center',
    paddingTop: "70px",
    // necessary for content to be below app bar (commentaire généré MUI)
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));

export default function CreerNouvelle({creerNouvelleDrawerOuvert, setCreerNouvelleDrawerOuvert, nouvelleEnModification, setNouvelleEnModification}) {
    //Collection contenant tout les choix possibles que l'utilisateur peut choisir
    const typesDeJeux = ["Sandbox", "Platformer", "Simulator", "First-person", "Adventure", "Puzzle", "Fighting", "Racing", "Stealth", "Strategy"]
    //Utilisation du contexte pour avoir accès au state login
    const {login} = useContext(LoginContext)
    //Utilisation du contexte pour avoir accès au state setter setListeNouvelles
    const {setListeNouvelles} = useContext(ListeNouvellesContext)

    //handle appelé pour fermer la section d'ajout ou modification
    const handleDrawerClose = () => {
        //Set DrawerOuvert à false pour refermer la section CreerNouvelle
        setCreerNouvelleDrawerOuvert(false);
        //Remet le state NouvelleEnModification à null pour s'assurer que les informations d'une nouvelle
        // en modification ne restent pas à la prochaine ouverture de la section
        setNouvelleEnModification(null);
    };

    const Box = styled('div')(() => ({
        backgroundColor:"#1f1f1f"
    }));

    //Fonction pour ajouter une nouvelle a la liste avec les données du form
    function ajouterNouvelle(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const nouvelle = {
            id: crypto.randomUUID(),
            titre: formData.get("titre"),
            image: formData.get("image"),
            texteComplet: formData.get("texteComplet"),
            datePublication: new Date().toISOString().split("T")[0],
            resume: formData.get("resume"),
            createur: login,
            typeDeJeu: formData.get("typeDeJeu"),
            bookmarkedPar: [],
            commentaires: []
        };

        // On utilise une variable temporaire pour la nouvelle liste
        let listeMiseAJour;

        // On met à jour l'état de React et on récupère la nouvelle liste
        setListeNouvelles((oldListeNouvelles) => {
            listeMiseAJour = [nouvelle, ...oldListeNouvelles];
            return listeMiseAJour;
        });

        // ON SAUVEGARDE CETTE NOUVELLE LISTE DANS LE LOCALSTORAGE
        // (Attendez que l'état soit mis à jour avant de sauvegarder)
        setTimeout(() => saveNouvelles(listeMiseAJour), 0);

        // On ferme le "drawer"
        setCreerNouvelleDrawerOuvert(false);
    }

    //Fonction pour modifier une nouvelle existante dans la liste de nouvelles avec les données du form
    function modifierNouvelle(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        // On utilise une variable temporaire pour la nouvelle liste
        let listeMiseAJour;

        // On met à jour l'état de React et on récupère la nouvelle liste
        setListeNouvelles((oldListeNouvelles) => {
            listeMiseAJour = oldListeNouvelles.map(nouvelle =>
                nouvelle.id === nouvelleEnModification.id
                    ? {
                        ...nouvelle,
                        titre: formData.get("titre"),
                        image: formData.get("image"),
                        texteComplet: formData.get("texteComplet"),
                        datePublication: new Date().toISOString().split("T")[0],
                        resume: formData.get("resume"),
                        createur: login,
                        typeDeJeu: formData.get("typeDeJeu")
                    }
                    : nouvelle
            );
            return listeMiseAJour;
        });

        // ON SAUVEGARDE CETTE NOUVELLE LISTE DANS LE LOCALSTORAGE
        // (Attendez que l'état soit mis à jour avant de sauvegarder)
        setTimeout(() => saveNouvelles(listeMiseAJour), 0);

        // On ferme le "drawer" et on réinitialise
        setCreerNouvelleDrawerOuvert(false);
        setNouvelleEnModification(null);
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
                    {/* S'il y a une nouvelle en modification, change le texte titre pour Modifier la nouvelle, sinon le change pour Créer une nouvelle */}
                    {nouvelleEnModification==null?"Créer une nouvelle":"Modifier une nouvelle"}
                </DrawerHeader>
                <Divider />
                <Box sx={{
                    backgroundColor:"#7d7d7d",
                }}>
                    {/* S'il y a une nouvelle en modification, utilise la modification de nouvelle, sinon utilise l'ajout de nouvelle */}
                    <FormControl component="form" onSubmit={nouvelleEnModification==null?ajouterNouvelle:modifierNouvelle} sx={{
                        display:"flex"
                    }}>
                        <Stack direction="row" spacing={2} sx={{
                            marginLeft:"2%",
                            marginTop:"1%"
                        }}>
                            {/* Affiche le titre de la nouvelle en modification comme defaultValue s'il y en a une, sinon laisse le champ vide */}
                            <TextField defaultValue={nouvelleEnModification != null?nouvelleEnModification.titre:""} name="titre" label="Titre" required={true} margin="normal" variant="filled"  size="small" sx={{
                                backgroundColor:"white",
                                width:"70%",
                            }}></TextField>
                            <TextField
                                name="typeDeJeu"
                                select
                                label="Type de jeu"
                                variant="standard"
                                //Affiche le type de jeu de la nouvelle en modification comme defaultValue s'il y en a une, sinon laisse le champ vide
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
                            {/* Affiche le texte complet de la nouvelle en modification comme defaultValue s'il y en a une, sinon laisse le champ vide */}
                            <TextField defaultValue={nouvelleEnModification != null?nouvelleEnModification.texteComplet:""} name="texteComplet" multiline rows={8} label="Texte complet" required={true} margin="normal" size="small" variant="filled" sx={{
                                backgroundColor:"white",
                                width:"95%"
                            }}></TextField>
                        </Stack>
                        <Stack direction="row" spacing={2} sx={{
                            marginLeft:"2%",
                            marginTop:"1%"
                        }}>
                            {/* Affiche le résumé de la nouvelle en modification comme defaultValue s'il y en a une, sinon laisse le champ vide */}
                            <TextField defaultValue={nouvelleEnModification != null?nouvelleEnModification.resume:""} name="resume" label="Résumé" required={true} margin="normal" variant="filled" size="small" sx={{
                                backgroundColor:"white",
                                width:"95%"
                            }}></TextField>
                        </Stack>
                        <Stack direction="row" spacing={2} sx={{
                            marginLeft:"2%",
                            marginTop:"1%",
                            marginBottom:"1%",
                            alignItems:"center"
                        }}>
                            {/* Affiche le path de l'image apartenant nouvelle en modification comme defaultValue s'il y en a une, sinon laisse le champ vide */}
                            <TextField defaultValue={nouvelleEnModification != null?nouvelleEnModification.image:""} name="image" label="Image (chemin de fichier)" required={true} margin="normal" variant="filled" size="small" sx={{
                                backgroundColor:"white",
                                width:"70%"
                            }}></TextField>

                            <Button sx={{minHeight:"50px"}} type="submit" color="primary" variant="contained">
                                {/* S'il y a une nouvelle en modification, change le texte du bouton pour Modifier la nouvelle, sinon le change pour Ajouter la nouvelle */}
                                {nouvelleEnModification==null?"Ajouter la nouvelle":"Modifier la nouvelle"}
                            </Button>
                        </Stack>
                    </FormControl>
                </Box>
            </Drawer>
        </Box>
    );
}