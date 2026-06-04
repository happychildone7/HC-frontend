import React, { useState } from "react";
import HCSignIn from "../common/HCSignIn";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";
 
const HCLogin = () => {
    const [showModal,setShowModal] = useState(true);
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const handleUserLogin = (resp) => {
        console.log('here@@@@');
        setUser(resp.user);
        navigate('/');
    };

    return(
        <div>
            <HCSignIn showModal={showModal} onClose={() => setShowModal(false)} onLogin={null} onUserLogin={handleUserLogin} />
        </div>
    );
};

export default HCLogin;