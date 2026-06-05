import { API_BASE } from "./config";

export const isloggedIn = async () => {
    const resp = await fetch(`${API_BASE}/api/auth/sessionCheck`, {
        credentials: 'include'
    });
    const data = await resp.json();
    return resp.ok ? data : null;
};
