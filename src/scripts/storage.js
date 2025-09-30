import { nouvelles as initialNouvelles } from './nouvelles.js';

const NOUVELLES_KEY = 'listeNouvelles';

/**
 * Récupère la liste des nouvelles.
 * Si le localStorage est vide, il le peuple avec les données initiales.
 * @returns {Array} La liste des nouvelles.
 */
export const getNouvelles = () => {
    try {
        let nouvelles = localStorage.getItem(NOUVELLES_KEY);
        if (!nouvelles) {
            // Si aucune nouvelle n'est sauvegardée, on utilise la liste initiale
            localStorage.setItem(NOUVELLES_KEY, JSON.stringify(initialNouvelles));
            return initialNouvelles;
        }
        return JSON.parse(nouvelles);
    } catch (error) {
        console.error("Erreur lors de la lecture des nouvelles", error);
        return initialNouvelles; // Retourne les données initiales en cas d'erreur
    }
};

/**
 * Sauvegarde une nouvelle nouvelle dans la liste.
 * @param {object} nouvelle - La nouvelle à ajouter (sans id).
 * @returns {Array} La nouvelle liste mise à jour.
 */
export const saveNouvelle = (nouvelle) => {
    const nouvelles = getNouvelles();
    const nouvelleAvecId = {
        ...nouvelle,
        id: Date.now(), // Génère un ID unique simple
    };
    const updatedNouvelles = [nouvelleAvecId, ...nouvelles];
    localStorage.setItem(NOUVELLES_KEY, JSON.stringify(updatedNouvelles));
    return updatedNouvelles;
};