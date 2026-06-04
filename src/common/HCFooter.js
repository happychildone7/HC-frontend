import React,{ useState,useRef } from 'react';
import '../styles/HCFooter.css';
import Button from '../components/HCButton';
import ic_logo from '../images/logo.WebP';
import ic_email from '../images/email.WebP';
import ic_globe from '../images/globe.WebP';
import ic_phone from '../images/phone.WebP';
import ic_gps from '../images/gps.WebP';
import ic_check from '../images/check.WebP';
import HCSocialLinks from './HCSocialLinks';

const HCFooter = () => {
    
    return(
        <div className="foot">
            <div className="cls_copyright">
                    <div className="cls_foot_det">
                        <img src={ic_logo} className="logo_FT"></img>
                        <div className="cls_ft_uselink">
                            <span className="text-label-white"><b>Useful Links</b></span>
                            <a href= "/" className="emailLink text-label-white">
                                Home
                            </a>
                            <a href= "/salesforce-solutions" className="emailLink text-label-white">
                                Schools
                            </a>
                            <a href= "/salesforce-services" className="emailLink text-label-white">
                                Institutes
                            </a>
                            <a href= "/salesforce-services" className="emailLink text-label-white">
                                Events
                            </a>
                            <a href= "/about-us" className="emailLink text-label-white">
                                Post Ad
                            </a>
                            <a href= "/privacy-policy" className="emailLink text-label-white">
                                Privacy Policy
                            </a>
                            <a href= "/terms-conditions" className="emailLink text-label-white">
                                Terms of Use
                            </a>
                        </div>
                        <div className="cls_ft_uselink">
                            <span className="text-label-white"><b>Get in Touch</b></span>
                            <a href= "mailto:info@siriusnovax.com" className="emailLink clsIcon_AU" >
                                <img src={ic_email} className="icon_cls_cnt_FT"></img>
                                <span className="text-label-white">Email: happychildone7@gmail.com.</span>
                            </a>
                            <a href= "https://www.siriusnovadx.com" className="emailLink clsIcon_TC" target="_blank">
                                <img src={ic_globe} className="icon_cls_cnt_FT"></img>
                                <span className="text-label-white">Website: www.siriusnovadx.com.</span>
                            </a>
                            <a href= "tel:+7706547395" className="emailLink clsIcon_TC">
                                <img src={ic_phone} className="icon_cls_cnt_FT"></img>
                                <span className="text-label-white">+1-770-654-7395</span>
                            </a>
                            <a href= "https://maps.app.goo.gl/sbQJbfrA5zCEqnKq9" className="emailLink clsIcon_TC" target="_blank">
                                <img src={ic_gps} className="icon_cls_cnt_FT"></img>
                                <span className="text-label-white">Headquarters: 2031 Cobblefield CIR,<br/> Dacula, GA-30019 USA</span>
                            </a>
                        </div>
                        <div className="cls_ft_sociallinks">
                            <HCSocialLinks/> 
                        </div>
                    </div>
                    <hr className="line_FT"></hr>
                    <div className="cls_copy_FT">
                        <span className="text-heading-small_ft text-label_ft"><b>Copyright © 2025 HappyChild All Rights Reserved.</b></span>
                    </div>
                </div>
            <div className="footerEnd">
                <div className="footerEndCnt">
                    <div className="footerEndTerm">
                        <a href="/privacy-policy" className="text-heading-small_ft text-label_ft emailLink">
                            <b>Privacy Policy</b>
                        </a>
                        <a href="/terms-conditions" className="text-heading-small_ft text-label_ft emailLink">
                            <b>Terms of Use</b>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default HCFooter;