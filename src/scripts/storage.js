// ./scripts/storage.js

import { nouvelles as initialNouvelles } from './nouvelles.js';

const NOUVELLES_KEY = 'listeNouvelles';

/**
 * Récupère la liste des nouvelles.
 * Si le localStorage est vide, il le peuple avec les données initiales.
 * @returns {Array} La liste des nouvelles.
 */
export const getNouvelles = () => {
    try {
        const nouvelles = localStorage.getItem(NOUVELLES_KEY);
        if (!nouvelles) {
            localStorage.setItem(NOUVELLES_KEY, JSON.stringify(initialNouvelles));
            return initialNouvelles;
        }
        return JSON.parse(nouvelles);
    } catch (error) {
        console.error("Erreur lors de la lecture des nouvelles", error);
        return initialNouvelles;
    }
};

/**
 * Sauvegarde un tableau complet de nouvelles dans le localStorage.
 * C'est la seule fonction dont nous avons besoin pour écrire des données.
 * @param {Array} nouvelles - Le tableau complet des nouvelles à sauvegarder.
 */
export const saveNouvelles = (nouvelles) => {
    try {
        localStorage.setItem(NOUVELLES_KEY, JSON.stringify(nouvelles));
    } catch (error) {
        console.error("Erreur lors de la sauvegarde des nouvelles", error);
    }
};