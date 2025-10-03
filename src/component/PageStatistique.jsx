// PageStatistiques.jsx

import React, { useContext } from 'react';
import { Box, Typography, Paper, Grid, Divider, List, ListItem, ListItemText, Container, Button, Stack } from '@mui/material';
import ListeNouvellesContext from './ListeNouvellesContext.jsx';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BarChartIcon from '@mui/icons-material/BarChart';
import CategoryIcon from '@mui/icons-material/Category';
import StraightenIcon from '@mui/icons-material/Straighten';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

// Fonction checkDate
const checkDate = (nouvelleDateStr, critereValue) => {
    if (!nouvelleDateStr) return false;
    const nouvelleDate = new Date(`${nouvelleDateStr}T12:00:00`);
    const now = new Date();
    switch (critereValue) {
        case "Aujourd'hui":
            return nouvelleDate.toDateString() === now.toDateString();
        case "Cette semaine": {
            const dayOfWeek = now.getDay() === 0 ? 6 : now.getDay() - 1;
            const weekStart = new Date(now);
            weekStart.setDate(now.getDate() - dayOfWeek);
            weekStart.setHours(0, 0, 0, 0);
            return nouvelleDate >= weekStart;
        }
        case "Ce mois-ci":
            return nouvelleDate.getMonth() === now.getMonth() && nouvelleDate.getFullYear() === now.getFullYear();
        case "Cette année":
            return nouvelleDate.getFullYear() === now.getFullYear();
        default: return true;
    }
};

// fonction responsable de chercker la taille
const checkTaille = (contenu, critereValue) => {
    if (typeof contenu !== 'string') return false;
    const length = contenu.length;
    switch (critereValue) {
        case 'Courte': return length < 1000;
        case 'Moyenne': return length >= 1000 && length < 2500;
        case 'Longue': return length >= 2500;
        default: return true;
    }
};


// Composant pour afficher une statistique individuelle
const StatCard = ({ title, value, unit }) => (
    <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
        <Stack spacing={0.5}>
            <Typography variant="body2" color="text.secondary">{title}</Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {value} <Typography variant="caption" component="span">{unit}</Typography>
            </Typography>
        </Stack>
    </Paper>
);

export default function PageStatistiques({ onRetour }) {
    const { listeNouvelles } = useContext(ListeNouvellesContext);

    // ... Calculs des statistiques (inchangés) ...
    const nombreTotal = listeNouvelles.length;
    const tailles = listeNouvelles.map(n => n.texteComplet.length);
    const tailleMin = Math.min(...tailles);
    const tailleMax = Math.max(...tailles);
    const tailleMoyenne = Math.round(tailles.reduce((a, b) => a + b, 0) / nombreTotal);
    const dates = listeNouvelles.map(n => n.datePublication);
    const datePlusRecente = dates.reduce((a, b) => (a > b ? a : b));
    const datePlusAncienne = dates.reduce((a, b) => (a < b ? a : b));
    const statsCategories = listeNouvelles.reduce((acc, nouvelle) => {
        const categorie = nouvelle.typeDeJeu || "Non classé";
        acc[categorie] = (acc[categorie] || 0) + 1;
        return acc;
    }, {});
    const statsTaille = { 'Courte': 0, 'Moyenne': 0, 'Longue': 0 };
    listeNouvelles.forEach(n => {
        if (checkTaille(n.texteComplet, 'Courte')) statsTaille['Courte']++;
        else if (checkTaille(n.texteComplet, 'Moyenne')) statsTaille['Moyenne']++;
        else if (checkTaille(n.texteComplet, 'Longue')) statsTaille['Longue']++;
    });
    const statsDate = { "Aujourd'hui": 0, 'Cette semaine': 0, 'Ce mois-ci': 0, 'Cette année': 0 };
    ["Aujourd'hui", 'Cette semaine', 'Ce mois-ci', 'Cette année'].forEach(valeur => {
        statsDate[valeur] = listeNouvelles.filter(n => checkDate(n.datePublication, valeur)).length;
    });

    if (listeNouvelles.length === 0) {
        return <Typography variant="h5" sx={{ p: 3 }}>Aucune nouvelle à analyser.</Typography>;
    }

    return (
        <Box sx={{ backgroundColor: "#f0f0f0", minHeight: "100vh", py: 4 }}>
            <Container maxWidth="lg">
                <Stack spacing={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={onRetour} sx={{  mr: 2,
                            color: 'black',
                            borderColor: 'black',
                            '&:hover': {
                                borderColor: 'black',
                                backgroundColor: 'rgba(0, 0, 0, 0.08)'
                            }}}>
                            Retour
                        </Button>
                        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
                            Tableau de Bord
                        </Typography>
                    </Box>

                    {/*Section des statistiques générales */}
                    <Paper sx={{ p: 3, borderRadius: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                            <BarChartIcon color="black" />
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Statistiques Générales</Typography>
                        </Box>
                        <Grid container spacing={2}>
                            <Grid item xs={6} sm={4} md={2}><StatCard title="Total nouvelles" value={nombreTotal} /></Grid>
                            <Grid item xs={6} sm={4} md={2}><StatCard title="Taille min." value={tailleMin} unit="car." /></Grid>
                            <Grid item xs={6} sm={4} md={2}><StatCard title="Taille max." value={tailleMax} unit="car." /></Grid>
                            <Grid item xs={6} sm={4} md={2}><StatCard title="Taille moyenne" value={`~${tailleMoyenne}`} unit="car." /></Grid>
                            <Grid item xs={6} sm={4} md={2}><StatCard title="Plus ancienne" value={datePlusAncienne} /></Grid>
                            <Grid item xs={6} sm={4} md={2}><StatCard title="Plus récente" value={datePlusRecente} /></Grid>
                        </Grid>
                    </Paper>

                    {/* Section des répartitions */}
                    <Paper sx={{ p: 3, borderRadius: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Répartition par Critères</Typography>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={4}>
                                <Stack>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><CategoryIcon fontSize="small" color="action" /><Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Par catégorie</Typography></Box>
                                    <List dense>{Object.entries(statsCategories).map(([k, v]) => (<ListItem key={k} disablePadding><ListItemText primary={k} secondary={`${v} nouvelle(s)`} /></ListItem>))}</List>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Stack>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><StraightenIcon fontSize="small" color="action" /><Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Par taille</Typography></Box>
                                    <List dense>{Object.entries(statsTaille).map(([k, v]) => (<ListItem key={k} disablePadding><ListItemText primary={k} secondary={`${v} nouvelle(s)`} /></ListItem>))}</List>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Stack>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><CalendarTodayIcon fontSize="small" color="action" /><Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Par date</Typography></Box>
                                    <List dense>{Object.entries(statsDate).map(([k, v]) => (<ListItem key={k} disablePadding><ListItemText primary={k} secondary={`${v} nouvelle(s)`} /></ListItem>))}</List>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Paper>
                </Stack>
            </Container>
        </Box>
    );
}