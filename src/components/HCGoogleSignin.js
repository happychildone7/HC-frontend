import { useGoogleLogin } from '@react-oauth/google';
import { loginWithGoogle } from '../auth/authApi.js';
import ic_google from '../images/google.WebP';
import '../styles/HCGoogleSignin.css';

const HCGoogleSignin = ({ onGoogleLogin, cls_glgn_sctn, label }) => {

    const handleLogin = useGoogleLogin({
        flow: 'auth-code',
        onSuccess: async (accessCode) => {
            try{
                const resp = await loginWithGoogle(accessCode.code);
                const json = await resp.json();
                if(!resp.ok){
                    console.login('Google login failed.')
                }
                if(resp.ok){
                    if(onGoogleLogin) onGoogleLogin(json);
                }
            }catch (err){
                console.log('Exception in google login');
            }
        },
        onError: () => console.log('Google login failed.')
    });

    return(
        <div onClick={() => handleLogin()} className={cls_glgn_sctn}>
            <img src={ic_google} className="cls_gg_icn"></img>
            <span className="text-center">{label}</span>
        </div>
    );

};

export default HCGoogleSignin;