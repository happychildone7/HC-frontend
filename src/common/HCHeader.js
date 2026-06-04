
import React, { useState,useEffect,useRef } from 'react';
import '../styles/HCHeader.css';
import LOGO from '../images/logo.WebP';
import Button from '../components/HCButton';
import Dropdown from '../components/HCDropdown.js';
import DropdownItem from '../components/HCDropdownItem.js';
import ic_signin from '../images/signin.WebP';
import HCSignIn from './HCSignIn';
import ic_avatar from '../images/avatar.WebP';
import SigninIcon from '../svgIcons/signinIcon';
import ProfileIcon from '../svgIcons/profileIcon';
import AppointmentIcon from '../svgIcons/appointmentIcon';
import BookmarkIcon from '../svgIcons/bookmarkIcon';
import HCLogout from '../components/HCLogout.js';
import { useAuth } from '../auth/useAuth.js';
import { useNavigate,Link } from "react-router-dom";
import AdminIcon from '../svgIcons/adminIcon.js';
import WishlistIcon from '../svgIcons/WishlistIcon.js';

const HCHeader = () => {
    const [navBar,setNavBar] = useState(false);
    const [showMobNav,setShowMobNav] = useState(false);
    const [admnPanVal,setAdmnPanVal] = useState(false);
    const [showModal,setShowModal] = useState(false);
    const { user,setUser } = useAuth();
    const navigate = useNavigate();
    
    let mob_menu_ref = useRef();
    let mob_menu_icon_ref = useRef();
    const changeNavBar = () => {
        if(window.scrollY>400){
            setNavBar(true);    
        }
        else{
            setNavBar(false);
        }
    };
    const handleLogin = (resp) => {
        setUser(resp.user);
        navigate('/');
    };

    useEffect(() => {
        let handler = (e) => {
            if(!mob_menu_ref.current.contains(e.target) && !mob_menu_icon_ref.current.contains(e.target)){
                setShowMobNav(false);
            }
        }
        document.addEventListener("mousedown",handler);
        return() =>  {
            document.removeEventListener("mousedown",handler);
        }
    });
    useEffect(() => {
        if (user) {
            console.log('User is now available', user);
        }
        setTimeout(() => {
            setShowModal(false);
        }, 2000);
    },[user]);

    window.addEventListener('scroll',changeNavBar);
    return(
        <div className="cls_nav_container">
            <div className={navBar?"navbar-active bg":"navbar-sticky bg"}>
                <div className="cls_center gap_2">
                    <img src={LOGO} className="logo" alt="logo"></img>
                    <span className="cls_txt_wtBold" styles="text-wrap-mode: nowrap;">Happy Child</span>
                </div>
                <nav className="nav_links">
                    <div className="cls_nav_link">
                        <Link to="/" className="myLink">
                            <b>Home</b>
                        </Link>
                    </div>
                    <div className="cls_nav_link">
                        <Link to="/school" className="myLink">
                            <b>Schools</b>
                        </Link>
                    </div>
                    <div className="cls_nav_link">
                        <Link to="/events" className="myLink">
                            <b>Events</b>
                        </Link>
                    </div>
                    <div className="cls_nav_link">
                        <Link to="/hms-facilities" className="myLink">
                            <b>Institutes</b>
                        </Link>
                    </div>
                    <div className="cls_nav_link">
                        <Link to="/hms-facilities" className="myLink">
                            <b>Tutors</b>
                        </Link>
                    </div>
                    {!user && 
                        <div className="">
                            <Button myclass="btn_signin" onClick={(e) => {
                                e.preventDefault();
                                setShowModal(true);
                            }}>
                                <span class="btn_icon">
                                    <img src={ic_signin} class="cls_icn"></img>
                                </span>
                                <span class="btn_text">Sign In</span>
                            </Button>
                            {showModal && 
                                <HCSignIn showModal={showModal} onClose={() => setShowModal(false)} onLogin={handleLogin} onUserLogin={null}/>
                            }
                        </div>
                    }
                    {user && 
                        <div className="cls_user_avatar_cnt">
                            <div className="user-dropdown">
                                <img src={ic_avatar} className="avatar" alt="User Avatar" />
                                <div className="dropdown-menu">
                                    <div className="cls_usr_menubar_link">
                                        <ProfileIcon size={18} color="#a5aab0" />
                                        <Link to="/profile-detail" className="">
                                            <span className="custom-combobox-label">My Profile</span>
                                        </Link>
                                    </div>
                                    {user?.role === 'FacilityAdmin' && 
                                        <div className="cls_usr_menubar_link">
                                            <AdminIcon size={35} color="#a5aab0" />
                                            <Link to="/admin-home" className="">
                                                <span className="custom-combobox-label">Admin Panel</span>
                                            </Link>
                                        </div>
                                    }
                                    <div className="cls_usr_menubar_link">
                                        <AppointmentIcon size={18} color="#a5aab0" />
                                        <Link to="/profile-detail?tab=bookings" className="">
                                            <span className="custom-combobox-label">My Bookings</span>
                                        </Link>
                                    </div>
                                    <div className="cls_usr_menubar_link">
                                        <WishlistIcon size={18} color="#a5aab0" />
                                        <Link to="/profile-detail?tab=wishlist" className="">
                                            <span className="custom-combobox-label">My Wishlist</span>
                                        </Link>
                                    </div>
                                    <div className="cls_usr_menubar_link">
                                        <SigninIcon size={18} color="#a5aab0" />
                                        <HCLogout cls_lnk="" cls_lbl="custom-combobox-label" />
                                    </div>
                                </div>
                            </div>
                            <span className="cls_txt_wtBold">Hi,&nbsp;{user?.email.split('@')[0]}</span>
                        </div>
                    }
                    {user?.role === 'Admin' && 
                        <Dropdown
                            buttonLabel=""
                            buttonText={admnPanVal?admnPanVal:"Admin Panel"}
                            isRequired="false"
                            customCls = "buttonBlue"
                            content={
                                <>
                                    <Link to="/hms-admin-location" className="myLink">
                                        <DropdownItem key="hms_location" customCls="my-dropdown-item" onClick={(event) => {
                                                setAdmnPanVal(event.target.textContent);
                                            }}>HC School
                                        </DropdownItem>
                                    </Link>
                                    <Link to="/hms-admin-content" className="myLink">
                                        <DropdownItem key="hms_content" customCls="my-dropdown-item" onClick={(event) => {
                                                setAdmnPanVal(event.target.textContent);
                                            }}>HC Tutor
                                        </DropdownItem>
                                    </Link>
                                    <Link to="/hms-admin-facility" className="myLink">
                                        <DropdownItem key="hms_location" customCls="my-dropdown-item" onClick={(event) => {
                                                setAdmnPanVal(event.target.textContent);
                                            }}>HC Event
                                        </DropdownItem>
                                    </Link>
                                    <Link to="/hms-admin-contact" className="myLink">
                                        <DropdownItem key="hms_contact" customCls="my-dropdown-item" onClick={(event) => {
                                                setAdmnPanVal(event.target.textContent);
                                            }}>HC Institute
                                        </DropdownItem>
                                    </Link>
                                    <Link to="/hms-admin-department" className="myLink">
                                        <DropdownItem key="hms_department" customCls="my-dropdown-item" onClick={(event) => {
                                                setAdmnPanVal(event.target.textContent);
                                            }}>HC Department
                                        </DropdownItem>
                                    </Link>
                                </>
                            }
                            hoverable={true}
                        />
                    }
                </nav>
                <Link className="cls_mobile_menu" ref={mob_menu_icon_ref} onClick={() => {
                    if(!showMobNav){
                        setShowMobNav(true);
                    }
                    else{
                        setShowMobNav(false);
                    }
                }}>
                    <span className={navBar?showMobNav?"change_cls_spn_blc1":"cls_spn_blc1":showMobNav?"change_cls_spn1":"cls_spn1"}></span>
                    <span className={navBar?showMobNav?"change_cls_spn_blc2":"cls_spn_blc2":showMobNav?"change_cls_spn2":"cls_spn2"}></span>
                    <span className={navBar?showMobNav?"change_cls_spn_blc3":"cls_spn_blc3":showMobNav?"change_cls_spn3":"cls_spn3"}></span>
                </Link>
            </div>
            <div className={showMobNav?"cls_mobile_menubar":"cls_mobile_menubar_closed"} ref={mob_menu_ref}>
                <div className="cls_mobile_menubar_parent">
                    <div className="cls_nav_link">
                        <Link to="/" className="myLink_mobile">
                            <b>Home</b>
                        </Link>
                    </div>
                    <div className="cls_nav_link">
                        <Link to="/salesforce-solutions" className="myLink_mobile">
                            <b>Solutions</b>
                        </Link>
                    </div>
                    <div className="cls_nav_link">
                        <Link to="/salesforce-services" className="myLink_mobile">
                            <b>Services</b>
                        </Link>
                    </div>
                    <div className="cls_nav_link">
                        <Link to="/about-us" className="myLink_mobile">
                            <b>About Us</b>
                        </Link>
                    </div>
                    <div className="cls_nav_link">
                        <Link to="#input_form" className="myLink_mobile" onClick={() => {
                            if(showMobNav){
                                setShowMobNav(false);
                            }
                        }}>
                            <b>Contact Us</b>
                        </Link>
                    </div>
                </div>
                {/* <div className="cls_mobile_socialLinks">
                        <SNDXSocialLinks/>
                </div> */}
            </div>
        </div>
    );
}
export default HCHeader;