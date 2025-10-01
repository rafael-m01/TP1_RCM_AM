import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Stack from "@mui/material/Stack";
import {IconButton, Typography} from "@mui/material";
import {useContext} from "react";
import LoginContext from "./LoginContext.jsx";
import ListeNouvellesContext from "./ListeNouvellesContext.jsx";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    border: '2px solid #e3e3e3',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

//Composant MUI copié et grandement adapté pour l'affichage du site (Modal)
export default function NouvelleComplete({id, nouvelleCompleteOuverte, setNouvelleCompleteOuverte, titre, image, texteComplet, typeDeJeu, datePublication, createur, estBookmarked, setEstBookmarked}) {
    //Utilisation du contexte pour avoir accès au state login
    const {login} = useContext(LoginContext)
    //Utilisation du contexte pour avoir accès au state setter setListeNouvelles
    const {setListeNouvelles} = useContext(ListeNouvellesContext)

    const handleCloseNouvelleComplete = () => {
        setNouvelleCompleteOuverte(false);
    };

    //handle appelé au click du bouton bookmark vide, ajoute l'utilisateur actif à la liste de bookmarkedPar de la nouvelle
    const handleAjouterBookmark = () => {
        //Change estBookmarked à true pour que l'affichage du bouton change au bookmark plein
        setEstBookmarked(true)
        //Parcours la liste de nouvelles et ajoute l'utilisateur à bookmarkedPar pour la nouvelle cliquée
        setListeNouvelles((oldListeNouvelles) => (oldListeNouvelles.map(nouvelle =>
            nouvelle.id === id
                ? {...nouvelle,
                    bookmarkedPar:[...nouvelle.bookmarkedPar, login]}
                : nouvelle
        )));
    };

    const handleRetirerBookmark = () => {
        //Change estBookmarked à false pour que l'affichage du bouton change au bookmark vide
        setEstBookmarked(false)
        //Parcours la liste de nouvelles et et retire l'utilisateur de bookmarkedPar pour la nouvelle cliquée
        setListeNouvelles((oldListeNouvelles) => (oldListeNouvelles.map(nouvelle =>
            nouvelle.id === id
                ? {...nouvelle,
                    bookmarkedPar:nouvelle.bookmarkedPar.filter(utilisateur => utilisateur !== login)}
                : nouvelle
        )));
    };

    return (
        <div>
            <Modal
                open={nouvelleCompleteOuverte}
                onClose={handleCloseNouvelleComplete}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box
                    sx={{
                        ...style,
                        width: "90%",
                        maxWidth: 1000,
                        maxHeight: "80vh",
                        overflowY: "auto",
                        backgroundColor: "#272f36",
                        color: "white",
                        borderRadius: 2,
                        p: 3,
                    }}
                >
                    <Stack spacing={2}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-start"
                            sx={{ width: "100%" }}
                        >
                            <Stack direction="row" spacing={2} sx={{ flex: 1, minWidth: 0, alignItems:"center" }}>
                                <Box sx={{ flexShrink: 0 }}>
                                    <img
                                        src={image}
                                        alt={titre}
                                        style={{
                                            width: "120px",
                                            height: "120px",
                                            objectFit: "cover",
                                            borderRadius: 8,
                                        }}
                                    />
                                </Box>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: "bold",
                                        textDecoration: "underline",
                                        wordBreak: "break-word",
                                        verticalAlign:"center"
                                    }}
                                >
                                    {titre}
                                </Typography>
                            </Stack>
                            <Stack direction="column">
                                {login !== "Se connecter"?
                                    //Change le rendu et l'effet du bouton bookmark initial s'il est déjà bookmarked par l'utilisateur ou non
                                    estBookmarked?
                                        <IconButton edge="end" aria-label="bookmark">
                                            <BookmarkIcon sx={{color:"white", fontSize:"5vh"}} onClick={handleRetirerBookmark}/>
                                        </IconButton>:
                                        <IconButton edge="end" aria-label="bookmark">
                                            <BookmarkBorderIcon sx={{color:"white", fontSize:"5vh"}} onClick={handleAjouterBookmark}/>
                                        </IconButton>
                                    :null
                                }
                                <Typography
                                    variant="h7"
                                    sx={{ color: "#909191", whiteSpace: "nowrap", marginLeft: 2 }}
                                >
                                    {datePublication}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack
                            direction="row"
                            spacing={2}
                        >
                            <Typography variant="h7" sx={{ color: "#909191", p:0 }}>
                                Type de jeu couvert : {typeDeJeu}
                            </Typography>
                            <Typography variant="h7" sx={{ color: "#909191", p:0 }}>
                                Créateur : {createur}
                            </Typography>
                        </Stack>
                        <Typography
                            variant="body1"
                            sx={{
                                paddingTop: 2,
                                whiteSpace: "pre-wrap",
                                wordBreak: "break-word",
                            }}
                        >
                            {texteComplet}
                        </Typography>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}