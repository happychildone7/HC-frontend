import React from "react";

const HCTermsAndCondition = ({btnName,cls_tnc}) => {
    return(
        <div>
            <span className={cls_tnc}>By clicking on {btnName}, I accept the <b>Terms & Conditions & Privacy Policy</b></span>
        </div>
    );
};
export default HCTermsAndCondition;