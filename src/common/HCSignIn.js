import React,{ useState } from "react";
import LOGO from '../images/logo.WebP';
import Button from '../components/HCButton';
import HCModal from '../components/HCModal';
import ic_google from '../images/google.WebP';
import ic_email from '../images/email.WebP';
import ic_apple from '../images/apple.WebP';
import ic_india from '../images/india.WebP';
import HCOTPInput from '../components/HCOTPInput.js';
import '../styles/HCSignIn.css';
import ic_checked from '../images/check.WebP';
import HCTermsAndCondition from "./HCTermsAndCondition.js";
import { isEmailValid, isPhoneValid,isPasswordStrong,doPasswordsMatch } from '../utils/validations.js';
import { loginUser } from "../auth/authApi.js";
import HCPasswordInput from "../components/HCPasswordInput";
import '../styles/HCSignIn.css';
import HCGoogleSignin from "../components/HCGoogleSignin.js";
import HCFacebookSignin from "../components/HCFacebookSignin.js";
import { useAuth } from "../auth/useAuth";
import { Link,Navigate, useNavigate } from "react-router-dom";

const HCSignIn = ({ showModal,onClose,onLogin,onUserLogin }) => {
    const [showSignInHome,setShowSignInHome] = useState(true);
    const [loginWithEmail,setLoginWithEmail] = useState(false);
    const [showSignUp,setShowSignUp] = useState(false);
    const [title,setTitle] = useState('Get Started');
    const [email__c,setEmail__c] = useState('');
    const [password__c,setPassword__c] = useState('');
    const [confirm_Password__c,setConfirm_Password__c] = useState('');
    const [phone__c,setPhone__c] = useState('');
    const [emailError,setEmailError] = useState('');
    const [passwordError,setPasswordError] = useState('');
    const [confirmPasswordError,setConfirmPasswordError] = useState('');
    const [phoneError,setPhoneError] = useState('');
    const [isSignUpLoading,setIsSignUpLoading] = useState(false);
    const [signUpErrorVisible,setSignUpErrorVisible] = useState(false);
    const [error,setError] = useState('');
    const [showVerifyOtp,setShowVerifyOtp] = useState(false);
    const [signUpSpinner,setSignUpSpinner] = useState(false);
    const [otp, setOtp] = useState(["","","","","",""]);
    const [isOtpVerifying,setIsOtpVerifying] = useState(false);
    const [enteredOtp,setEnteredOtp] = useState('');
    const [otpVerifyError,setOtpVerifyError] = useState('');
    const [otpSuccess,setOtpSuccess] = useState('');
    const [disableVerifyOtp,setDisableVerifyOtp] = useState(true);
    const [isRegisterSuccess,setIsRegisterSuccess] = useState(false);
    const { setUser } = useAuth();
    const navigate = useNavigate();
    
    const handleClickEmail = () => {
        setTitle('Login with Email');
        setLoginWithEmail(true);
        setShowSignInHome(false);
        setShowSignUp(false);
    };
    const handleRefresh = () => {
        setEmail__c('');
        setPassword__c('');
        setConfirm_Password__c('');
        setPhone__c('');
        setEmailError('');
        setPasswordError('');
        setConfirmPasswordError('');
        setPhoneError('');
    };
    const handleBack = () => {
        setTitle('Get Started');
        handleRefresh();
        setLoginWithEmail(false);
        setShowSignInHome(true);
        setShowSignUp(false);
        setShowVerifyOtp(false);
    }
    const handleUserLogin = async (e) => {
        e.preventDefault();
        try{
            const resp = await loginUser(email__c,password__c);
            const json = await resp.json();
            if(!resp.ok){
                alert(resp.error);
            }
            if(resp.ok){
                if(onUserLogin) onUserLogin(json);
                if(onLogin) onLogin(json);
            }
        }catch(error){
            console.log('ERRORinUI>',JSON.stringify(error));
        }
    }
    const handleSignUp = () => {
        setTitle('Sign Up');
        setLoginWithEmail(false);
        setShowSignInHome(false);
        setShowSignUp(true);
    };
    const handleSendOtp = async (e) => {
        e.preventDefault()
        const errors = {
            email__c: !email__c.trim() 
                ? 'Email is required.' 
                : !isEmailValid(email__c) 
                ? 'Invalid email format.' 
                : '',

            password__c: !password__c.trim()
                ? 'Password is required.'
                : !isPasswordStrong(password__c)
                ? 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.'
                : '',

            confirm_Password__c: !confirm_Password__c.trim()
                ? 'Confirm password is required.'
                : !doPasswordsMatch(password__c, confirm_Password__c)
                ? 'Passwords do not match.'
                : '',

            phone__c: phone__c.trim() 
                ? !isPhoneValid(phone__c) 
                ? 'Invalid phone number.' 
                : ''
                :'',
        };
    
        // Set errors
        setEmailError(errors.email__c);
        setPasswordError(errors.password__c);
        setConfirmPasswordError(errors.confirm_Password__c);
        setPhoneError(errors.phone__c);
        // Prevent form submission if there are errors
        if (Object.values(errors).some(error => error)) {
            return;
        }
        const form_data = { email__c,password__c,phone__c }
        console.log('FROM_DATA>',JSON.stringify(form_data));
        try{
            setSignUpSpinner(true);
            const resp = await fetch('/api/signup/register', {
                method: 'POST',
                body: JSON.stringify(form_data),
                headers: {
                    'content-type' : 'application/json'
                }
            })
            const json = await resp.json()
            if(!resp.ok){
                setError(JSON.stringify(json.error));
                setSignUpSpinner(false);
                setSignUpErrorVisible(true);
                setTimeout(() => {
                    setSignUpErrorVisible(false);
                }, 3000);
            }
            if(resp.ok){
                //handleRefresh();
                setError(null);
                setSignUpSpinner(false);
                setShowVerifyOtp(true);
                setTitle('Verify your email address');
                setShowSignUp(false);
                console.log('user created',json);
            }
        }catch(error){
            console.log('ERRORinUI>',JSON.stringify(error));
            setError(error);
            setSignUpErrorVisible(true);
            setTimeout(() => {
                setSignUpErrorVisible(false);
            }, 2000);
        }
    };
    const handleResendOtp = async (e) => {
        e.preventDefault();
        setOtpVerifyError(false);
        setDisableVerifyOtp(true);
        setOtp(["","","","","",""]);
        handleSendOtp(e);
    };
    const handleOtpSubmit = (otpVal) => {
        console.log('OTPVAL',otpVal+'-'+otp);
        setEnteredOtp(otpVal);
        setDisableVerifyOtp(false);
    };
    const handleVerifySignUpOtp = async (e) => {
        e.preventDefault();
        const form_data = { email__c,enteredOtp }
        try{
            setIsOtpVerifying(true);
            const resp = await fetch('/api/signup/verifyUser', {
                method: 'POST',
                body: JSON.stringify(form_data),
                headers: {
                    'content-type' : 'application/json'
                }
            });
            const json = await resp.json()
            if(!resp.ok){
                setTimeout(() => {
                    setIsOtpVerifying(false);
                    setOtpVerifyError(typeof json.error === 'string' ? json.error : json.error.message || 'Unknown error');
                    setOtpSuccess(null);
                }, 3000);
            }
            if(resp.ok){
                //handleRefresh();
                setOtpVerifyError(null);
                setOtpSuccess(typeof json.message === 'string' ? json.message : json.message || '');
                setIsOtpVerifying(false);
                setShowVerifyOtp(false);
                setTitle(typeof json.message === 'string' ? json.message : json.message || '');
                setIsRegisterSuccess(true);
                getUser(json.userId);
            }
        }catch(error){
            console.log('ERRORinUI>',JSON.stringify(error));
            setIsOtpVerifying(false);
            setOtpVerifyError(error);
        }
    };
    const getUser = async (e) => {
        try{
            setIsOtpVerifying(true);
            const resp = await loginUser(email__c,password__c);
            const json = await resp.json();
            if(!resp.ok){
                alert(json.error || 'Login failed');
                setIsOtpVerifying(false);
                return;
            }
            if(resp.ok){
                if (onUserLogin) {
                    console.log('Calling onUserLogin (from HCLogin)');
                    onUserLogin(json);  // used when invoked from HCLogin
                } else if (onLogin) {
                    console.log('Calling onLogin (from HCHeader)');
                    onLogin(json);      // used when invoked from HCHeader
                }
            }
        }catch(error){
            console.log('ERRORinUI>',JSON.stringify(error));
        }
    };
    const handleGoogleLogin = (resp) => { 
        console.log('ressop>',resp);
        setUser(resp.user);
        navigate('/');
    };
    const handleFacebookLogin = (resp) => {
        console.log('ressop>',resp);
        setUser(resp.user);
        navigate('/');
    };

    return(
        <HCModal isOpen={showModal} onClose={onClose} logo={LOGO} title={title}>
            <div id="input_form">
                <form className="cls_form_cnt">
                    {showSignInHome && 
                        <div>
                            <div className="cls_frm_body_sign">
                                <HCGoogleSignin onGoogleLogin={handleGoogleLogin} cls_glgn_sctn="cls_sgn_crd" label="Continue with Google"/>
                                <HCFacebookSignin onFBLogin={handleFacebookLogin} cls_fblgn_sctn="cls_sgn_crd" label="Continue with Facebook" />
                                <div className="cls_sgn_crd" onClick={handleClickEmail}>
                                    <img src={ic_email} className="cls_gg_icn"></img>
                                    <span>Continue with Email</span>
                                </div>
                                <div className="cls_sgn_crd">
                                    <img src={ic_apple} className="cls_gg_icn"></img>
                                    <span>Continue with Apple</span>
                                </div>
                            </div>
                            <div className="cls_sign_or">
                                <span className="">Or</span>
                            </div>
                            <div className="cls_sign_phone">
                                <img src={ic_india} className="cls_icn" />
                                <span>+91</span>
                                <input type="text" className="cls_inp_phone" placeholder="Continue with mobile number"></input>
                            </div>
                            <div className="cls_Submit">
                                <Button myclass="btn_submit" onClick="">Continue</Button>
                            </div>
                            <div className="cls_nonMemb" onClick={handleSignUp}>
                                <span>Not a member yet? SignUp</span>
                            </div>
                        </div>
                    }
                    {loginWithEmail && 
                        <div>
                            <button className="cls-back" onClick={handleBack}>&#8249;</button>
                            <div className="cls_frm_body">
                                <div className="">
                                    <input className="cls_frm_inp" type="text" placeholder="Email"
                                        onChange={(e) => setEmail__c(e.target.value)}
                                        value={email__c}>
                                    </input>
                                </div>
                                <HCPasswordInput 
                                    placeholder="Password*" 
                                    value={password__c} 
                                    onChange={(e) => setPassword__c(e.target.value)}
                                    name="password"
                                    isValid={isPasswordStrong} 
                                    error={passwordError}>
                                </HCPasswordInput>
                            </div>
                            <div className="clsSubmit">
                                <Button myclass="btn_submit" onClick={handleUserLogin}>Login</Button>
                                <HCTermsAndCondition btnName="login" cls_tnc="cls_tnc"/>
                            </div>
                        </div>
                    }
                    {showSignUp && 
                        <div>
                            <button className="cls-back" onClick={handleBack}>&#8249;</button>
                            <div className="cls_frm_body">
                                <div className="">
                                    <input className="cls_frm_inp" type="email" placeholder="Email*"
                                        onChange={(e) => setEmail__c(e.target.value)}
                                        value={email__c}>
                                    </input>
                                    <div className="text-label-red text-small" style={{display:emailError ? "block" : "none"}}><b>{emailError}</b></div>
                                </div>
                                <HCPasswordInput 
                                    placeholder="Password*" 
                                    value={password__c} 
                                    onChange={(e) => setPassword__c(e.target.value)}
                                    name="password"
                                    isValid={isPasswordStrong} 
                                    error={passwordError}>
                                </HCPasswordInput>
                                <HCPasswordInput 
                                    placeholder="Confirm password*" 
                                    value={confirm_Password__c} 
                                    onChange={(e) => setConfirm_Password__c(e.target.value)}
                                    name="confirmPassword"
                                    isValid={(val) => doPasswordsMatch(password__c, val) && isPasswordStrong(password__c)} 
                                    error={confirmPasswordError}>
                                </HCPasswordInput>
                                <div className="">
                                    <input className="cls_frm_inp" type="phone" placeholder="Phone (optional, for OTP login)"
                                        onChange={(e) => setPhone__c(e.target.value)}
                                        value={phone__c}>
                                    </input>
                                    <div className="text-label-red text-small" style={{display:phoneError ? "block" : "none"}}><b>{phoneError}</b></div>
                                </div>
                            </div>
                            <div className="clsSubmit">
                                <Button myclass="btn_submit" onClick={handleSendOtp}>
                                    {signUpSpinner ? 
                                        (
                                            <span className="spinner"></span>
                                        ) : 
                                        (
                                            'Continue'
                                        )
                                    }
                                </Button>
                                <HCTermsAndCondition btnName="continue" cls_tnc="cls_tnc"/>
                            </div>
                            <div className="cls_nonMemb" onClick={handleBack}>
                                <span>Already a member? Login</span>
                            </div>
                        </div>
                    }
                    {showVerifyOtp && 
                        <div>
                            <button className="cls-back" onClick={handleBack}>&#8249;</button>
                            <span className="cls_txt_otp">Enter OTP sent to &nbsp;<b> {email__c}</b></span>
                            <div className="cls_frm_body">
                                <HCOTPInput otp={otp} setOtp={setOtp} onSubmit={handleOtpSubmit} />
                            </div>
                            {otpVerifyError && 
                                <div className="cls_otpErr_sctn text-label-red text-small">
                                    <b>{otpVerifyError}</b>
                                    <span className="text-label-blue margin_btm_min5 cusr_pointer" onClick={handleResendOtp}>Resend OTP</span>
                                </div>
                            }
                            <div className="text-label-green text-small justify-center cls_center" style={{display:otpSuccess ? "flex" : "none"}}>
                                <b>{otpSuccess}</b>
                                <img src={ic_checked} className="edit_img"></img>
                            </div>
                            <div className="clsSubmit">
                                <Button myclass={disableVerifyOtp ? "btn_submit_disabled" : "btn_submit"} onClick={handleVerifySignUpOtp}>
                                    {isOtpVerifying ? 
                                        (
                                            <span className="spinner"></span>
                                        ) : 
                                        (
                                            'Verify OTP'
                                        )
                                    }
                                </Button>
                                <HCTermsAndCondition btnName="continue" cls_tnc="cls_tnc"/>
                            </div>
                            <div className="cls_nonMemb" onClick={handleBack}>
                                <span>Already a member? Login</span>
                            </div>
                        </div>
                    }
                    {isRegisterSuccess && 
                        <div>
                            <div className="cls_center justify-center">
                                <img src={ic_checked} className="cls_succs"></img>
                            </div>
                        </div>
                    }
                </form>
            </div>
        </HCModal>
    );
};
export default HCSignIn;