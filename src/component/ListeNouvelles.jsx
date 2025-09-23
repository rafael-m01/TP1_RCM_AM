import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import Nouvelle from "./Nouvelle.jsx";

const Demo = styled('div')(() => ({
    backgroundImage:"linear-gradient(#3b3b3b, #1f1f1f)"
}));

export default function ListeNouvelles({listeNouvelles}) {
    return (
        <Box sx={{ flexGrow: 1, width:"100%", }}>
                <Grid
                    width="100%"
                >
                    <Demo>
                        <List>
                            {listeNouvelles.map(nouvelle =>
                                <Nouvelle key={nouvelle.id} {...nouvelle}/>
                            )}
                        </List>
                    </Demo>
                </Grid>
        </Box>
    );
}