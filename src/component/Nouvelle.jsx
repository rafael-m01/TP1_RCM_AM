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
import NouvelleComplete from "./NouvelleComplete.jsx";
import BoutonSupprimerNouvelle from "./BoutonSupprimerNouvelle.jsx";

export default function Nouvelle({id, titre, image, texteComplet, datePublication, resume, createur, nouvelleIdGetter, supprimerNouvelle, setCreerNouvelleDrawerOuvert, estDejaBookmarked, typeDeJeu}){
    //Utilisation du contexte pour avoir accès au state login
    const {login} = useContext(LoginContext)
    //State utilisé pour permettre l'ajout et la suppression de bookmark, ainsi que permettre le changement visuel instantanné
    const [estBookmarked, setEstBookmarked] = useState(estDejaBookmarked)
    //Utilisation du contexte pour avoir accès au state setter setListeNouvelles
    const {setListeNouvelles} = useContext(ListeNouvellesContext)
    //State utilisé pour controller l'ouverture et fermeture de l'affichage de la nouvelle complète
    const [nouvelleCompleteOuverte, setNouvelleCompleteOuverte] = useState(false)

    //handle appelé au click du bouton modifier, identifie la nouvelle avec le getter d'id et ouvre la section de modification/creation de nouvelle
    const handleModifierNouvelle = () => {
        nouvelleIdGetter(id);
        setCreerNouvelleDrawerOuvert(true);
    };

    //handle appelé au click du bouton bookmark vide, ajoute l'utilisateur actif à la liste de bookmarkedPar de la nouvelle
    const handleAjouterBookmark = () => {
        //Change estBookmarked à true pour que l'affichage du bouton change au bookmark plein
        setEstBookmarked(true)
        //Parcours la liste de nouvelles et ajoute l'utilisateur à bookmarkedPar pour la nouvelle cliquée
        setListeNouvelles((oldListeNouvelles) => (oldListeNouvelles.map(nouvelle =>
            nouvelle.id === id
                ? {...nouvelle,
                    bookmarkedPar:[...nouvelle.bookmarkedPar, login]}
                : nouvelle
        )));
    };

    const handleRetirerBookmark = () => {
        //Change estBookmarked à false pour que l'affichage du bouton change au bookmark vide
        setEstBookmarked(false)
        //Parcours la liste de nouvelles et et retire l'utilisateur de bookmarkedPar pour la nouvelle cliquée
        setListeNouvelles((oldListeNouvelles) => (oldListeNouvelles.map(nouvelle =>
            nouvelle.id === id
                ? {...nouvelle,
                    bookmarkedPar:nouvelle.bookmarkedPar.filter(utilisateur => utilisateur !== login)}
                : nouvelle
        )));
    };

    const handleOpenNouvelleComplete = () => {
        setNouvelleCompleteOuverte(true);
    };

    //S'assure quele state estBookmarked soit synchronisé avec l'info de bookmark enregistrée dans la nouvelle
    if(estBookmarked !== estDejaBookmarked){
        setEstBookmarked(estDejaBookmarked);
    }

    return(
        <>
            <ListItem

                button="true"
                secondaryAction={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <span style={{ color: 'grey', fontSize: '0.8rem' }}>{datePublication}</span>
                        {/* Ne fait apparaitre les boutons modifier et delete que si la nouvelle appartient à l'utilisateur ou s'il est un admin */}
                        {login === createur || login === "Admin"?
                            <>
                                <IconButton edge="end" aria-label="delete">
                                    <EditIcon sx={{color:"white"}} onClick={handleModifierNouvelle}/>
                                </IconButton>
                                <BoutonSupprimerNouvelle id={id} supprimerNouvelle={supprimerNouvelle}/>
                            </>: null}
                        {/* Ne fait apparaitre le bookmark que si un utilisateur est connecté */}
                        {login !== "Se connecter"?
                            //Change le rendu et l'effet du bouton bookmark initial s'il est déjà bookmarked par l'utilisateur ou non
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
                sx={{ borderBottom:"solid", borderBottomWidth:1, borderBottomColor:"white",
                    "&:hover": {backgroundColor: '#383e42'}
                }}
            >
                <Box onClick={handleOpenNouvelleComplete}
                    sx={{ marginRight: 2, "&:hover": {cursor: 'pointer'} }}>
                    <img
                        src={image}
                        alt={titre}
                        style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 4 }}
                    />
                </Box>
                <ListItemText
                    onClick={handleOpenNouvelleComplete}
                    primary={titre}
                    secondary={resume}
                    sx={{
                        color:"white", fontWeight:"bold",
                        "& .MuiListItemText-primary, & .MuiListItemText-secondary": {overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block", maxWidth: "80%",},
                        "& .MuiListItemText-secondary": {color: "grey",},
                        "&:hover": {cursor: 'pointer'}
                    }}
                />
            </ListItem>
            <NouvelleComplete id={id} nouvelleCompleteOuverte={nouvelleCompleteOuverte} setNouvelleCompleteOuverte={setNouvelleCompleteOuverte}
                              titre={titre} image={image} texteComplet={texteComplet} datePublication={datePublication} resume={resume}
                              typeDeJeu={typeDeJeu} createur={createur} estBookmarked={estBookmarked} setEstBookmarked={setEstBookmarked}/>
        </>
    )
}