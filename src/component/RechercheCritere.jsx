import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    Typography,
    Divider,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    TextField,
    Paper,
    Chip,
    Stack
} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


// Cet objet définit la structure de tous les critères de recherche possibles.
// Chaque clé est un type de critère (ex: 'Catégorie de jeu').
// La valeur est un tableau d'options prédéfinies.
// Un tableau vide (comme pour 'Titre') signifie que l'utilisateur devra saisir une valeur manuellement dans un champ de texte.
const criteriaOptions = {
    'Catégorie de jeu': ["Sandbox", "Platformer", "Simulator", "First-person", "Adventure", "Puzzle", "Fighting", "Racing", "Stealth", "Strategy"],
    'Date': ["Aujourd'hui", 'Cette semaine', 'Ce mois-ci', 'Cette année'],
    'Taille de la nouvelle': ['Courte', 'Moyenne', 'Longue'],
    'Titre': [],
};


// Extrait les noms des critères (les clés de l'objet `criteriaOptions`) pour faciliter
const criteriaKeys = Object.keys(criteriaOptions);

export default function RechercheCritere({ critereApplique, setCritereApplique, onRecherche }) {

    // Contient la liste des critères en cours de construction par l'utilisateur avant qu'il ne clique sur "Rechercher".
    // Il est initialisé avec les `critereApplique` passés en props pour permettre de voir et de modifier les critères déjà actifs.
    const [creationCritere , setCreationCritere] = useState(critereApplique);

    // Stocke le type de critère actuellement sélectionné dans le premier menu déroulant (ex: 'Date', 'Titre').
    const [choixCritere, setChoixCritere] = useState(criteriaKeys[0]);

    // Stocke la valeur sélectionnée ou saisie pour le `choixCritere` AVANT de cliquer sur "Ajouter".
    const [valeurCourante, setValeurCourante ] = useState('');

    // PROCESSUS DE SYNCHRONISATION :
    // Ce `useEffect` écoute les changements sur la prop `critereApplique`.
    // Si les critères sont modifiés depuis l'extérieur (ex: un bouton "Réinitialiser tout" dans le composant parent),
    // l'état "brouillon" local (`creationCritere`) est mis à jour pour refléter ce changement.
    // Cela évite que l'interface de recherche affiche des critères qui ne sont plus appliqués.
    useEffect(() => {
        setCreationCritere(critereApplique);
    }, [critereApplique]);

    // PROCESSUS DE CHANGEMENT DE TYPE DE CRITÈRE :
    const handleCritereChange = (event) => {
        setChoixCritere(event.target.value);
        setValeurCourante ('');
    };

    // PROCESSUS D'AJOUT D'UN CRITÈRE AU BROUILLON :
    const handleAddCritere = () => {
        if (!valeurCourante) return;
        const newCritere = { key: choixCritere, value: valeurCourante, id: Date.now() };
        setCreationCritere([...creationCritere, newCritere]);
        setValeurCourante ('');
    };

    // PROCESSUS DE SUPPRESSION D'UN CRITÈRE DU BROUILLON :
    const handleDeleteCritere = (idToDelete) => {
        setCreationCritere(creationCritere.filter(c => c.id !== idToDelete));
    };

    // PROCESSUS DE RÉINITIALISATION COMPLÈTE :
    const handleReset = () => {
        setCreationCritere([]); // Met à jour le brouillon local
        setCritereApplique([]); // Met à jour l'état principal, ce qui rafraîchit la liste
    };

    // PROCESSUS DE RECHERCHE (APPLICATION DES CRITÈRES) :
    const handleSearch = () => {
        setCritereApplique(creationCritere);
        if (onRecherche) {
            onRecherche();
        }
    };

    // CONSTANTE DE RENDU CONDITIONNEL :
    const isTextField = criteriaOptions[choixCritere].length === 0;

    return (
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Typography variant="h6" gutterBottom>
                Recherche par Critères
            </Typography>
            <Divider />

            <Stack spacing={2} sx={{ mt: 2 }}>
                {/* ... (Le formulaire utilise les états et constantes définis ci-dessus pour s'afficher et fonctionner) ... */}
                <FormControl fullWidth>
                    <InputLabel id="critere-select-label">Critère</InputLabel>
                    <Select
                        labelId="critere-select-label"
                        value={choixCritere}
                        label="Critère"
                        onChange={handleCritereChange}
                    >
                        {criteriaKeys.map(key => (
                            <MenuItem key={key} value={key}>{key}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {isTextField ? (
                    <TextField
                        label="Valeur"
                        variant="outlined"
                        fullWidth
                        value={valeurCourante }
                        onChange={(e) => setValeurCourante (e.target.value)}
                    />
                ) : (
                    <FormControl fullWidth>
                        <InputLabel id="valeur-select-label">Valeur</InputLabel>
                        <Select
                            labelId="valeur-select-label"
                            value={valeurCourante }
                            label="Valeur"
                            onChange={(e) => setValeurCourante (e.target.value)}
                        >
                            {criteriaOptions[choixCritere].map(val => (
                                <MenuItem key={val} value={val}>{val}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}

                <Button
                    variant="outlined"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={handleAddCritere}
                >
                    Ajouter le critère
                </Button>
            </Stack>

            <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>
                Critères à appliquer :
            </Typography>
            <Paper
                variant="outlined"
                sx={{
                    flexGrow: 1,
                    p: 1,
                    minHeight: '150px',
                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                }}
            >
                {creationCritere.length === 0 ? (
                    <Box sx={{ color: 'text.secondary', textAlign: 'center', pt: 4 }}>
                        Aucun critère ajouté.
                    </Box>
                ) : (
                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                        {creationCritere.map(c => (
                            <Chip
                                key={c.id}
                                label={`${c.key}: ${c.value}`}
                                onDelete={() => handleDeleteCritere(c.id)}
                            />
                        ))}
                    </Stack>
                )}
            </Paper>

            <Divider sx={{my:2}}/>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button onClick={handleReset}>Réinitialiser</Button>
                <Button variant="contained" onClick={handleSearch}>Rechercher</Button>
            </Stack>
        </Box>
    );
}