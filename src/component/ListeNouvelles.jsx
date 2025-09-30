import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import Nouvelle from "./Nouvelle.jsx";
import ListeNouvellesContext from "./ListeNouvellesContext.jsx";
import {useContext, useState} from "react";
import CreerNouvelle from "./CreerNouvelle.jsx";
import LoginContext from "./LoginContext.jsx";
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

const checkTaille = (texteComplet, critereValue) => {
    if (typeof texteComplet !== 'string') return false;
    const length = texteComplet.length;
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

export default function ListeNouvelles({creerNouvelleDrawerOuvert, setCreerNouvelleDrawerOuvert, appliedCriteria}) {
    const {listeNouvelles} = useContext(ListeNouvellesContext);
    const [nouvelleEnModification, setNouvelleEnModification] = useState(null);
    const {login} = useContext(LoginContext);

    //handle utilisé pour récupérer l'id de la nouvelle, est envoyé en props à la nouvelle
    //Sert à retrouver la nouvelle et ses infos pour pouvoir les afficher dans la modification de nouvelles
    const identifierNouvelle = (id) => {
        setNouvelleEnModification(listeNouvelles.find(nouvelle => nouvelle.id === id))
    }

    const nouvellesFiltrees = listeNouvelles.filter(nouvelle => {
        if (appliedCriteria.length === 0) {
            return true;
        }

        return appliedCriteria.some(critere => {
            const { key, value } = critere;
            switch (key) {
                // Utilisation des bonnes propriétés de l'objet 'nouvelle'
                case 'Titre':
                    return nouvelle.titre && nouvelle.titre.toLowerCase().includes(value.toLowerCase());
                case 'Catégorie de jeu':
                    // On utilise 'typeDeJeu'
                    return nouvelle.typeDeJeu && nouvelle.typeDeJeu.toLowerCase() === value.toLowerCase();
                case 'Date':
                    // On utilise 'datePublication'
                    return checkDate(nouvelle.datePublication, value);
                case 'Taille de la nouvelle':
                    // On utilise 'texteComplet'
                    return checkTaille(nouvelle.texteComplet, value);
                default:
                    return false;
            }
        });
    });

    return (
        <>
            <CreerNouvelle nouvelleEnModification={nouvelleEnModification} setNouvelleEnModification={setNouvelleEnModification} creerNouvelleDrawerOuvert={creerNouvelleDrawerOuvert} setCreerNouvelleDrawerOuvert={setCreerNouvelleDrawerOuvert}/>
            <Box sx={{ flexGrow: 1, width:"100%", minHeight:"100vh", backgroundColor:"#1f1f1f" }}>
                <Grid width="100%">
                    <Demo>
                        <List>
                            {nouvellesFiltrees.length > 0 ? (
                                nouvellesFiltrees.map(nouvelle =>
                                    //Set estDejaBookmarked à true ou false dépendemment de la donnée enregistré dans bookmarkedPar
                                    //dans la nouvelle, pour que les nouvelles qui sont bookmarked apparaissent à l'affichage initial
                                    <Nouvelle key={nouvelle.id} nouvelleIdGetter={identifierNouvelle} setNouvelleEnModification={setNouvelleEnModification} setCreerNouvelleDrawerOuvert={setCreerNouvelleDrawerOuvert} estDejaBookmarked={nouvelle.bookmarkedPar !== undefined?nouvelle.bookmarkedPar.includes(login):false} {...nouvelle}/>
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