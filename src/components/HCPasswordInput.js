import React, { useState } from "react";
import '../styles/HCPasswordInput.css';

const HCPasswordInput = ({ placeholder,value,onChange,name,isValid = () => false,error="" }) => {
    const [showPassword,setShowPassword] = useState(false);
    const [passwordTouched,setPasswordTouched] = useState(false);
    return(
        <div className="">
            <div className="input-password-wrapper">
                <input className="cls_frm_inp" type={showPassword ? "text" : "password"} placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                    name={name}
                    onBlur={() => setPasswordTouched(true)}>
                </input>
                <span
                    className="icon-eye"
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? "Hide" : "Show"}
                >
                    {showPassword ? "🙈" : "👁️"}
                </span>
                {passwordTouched && isValid(value) && (
                    <span className="icon-check">✅</span>
                )}
            </div>
            <div className="text-label-red text-small" style={{display:error ? "block" : "none"}}><b>{error}</b></div>
        </div>
    );
};
export default HCPasswordInput;