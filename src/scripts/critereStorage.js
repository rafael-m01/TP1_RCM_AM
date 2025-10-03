const USER_CRITERIA_KEY = 'userCriteria';

/**
 * Récupère l'objet entier des critères pour tous les utilisateurs.
 * @returns {object} L'objet des critères.
 */
const getToutCritereUsager = () => {
    try {
        const data = localStorage.getItem(USER_CRITERIA_KEY);
        return data ? JSON.parse(data) : {};
    } catch (error) {
        console.error("Erreur lors de la lecture des critères", error);
        return {};
    }
};

/**
 * Récupère les critères de recherche pour un utilisateur spécifique.
 * @param {string} username - Le nom de l'utilisateur.
 * @returns {Array} La liste des critères de l'utilisateur ou un tableau vide.
 */
export const getCritereUsager = (username) => {
    if (!username || username === 'Se connecter') {
        return [];
    }
    const allCriteria = getToutCritereUsager();
    return allCriteria[username] || [];
};

/**
 * Sauvegarde les critères de recherche pour un utilisateur spécifique.
 * @param {string} username - Le nom de l'utilisateur.
 * @param {Array} criteria - Le tableau de critères à sauvegarder.
 */
export const saveCritereUsager = (username, criteria) => {
    if (!username || username === 'Se connecter') {
        return; // Ne pas sauvegarder si personne n'est connecté
    }
    try {
        const allCriteria = getToutCritereUsager();
        allCriteria[username] = criteria; // Met à jour les critères pour cet utilisateur
        localStorage.setItem(USER_CRITERIA_KEY, JSON.stringify(allCriteria));
    } catch (error) {
        console.error("Erreur lors de la sauvegarde des critères", error);
    }
};