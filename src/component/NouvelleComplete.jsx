import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Stack from "@mui/material/Stack";
import {Typography} from "@mui/material";

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


export default function NouvelleComplete({nouvelleCompleteOuverte, setNouvelleCompleteOuverte, titre, image, texteComplet, typeDeJeu, datePublication, createur}) {

    const handleCloseNouvelleComplete = () => {
        setNouvelleCompleteOuverte(false);
    };

    return (
        <div>
            <Modal
                open={nouvelleCompleteOuverte}
                onClose={handleCloseNouvelleComplete}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: "70%", height:"70%", backgroundColor:"#272f36", color:"white" }}>
                    <Stack direction="column">
                        <Stack direction="row" sx={{width:"100%"}}>
                            <Box
                                sx={{ marginRight: 2 }}>
                                <img
                                    src={image}
                                    alt={titre}
                                    style={{ width:"200px", objectFit: 'cover', borderRadius: 4 }}
                                />
                            </Box>
                            <Stack direction="column" sx={{maxHeight:"150px", display:"flex"}}>
                                <Typography
                                    variant="h4"
                                    sx={{padding:1, paddingLeft:2, fontWeight:"bold", textDecoration:"underline"}}>
                                    {titre}
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{paddingLeft:2, color:"#909191"}}>
                                    Type de jeu couvert : {typeDeJeu}
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{paddingLeft:2, color:"#909191"}}>
                                    Créateur : {createur}
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{paddingLeft:2, color:"#909191"}}>
                                    {datePublication}
                                </Typography>
                            </Stack>
                            <Typography sx={{alignItems:"column"}}>
                                Date
                            </Typography>
                        </Stack>
                        <Typography variant="h9" sx={{paddingTop:2, overflow: "hidden"}}>
                            {texteComplet}
                        </Typography>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}