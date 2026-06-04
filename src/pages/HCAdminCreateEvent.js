import React from "react";
import HCPostAddEvent from './HCPostAddEvent';
import { useNavigate } from "react-router-dom";

const HCAdminCreateEvent = () => {
    const navigate = useNavigate();
    const handleOnCancel = () => {
        navigate('/admin-event');
    };

    return(
        <div>
            <HCPostAddEvent onCancel={handleOnCancel} showStatus={true}/>
        </div>
    );
};
export default HCAdminCreateEvent;