import { createContext, useState, useEffect } from 'react';
import { isloggedIn } from '../utils/authUtil';

export const AuthContext = createContext() ;

export const AuthProvider = ({ children }) => {
    const [user,setUser] = useState(null);
    const [contact, setContact] = useState(() => {
        const cached = sessionStorage.getItem('contact');
        return cached ? JSON.parse(cached) : null;
    });
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const result = await isloggedIn();
                console.log('reee>>',result);
                setUser(result?.user || null);
                if (result?.contact) {
                    setContact(result.contact);
                    sessionStorage.setItem(
                        'contact',
                        JSON.stringify(result.contact)
                    );
                } else {
                    setContact(null);
                    sessionStorage.removeItem('contact');
                }
            } catch (err) {
                console.error('Auth initialization failed', err);
                setUser(null);
                setContact(null);
            } finally {
                setLoading(false);
            }
        };
        checkLogin();
    }, []);

    return(
        <AuthContext.Provider value={{ user, setUser, contact, setContact, loading }}>
           {children}
        </AuthContext.Provider>
    );
};