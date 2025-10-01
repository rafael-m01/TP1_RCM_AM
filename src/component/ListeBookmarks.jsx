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

const Demo = styled('div')(() => ({
    backgroundImage:"linear-gradient(#3b3b3b, #1f1f1f)"
}));


export default function ListeBookmarks({creerNouvelleDrawerOuvert, setCreerNouvelleDrawerOuvert}) {
    //Utilisation du contexte pour avoir accès au state setter setListeNouvelles
    const {listeNouvelles} = useContext(ListeNouvellesContext)
    //Utilisation du contexte pour avoir accès au state login
    const {login} = useContext(LoginContext);
    //State utilisé pour tenir la nouvelle en modification, pour que les informations puissent être placées dans la section creerNouvelle
    const [nouvelleEnModification, setNouvelleEnModification] = useState(null)

    //handle utilisé pour récupérer l'id de la nouvelle, est envoyé en props à la nouvelle
    //Sert à retrouver la nouvelle et ses infos pour pouvoir les afficher dans la modification de nouvelles
    const identifierNouvelle = (id) => {
        setNouvelleEnModification(listeNouvelles.find(nouvelle => nouvelle.id === id))
    }

    return (
        <>
            <CreerNouvelle nouvelleEnModification={nouvelleEnModification} setNouvelleEnModification={setNouvelleEnModification} creerNouvelleDrawerOuvert={creerNouvelleDrawerOuvert} setCreerNouvelleDrawerOuvert={setCreerNouvelleDrawerOuvert}/>
            <Box sx={{ flexGrow: 1, width:"100%", minHeight:"100vh", backgroundColor:"#1f1f1f" }}>
                <Grid
                    width="100%"
                >
                    <Demo>
                        <List>
                            {/* Parcours la map et ne render que les nouvelles avec l'utilisateur courrant enregistré dans bookmarkedPar */}
                            {listeNouvelles.filter(
                                nouvelle => nouvelle.bookmarkedPar.includes(login)
                            ).map(nouvelle =>
                                //Envois identifierNouvelle au children pour récupéré l'id
                                //Set estDejaBookmarked à true pour que les nouvelles bookmarked apparaissent à l'affichage initial
                                <Nouvelle key={nouvelle.id} nouvelleIdGetter={identifierNouvelle} setNouvelleEnModification={setNouvelleEnModification} setCreerNouvelleDrawerOuvert={setCreerNouvelleDrawerOuvert} estDejaBookmarked={true} {...nouvelle}/>
                            )}
                        </List>
                    </Demo>
                </Grid>
            </Box>
        </>
    );
}