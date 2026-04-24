const TOKEN_KEY = "token";
const USER_KEY = "user";

const storageTargets = () => [localStorage, sessionStorage];

const safeJsonParse = (value) => {
    if (!value) {
        return null;
    }

    try {
        return JSON.parse(value);
    } catch {
        return null;
    }
};

export const getAuthToken = () => {
    for (const storage of storageTargets()) {
        const token = storage.getItem(TOKEN_KEY);

        if (token) {
            return token;
        }
    }

    return null;
};

export const getStoredUser = () => {
    for (const storage of storageTargets()) {
        const user = safeJsonParse(storage.getItem(USER_KEY));

        if (user) {
            return user;
        }
    }

    return null;
};

export const persistAuthSession = ({ token, user, rememberMe = true }) => {
    const targetStorage = rememberMe ? localStorage : sessionStorage;
    const staleStorage = rememberMe ? sessionStorage : localStorage;

    staleStorage.removeItem(TOKEN_KEY);
    staleStorage.removeItem(USER_KEY);

    targetStorage.setItem(TOKEN_KEY, token);
    targetStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearAuthSession = () => {
    for (const storage of storageTargets()) {
        storage.removeItem(TOKEN_KEY);
        storage.removeItem(USER_KEY);
    }
};
