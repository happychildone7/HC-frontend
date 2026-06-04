export const isloggedIn = async () => {
    const resp = await fetch('/api/auth/sessionCheck', {
        credentials: 'include'
    });
    const data = await resp.json();
    return resp.ok ? data : null;
};
