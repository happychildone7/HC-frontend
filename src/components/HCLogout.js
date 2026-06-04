import React from "react";
import { logoutUser } from "../auth/authApi";
import { useAuth } from "../auth/useAuth";
import { Link,Navigate, useNavigate } from "react-router-dom";

const HCLogout = ({ cls_lnk,cls_lbl }) => {
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        const resp = await logoutUser();
        setUser(null);
        navigate('/');
    };

    return(
        <Link to="/" className={cls_lnk} onClick={handleLogout}>
            <span className={cls_lbl}>Logout</span>
        </Link>
    );
};

export default HCLogout;
