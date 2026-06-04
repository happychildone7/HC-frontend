import React from "react";
import HCPosAddSchool from './HCPostAddSchool';
import { useNavigate } from "react-router-dom";

const HCAdminCreateSchool = () => {
    const navigate = useNavigate();
    const handleOnCancel = () => {
        navigate('/admin-school');
    };

    return(
        <div>
            <HCPosAddSchool onCancel={handleOnCancel} showStatus={true}/>
        </div>
    );
};
export default HCAdminCreateSchool;