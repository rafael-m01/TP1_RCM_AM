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
    const {listeNouvelles} = useContext(ListeNouvellesContext)
    const {login} = useContext(LoginContext);
    const [nouvelleEnModification, setNouvelleEnModification] = useState(null)

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
                            {listeNouvelles.filter(
                                nouvelle => nouvelle.bookmarkedPar.includes(login)
                            ).map(nouvelle =>
                                <Nouvelle key={nouvelle.id} nouvelleIdGetter={identifierNouvelle} setNouvelleEnModification={setNouvelleEnModification} setCreerNouvelleDrawerOuvert={setCreerNouvelleDrawerOuvert} estDejaBookmarked={true} {...nouvelle}/>
                            )}
                        </List>
                    </Demo>
                </Grid>
            </Box>
        </>
    );
}