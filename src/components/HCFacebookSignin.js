import React, { useEffect } from "react";
import ic_fb from '../images/fbcolor.WebP';
import { loginWithFacebook } from '../auth/authApi.js';
import '../styles/HCFacebookSignin.css';

const HCFacebookSignin = ({ onFBLogin, cls_fblgn_sctn, label }) => {
    useEffect(() => {
        if (!document.getElementById("fb-root")) {
            // create div required for fb
            const fbDiv = document.createElement("div");
            fbDiv.id = "fb-root";
            document.body.appendChild(fbDiv);
            // Run any script after sdk is loaded
            window.fbAsyncInit = () => {
              //
            };
            // inject sdk.js
            (function(d, script) {
              script = d.createElement("script");
              script.type = "text/javascript";
              script.async = true;
              script.src =
                "https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v3.2&appId=" +
                process.env.REACT_APP_FB_APP_ID +
                "&autoLogAppEvents=1";
              d.getElementsByTagName("head")[0].appendChild(script);
            })(document);
          }
    },[]);

    const handleFBLoginAsync = async (response) => {
        try {
            const resp = await loginWithFacebook(response.authResponse.accessToken, response.authResponse.userID);
            const json = await resp.json();
            if (!resp.ok) {
                console.error("Facebook login failed:", json);
                return;
            }
            if (onFBLogin) onFBLogin(json);
            } catch (err) {
            console.error("Exception in Facebook login", err);
        }
    };

    const handleFBLogin = () => {
        window.FB.login((response) => {
          if (response.authResponse) {
            handleFBLoginAsync(response);
          } else {
            console.warn("Facebook login was cancelled or not authorized.");
          }
        }, { scope: "public_profile,email" });
    };

    return(
        <div onClick={handleFBLogin} className={cls_fblgn_sctn}>
            <img src={ic_fb} className="cls_gg_icn"></img>
            <span className="text-center">{label}</span>
        </div>
    );
};

export default HCFacebookSignin;