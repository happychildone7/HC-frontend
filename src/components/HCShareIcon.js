import React from "react";
import ic_Share from "../images/share.WebP";

const HCShareIcon = ({ contCls, imgCls }) => {

    return(
        <div className={contCls}>
            <img src={ic_Share} className={imgCls} alt="share" />
        </div>
    );
};
export default HCShareIcon;