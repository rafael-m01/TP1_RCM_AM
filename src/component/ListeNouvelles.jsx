import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import Nouvelle from "./Nouvelle.jsx";
import ListeNouvellesContext from "./ListeNouvellesContext.jsx";
import {useContext} from "react";
import CreerNouvelle from "./CreerNouvelle.jsx";
import { Typography } from "@mui/material";

const Demo = styled('div')(() => ({
    backgroundImage:"linear-gradient(#3b3b3b, #1f1f1f)"
}));

// Fonctions d'aide (inchangées)
const checkDate = (nouvelleDateStr, critereValue) => {
    if (!nouvelleDateStr) return false;
    // Les dates "YYYY-MM-DD" sont interprétées en UTC, on ajoute l'heure pour éviter les décalages de fuseau horaire
    const nouvelleDate = new Date(`${nouvelleDateStr}T12:00:00`);
    const now = new Date();

    switch (critereValue) {
        case "Aujourd'hui":
            return nouvelleDate.toDateString() === now.toDateString();
        case "Cette semaine": {
            const dayOfWeek = now.getDay() === 0 ? 6 : now.getDay() - 1; // Lundi = 0
            const weekStart = new Date(now);
            weekStart.setDate(now.getDate() - dayOfWeek);
            weekStart.setHours(0, 0, 0, 0);
            return nouvelleDate >= weekStart;
        }
        case "Ce mois-ci":
            return nouvelleDate.getMonth() === now.getMonth() && nouvelleDate.getFullYear() === now.getFullYear();
        case "Cette année":
            return nouvelleDate.getFullYear() === now.getFullYear();
        default:
            return true;
    }
};

const checkTaille = (contenu, critereValue) => {
    if (typeof contenu !== 'string') return false;
    const length = contenu.length;
    switch (critereValue) {
        case 'Courte':
            return length < 1000;
        case 'Moyenne':
            return length >= 1000 && length < 2500;
        case 'Longue':
            return length >= 2500;
        default:
            return true;
    }
};

export default function ListeNouvelles({creerNouvelleOuvert, setCreerNouvelleOuvert, appliedCriteria}) {
    const {listeNouvelles} = useContext(ListeNouvellesContext);

    const nouvellesFiltrees = listeNouvelles.filter(nouvelle => {
        if (appliedCriteria.length === 0) {
            return true;
        }

        return appliedCriteria.some(critere => {
            const { key, value } = critere;
            switch (key) {
                // CORRECTION : Utilisation des bonnes propriétés de l'objet 'nouvelle'
                case 'Titre':
                    return nouvelle.titre && nouvelle.titre.toLowerCase().includes(value.toLowerCase());
                case 'Catégorie de jeu':
                    // On utilise 'typeDeJeu' au lieu de 'categorie'
                    return nouvelle.typeDeJeu && nouvelle.typeDeJeu.toLowerCase() === value.toLowerCase();
                case 'Date':
                    // On utilise 'datePublication' au lieu de 'date'
                    return checkDate(nouvelle.datePublication, value);
                case 'Taille de la nouvelle':
                    // On utilise 'texteComplet' au lieu de 'contenu'
                    return checkTaille(nouvelle.texteComplet, value);
                default:
                    return false;
            }
        });
    });

    return (
        <>
            <CreerNouvelle creerNouvelleOuvert={creerNouvelleOuvert} setCreerNouvelleOuvert={setCreerNouvelleOuvert}/>
            <Box sx={{ flexGrow: 1, width:"100%" }}>
                <Grid width="100%">
                    <Demo>
                        <List>
                            {nouvellesFiltrees.length > 0 ? (
                                nouvellesFiltrees.map(nouvelle =>
                                    <Nouvelle key={nouvelle.id} {...nouvelle}/>
                                )
                            ) : (
                                <Typography sx={{textAlign: 'center', p: 4, color: 'white'}}>
                                    Aucune nouvelle ne correspond à vos critères de recherche.
                                </Typography>
                            )}
                        </List>
                    </Demo>
                </Grid>
            </Box>
        </>
    );
}