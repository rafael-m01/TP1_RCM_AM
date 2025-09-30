const LOGIN_KEY = 'loginUser';
const DEFAULT_USER = 'Se connecter';

/**
 * Récupère l'utilisateur connecté depuis le localStorage.
 * @returns {string} Le nom de l'utilisateur ou l'état par défaut.
 */
export const getLogin = () => {
    return localStorage.getItem(LOGIN_KEY) || DEFAULT_USER;
};

/**
 * Sauvegarde l'utilisateur connecté dans le localStorage.
 * @param {string} username - Le nom de l'utilisateur à sauvegarder.
 */
export const saveLogin = (username) => {
    if (username) {
        localStorage.setItem(LOGIN_KEY, username);
    } else {
        localStorage.removeItem(LOGIN_KEY);
    }
};