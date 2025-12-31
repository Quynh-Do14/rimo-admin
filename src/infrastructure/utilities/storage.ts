
export const clearToken = () => {
    if (typeof window !== "undefined") {
        sessionStorage.removeItem('token');
    }
};

export const getTokenStoraged = () => {
    if (typeof window !== "undefined") {
        return sessionStorage.getItem("token");
    }
};

export const isTokenStoraged = () => {
    if (typeof window !== "undefined") {
        return !!sessionStorage.getItem("token");
    }
    return false;
};

export const saveToken = (name: string, token: string) => {
    if (typeof window !== "undefined") {
        localStorage.setItem(name, token);
    };
};

export const getStorage = (data: string) => {
    if (typeof window !== "undefined") {
        return localStorage.getItem(data);
    }
};

export const setStorage = (key: string, value: string) => {
    if (typeof window !== "undefined") {
        return localStorage.setItem(key, value);
    }
};

export const setSessionStorage = (key: string, value: string) => {
    if (typeof window !== "undefined") {
        return sessionStorage.setItem(key, value);
    }
};

export const getSessionStorage = (data: string) => {
    if (typeof window !== "undefined") {
        return sessionStorage.getItem(data);
    }
};

export const setSesionStorage = (key: string, value: string) => {
    if (typeof window !== "undefined") {
        return sessionStorage.setItem(key, value);
    }
};
export const deleteToken = (value: string) => {
    if (typeof window !== "undefined") {
        localStorage.removeItem(value);
    }
};

export const clearSesionStorage = () => {
    if (typeof window !== "undefined") {
        sessionStorage.clear();
    }
};

