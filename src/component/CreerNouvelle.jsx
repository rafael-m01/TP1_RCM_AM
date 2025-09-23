import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import MenuItem from "@mui/material/MenuItem";

const drawerWidth = "100%";
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'relative',
    alignItems: 'center',
    paddingTop: "70px",
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));

export default function CreerNouvelle({creerNouvelleOuvert, setCreerNouvelleOuvert}) {
    const theme = useTheme();
    const typesDeJeux = ["Sandbox", "Platformer", "Simulator", "First-person", "Adventure", "Puzzle", "Fighting", "Racing", "Stealth", "Strategy"]

    const handleDrawerClose = () => {
        setCreerNouvelleOuvert(false);
    };

    const Box = styled('div')(() => ({
        backgroundColor:"#1f1f1f"
    }));

    function ajouteNouvelle(){

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
                open={creerNouvelleOuvert}
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
                     Créer une nouvelle
                </DrawerHeader>
                <Divider />
                <FormControl sx={{
                    backgroundColor:"#7d7d7d",
                    display:"flex"
                }}>
                    <Stack direction="row" spacing={2} sx={{
                        marginLeft:"2%",
                        marginTop:"1%"
                    }}>
                        <TextField label="Titre" required={true} margin="normal" variant="filled"  size="small" sx={{
                            backgroundColor:"white",
                            width:"70%",
                        }}></TextField>
                        <TextField
                            select
                            label="Type de jeu"
                            variant="standard"
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
                        <TextField multiline rows={8} label="Texte complet" required={true} margin="normal" size="small" variant="filled" sx={{
                            backgroundColor:"white",
                            width:"95%"
                        }}></TextField>
                    </Stack>
                    <Stack direction="row" spacing={2} sx={{
                        marginLeft:"2%",
                        marginTop:"1%"
                    }}>
                        <TextField label="Résumé" required={true} margin="normal" variant="filled" size="small" sx={{
                            backgroundColor:"white",
                            width:"95%"
                        }}></TextField>
                    </Stack>

                </FormControl>


            </Drawer>
        </Box>
    );
}