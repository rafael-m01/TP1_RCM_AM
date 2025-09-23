import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useContext} from "react";
import LoginContext from "./LoginContext.jsx";

export default function Nouvelle({titre, image, texteComplet, datePublication, resume, createur}){
    const {login} = useContext(LoginContext)

    return(
        <ListItem
            button="true"
            secondaryAction={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <span style={{ color: 'grey', fontSize: '0.8rem' }}>{datePublication}</span>
                    {login === createur || login === "Admin"?
                        <>
                            <IconButton edge="end" aria-label="delete">
                                <EditIcon sx={{color:"white"}}/>
                            </IconButton>
                            <IconButton edge="end" aria-label="delete">
                                <DeleteIcon sx={{color:"white"}}/>
                            </IconButton>
                        </>: null}
                </Box>
            }
            sx={{ borderBottom:"solid", borderBottomWidth:1, borderBottomColor:"white"}}
        >
            <Box sx={{ marginRight: 2 }}>
                <img
                    src={image}
                    alt={titre}
                    style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 4 }}
                />
            </Box>
            <ListItemText
                primary={titre}
                secondary={resume}
                sx={{color:"white", fontWeight:"bold", "& .MuiListItemText-primary, & .MuiListItemText-secondary": {overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block", maxWidth: "80%",}, "& .MuiListItemText-secondary": {color: "grey",}}}
            />
        </ListItem>
    )
}