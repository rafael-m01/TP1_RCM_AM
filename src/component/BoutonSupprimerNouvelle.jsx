import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import {useState} from "react";

//Composant MUI copié et adapté pour l'affichage du site (AlertDialog)
export default function BoutonSupprimerNouvelle({ id, supprimerNouvelle }) {
    //State créé par MUI pour gerer l'ouverture et fermeture du Dialog
    const [open, setOpen] = useState(false);

    //handles pour gerer les action du Dialog
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleConfirm = () => {
        //Utilise le handle en paramètre pour supprimer la nouvelle une fois confirmé
        supprimerNouvelle(id);
        setOpen(false);
    };

    return (
        <>
            <IconButton edge="end" aria-label="delete" onClick={handleClickOpen}>
                <DeleteIcon sx={{ color: "white" }} />
            </IconButton>

            <Dialog open={open} onClose={handleClose} PaperProps={{sx:{backgroundColor:"#272f36"}}}>
                <DialogTitle sx={{fontWeight:"bold", color:"white"}}>Confirmer la suppression</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{color:"white"}}>
                        Voulez-vous vraiment supprimer cette nouvelle ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={handleConfirm} color="error" autoFocus>
                        Supprimer
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}