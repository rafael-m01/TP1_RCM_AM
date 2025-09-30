import * as React from 'react';
import { useState } from 'react';
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

const criteriaOptions = {
    'Catégorie de jeu': ["Sandbox", "Platformer", "Simulator", "First-person", "Adventure", "Puzzle", "Fighting", "Racing", "Stealth", "Strategy"],
    'Date': ["Aujourd'hui", 'Cette semaine', 'Ce mois-ci', 'Cette année'],
    'Taille de la nouvelle': ['Courte', 'Moyenne', 'Longue'],
    'Titre': [],
};

const criteriaKeys = Object.keys(criteriaOptions);

// Accepte appliedCriteria et setAppliedCriteria comme props
export default function RechercheCritere({ appliedCriteria, setAppliedCriteria }) {
    const [selectedCritere, setSelectedCritere] = useState(criteriaKeys[0]);
    const [currentValue, setCurrentValue] = useState('');

    const handleCritereChange = (event) => {
        setSelectedCritere(event.target.value);
        setCurrentValue('');
    };

    const handleAddCritere = () => {
        if (!currentValue) return;

        const newCritere = {
            key: selectedCritere,
            value: currentValue,
            id: Date.now()
        };
        // Utilise le setter des props
        setAppliedCriteria([...appliedCriteria, newCritere]);
        setCurrentValue('');
    };

    const handleDeleteCritere = (idToDelete) => {
        // Utilise le setter des props
        setAppliedCriteria(appliedCriteria.filter(c => c.id !== idToDelete));
    };

    const isTextField = criteriaOptions[selectedCritere].length === 0;

    return (
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Typography variant="h6" gutterBottom>
                Recherche par Critères
            </Typography>
            <Divider />

            <Stack spacing={2} sx={{ mt: 2 }}>
                <FormControl fullWidth>
                    <InputLabel id="critere-select-label">Critère</InputLabel>
                    <Select
                        labelId="critere-select-label"
                        value={selectedCritere}
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
                        value={currentValue}
                        onChange={(e) => setCurrentValue(e.target.value)}
                    />
                ) : (
                    <FormControl fullWidth>
                        <InputLabel id="valeur-select-label">Valeur</InputLabel>
                        <Select
                            labelId="valeur-select-label"
                            value={currentValue}
                            label="Valeur"
                            onChange={(e) => setCurrentValue(e.target.value)}
                        >
                            {criteriaOptions[selectedCritere].map(val => (
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
                Critères appliqués :
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
                {appliedCriteria.length === 0 ? (
                    <Box sx={{ color: 'text.secondary', textAlign: 'center', pt: 4 }}>
                        Aucun critère ajouté.
                    </Box>
                ) : (
                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                        {appliedCriteria.map(c => (
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
                {/* Le bouton réinitialiser utilise aussi le setter des props */}
                <Button onClick={() => setAppliedCriteria([])}>Réinitialiser</Button>
                <Button variant="contained" disabled>Rechercher</Button>
            </Stack>
        </Box>
    );
}