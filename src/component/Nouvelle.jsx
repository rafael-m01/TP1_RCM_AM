import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useContext, useState} from "react";
import LoginContext from "./LoginContext.jsx";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ListeNouvellesContext from "./ListeNouvellesContext.jsx";

export default function Nouvelle({id, titre, image, texteComplet, datePublication, resume, createur, nouvelleIdGetter, setCreerNouvelleDrawerOuvert, estDejaBookmarked}){
    const {login} = useContext(LoginContext)
    const [estBookmarked, setEstBookmarked] = useState(estDejaBookmarked)
    const {setListeNouvelles} = useContext(ListeNouvellesContext)

    const handleModifierNouvelle = () => {
        nouvelleIdGetter(id);
        setCreerNouvelleDrawerOuvert(true);
    };

    const handleAjouterBookmark = () => {
        setEstBookmarked(true)
        setListeNouvelles((oldListeNouvelles) => (oldListeNouvelles.map(nouvelle =>
            nouvelle.id === id
                ? {...nouvelle,
                    bookmarkedPar:[...nouvelle.bookmarkedPar, login]}
                : nouvelle
        )));
    };

    const handleRetirerBookmark = () => {
        setEstBookmarked(false)
        setListeNouvelles((oldListeNouvelles) => (oldListeNouvelles.map(nouvelle =>
            nouvelle.id === id
                ? {...nouvelle,
                    bookmarkedPar:nouvelle.bookmarkedPar.filter(utilisateur => utilisateur !== login)}
                : nouvelle
        )));
    };

    if(estBookmarked !== estDejaBookmarked){
        setEstBookmarked(estDejaBookmarked);
    }

    return(
        <ListItem
            button="true"
            secondaryAction={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <span style={{ color: 'grey', fontSize: '0.8rem' }}>{datePublication}</span>
                    {login === createur || login === "Admin"?
                        <>
                            <IconButton edge="end" aria-label="delete">
                                <EditIcon sx={{color:"white"}} onClick={handleModifierNouvelle}/>
                            </IconButton>
                            <IconButton edge="end" aria-label="delete">
                                <DeleteIcon sx={{color:"white"}}/>
                            </IconButton>
                        </>: null}
                    {login !== "Se connecter"?
                        estBookmarked?
                        <IconButton edge="end" aria-label="bookmark">
                            <BookmarkIcon sx={{color:"white"}} onClick={handleRetirerBookmark}/>
                        </IconButton>:
                        <IconButton edge="end" aria-label="bookmark">
                            <BookmarkBorderIcon sx={{color:"white"}} onClick={handleAjouterBookmark}/>
                        </IconButton>
                        :null
                    }
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