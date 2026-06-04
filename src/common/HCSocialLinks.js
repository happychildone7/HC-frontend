import React from 'react';
import ic_X from '../images/twitter.WebP';
import ic_instagram from '../images/instagram.WebP';
import ic_facebook from '../images/facebook.WebP';
import ic_youtube from '../images/youtube.WebP';
import ic_linkedin from '../images/linkedin.WebP';
import '../styles/HCSocialLinks.css';

const HCSocialLinks = () => {
    return(
        <div className="linkBox">
            <a href="https://www.facebook.com/profile.php?id=61573219941570" target="_blank">
                <img src={ic_facebook} className="iconclsSL_FB"></img>
            </a>
            <a href="" >
                <img src={ic_instagram} className="iconclsSL_IG"></img>
            </a>
            <a href="https://www.linkedin.com/company/siriusnovadx" target="_blank">
                <img src={ic_linkedin} className="iconclsSL_LN"></img>
            </a>
            <a href="https://x.com/NovaSiriusDX" target="_blank">
                <img src={ic_X} className="iconclsSL_X"></img>
            </a>
            <a href="">
                <img src={ic_youtube} className="iconclsSL_YT"></img>
            </a>
        </div>
    );
};
export default HCSocialLinks;