import * as React from 'react';
import { useState } from "react"; // Importer useState
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Stack from "@mui/material/Stack";
import {IconButton, Typography, Divider, TextField, Paper} from "@mui/material"; // Importer les composants nécessaires
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

// On ajoute 'commentaires' à la liste des props
export default function NouvelleComplete({id, nouvelleCompleteOuverte, setNouvelleCompleteOuverte, titre, image, texteComplet, typeDeJeu, datePublication, createur, estBookmarked, setEstBookmarked, commentaires}) {
    const {login} = useContext(LoginContext);
    const {setListeNouvelles} = useContext(ListeNouvellesContext);

    // État pour le champ de texte du nouveau commentaire
    const [nouveauCommentaire, setNouveauCommentaire] = useState('');

    const handleCloseNouvelleComplete = () => {
        setNouvelleCompleteOuverte(false);
    };

    const handleAjouterBookmark = () => {
        setEstBookmarked(true);
        setListeNouvelles((oldListeNouvelles) => (oldListeNouvelles.map(nouvelle =>
            nouvelle.id === id ? {...nouvelle, bookmarkedPar:[...(nouvelle.bookmarkedPar || []), login]} : nouvelle
        )));
    };

    const handleRetirerBookmark = () => {
        setEstBookmarked(false);
        setListeNouvelles((oldListeNouvelles) => (oldListeNouvelles.map(nouvelle =>
            nouvelle.id === id ? {...nouvelle, bookmarkedPar:nouvelle.bookmarkedPar.filter(utilisateur => utilisateur !== login)} : nouvelle
        )));
    };

    // Fonction pour gérer l'ajout d'un commentaire
    const handleAjouterCommentaire = () => {
        if (!nouveauCommentaire.trim()) return; // Ne pas ajouter de commentaire vide

        const commentaireAAjouter = {
            id: crypto.randomUUID(),
            texte: nouveauCommentaire,
            usager: login,
            // Utilise un format de date et heure local et lisible
            date: new Date().toLocaleString('fr-CA', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })
        };

        // Met à jour la liste des nouvelles avec le nouveau commentaire
        setListeNouvelles(oldListeNouvelles =>
            oldListeNouvelles.map(nouvelle =>
                nouvelle.id === id
                    ? { ...nouvelle, commentaires: [...(nouvelle.commentaires || []), commentaireAAjouter] }
                    : nouvelle
            )
        );

        // Vide le champ de texte
        setNouveauCommentaire('');
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
                        {/* ... (Partie supérieure de la nouvelle inchangée) ... */}
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

                        {/* NOUVEAU : Section des commentaires */}
                        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)', my: 2 }} />

                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Commentaires</Typography>

                        <Stack spacing={2}>
                            {commentaires && commentaires.length > 0 ? (
                                commentaires.map(commentaire => (
                                    <Paper key={commentaire.id} sx={{ p: 2, backgroundColor: '#3c4652', color: 'white', borderRadius: 2 }}>
                                        <Stack spacing={1}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>{commentaire.usager}</Typography>
                                                <Typography variant="caption" sx={{ color: '#909191' }}>{commentaire.date}</Typography>
                                            </Box>
                                            <Typography variant="body2">{commentaire.texte}</Typography>
                                        </Stack>
                                    </Paper>
                                ))
                            ) : (
                                <Typography sx={{ color: '#909191', fontStyle: 'italic' }}>
                                    Aucun commentaire pour le moment.
                                </Typography>
                            )}
                        </Stack>

                        {/* NOUVEAU : Formulaire pour ajouter un commentaire (visible si connecté) */}
                        {login !== "Se connecter" && (
                            <Stack spacing={1.5} sx={{ mt: 3 }}>
                                <TextField
                                    label="Ajouter un commentaire..."
                                    multiline
                                    rows={3}
                                    value={nouveauCommentaire}
                                    onChange={(e) => setNouveauCommentaire(e.target.value)}
                                    variant="filled"
                                    sx={{
                                        backgroundColor: '#3c4652',
                                        borderRadius: 1,
                                        '& .MuiInputBase-root': { color: 'white' },
                                        '& .MuiFormLabel-root': { color: '#909191' }
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    onClick={handleAjouterCommentaire}
                                    disabled={!nouveauCommentaire.trim()}
                                    sx={{ alignSelf: 'flex-end' }}
                                >
                                    Envoyer
                                </Button>
                            </Stack>
                        )}
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}