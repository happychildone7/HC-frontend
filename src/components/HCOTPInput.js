import React, { useEffect, useRef } from "react";
import '../styles/HMSOTPInput.css';

const HMSOTPInput = (props) => {
    const { otp, setOtp, clsOtpCard, clsOtpInp, onSubmit } = props;
    const otpLength = otp.length;
    const inputs = useRef([]);

    const handleChange = (e,index) => {
        const val = e.target.value;
        if (!/^[0-9]?$/.test(val)) return;

        const newOtp = [...otp];
        newOtp[index] = val;
        setOtp(newOtp);

        //move to next input
        if(val !== "" && index < 5){
            inputs.current[index+1].focus();
        }
    };
    const handleKeyDown = (e,index) => {
        if(e.key === 'Backspace' && !otp[index] && index > 0 ){
            inputs.current[index-1].focus();
        }
    };

    useEffect(() => {
        if(otp.every(d => d !== "") && otp.length === otpLength){
            onSubmit?.(otp.join(""));
        }
    },[otp, onSubmit]);

    return(
        <div className={clsOtpCard || "cls_otp_crd"}>
            {otp.map((digit,i) => (
                <input 
                    key={i}
                    type="text"
                    inputMode="numeric"
                    className={clsOtpInp || "cls_otp_inp"}
                    maxLength="1"
                    value={digit}
                    onKeyDown={(e) => handleKeyDown(e,i)}
                    onChange={(e) => handleChange(e,i)}
                    ref={(el) => (inputs.current[i] = el)}
                    >
                </input>
            ))}
        </div>
    );
};
export default HMSOTPInput;