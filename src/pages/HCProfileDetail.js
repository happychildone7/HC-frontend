import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ic_coverDefault from '../images/coverDefault.WebP';
import ic_avatar from '../images/avatar.WebP';
import { useAuth } from "../auth/useAuth";
import ProfileIcon from "../svgIcons/profileIcon";
import ic_edit from '../images/edit.WebP';
import "../styles/HCProfileDetail.css";
import '../styles/HCAdminCommon.css';
import HCButton from "../components/HCButton";
import SigninIcon from "../svgIcons/signinIcon";
import { logoutUser } from "../auth/authApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import AppointmentIcon from "../svgIcons/appointmentIcon";
import WishlistIcon from "../svgIcons/WishlistIcon";
import HCModal from "../components/HCModal";
import HCFileUpload from "../components/HCFileUpload";
import HCContactDetail from "../common/HCContactDetail";
import { toast } from 'react-toastify';
import { isEmailValid, isPhoneValid } from '../utils/validations.js';
import { API_BASE } from "../utils/config.js";

const HCProfileDetail = () => {
    const [contact,setContact] = useState(null);
    const [loading,setLoading] = useState(false);
    const {user,setUser} = useAuth();
    const [fileUploadModal,setFileUploadModal] = useState(false);
    const [showStickyHeader, setShowStickyHeader] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [showUpdateForm,setShowUpdateForm] = useState(false);
    const initialTab = searchParams.get("tab") || "profile";
    const [activeSection,setActiveSection] = useState(initialTab);
    const [fileUploadTitle,setFileUploadTitle] = useState("Upload Photo");
    const [photoSaving,setPhotoSaving] = useState(false);
    const [savePhotoTrigger,setSavePhotoTrigger] = useState(false);
    const [originalFormData,setOriginalFormData] = useState(null);
    const [originalFormImgData,setOriginalFormImgData] = useState({ title: '', description: '', contentType: '', images: [] });
    const [formData,setFormData] = useState({
                contact_Id__c: '',
                first_Name__c: '',
                middle_Name__c: '',
                last_Name__c: '',
                contact_Type__c: '',
                phone__c: '',
                email__c: '',
                gender__c: '',
                date_Of_Birth__c: '',
                active__c: false
            });
    const [formImgData,setFormImgData] = useState({
            title: '', 
            description: '', 
            contentType: '', 
            images: []
        });
    const [errors,setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContactDetails = async () => {
            try {
                setLoading(true);

                const resp = await fetch(`${API_BASE}/api/contact/${user.contactId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const conJson = await resp.json();
                console.log('ff>',conJson);
                if (!resp.ok) {
                    console.log('Error in fetching contact details.',conJson);
                    setLoading(false);
                }
                setContact(conJson);
                const contactFormData = {
                    contact_Id__c: conJson._id || '',
                    first_Name__c: conJson.first_Name__c || '',
                    middle_Name__c: conJson.middle_Name__c || '',
                    last_Name__c: conJson.last_Name__c || '',
                    contact_Type__c: conJson.contact_Type__c || '',
                    phone__c: conJson.phone__c || '',
                    email__c: conJson.email__c || '',
                    gender__c: conJson.gender__c || '',
                    date_Of_Birth__c: conJson.date_Of_Birth__c || 0,
                    active__c: conJson.active__c || false
                };
                const fullImgData = {
                    title: conJson.full_Name__c || '', 
                    description: '', 
                    contentType: 'Contact', 
                    images: conJson.images
                };
                setFormData(contactFormData);
                setOriginalFormData({ ...contactFormData });

                setFormImgData(fullImgData);
                setOriginalFormImgData({ ...fullImgData });
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        if(user && user.contactId){
            fetchContactDetails();
        }
    }, []);
    useEffect(() => {
        const tab = searchParams.get("tab") || "profile";
        setActiveSection(tab);

    },[searchParams]);
    useEffect(() => {
        if(!savePhotoTrigger) return;
        handleSavePhoto();
        setSavePhotoTrigger(false);
    }, [formImgData]);

    const handleScroll = () => {
        const profileSection = document.querySelector(".cls_dtl_sct1_prof");
        if (!profileSection) return;
        const triggerPoint = profileSection.offsetTop + 150 ;
        setShowStickyHeader(window.scrollY > triggerPoint);
    };
    window.addEventListener("scroll", handleScroll);

    const handleEdit = () => {
        setShowUpdateForm(true);
    }
    const handleLogout = async () => {
        const resp = await logoutUser();
        setUser(null);
        navigate('/');
    };
    const handleSectionChange = (section) => {
        setActiveSection(section);
        setShowUpdateForm(false);
        setSearchParams({
            tab: section
        });
    };
    const handleCloseFileModal = () => {
        setFileUploadModal(false);
    };
    const handleFileUploadComplete = async(uploadedImages) => {
        console.log('IMMGG>');
        setFormImgData(prev => ({
            ...prev,
            images: uploadedImages.map(img => ({
                url: img.url,
                publicId: img.id,
                primary: img.primary
            }))
        }));
        setSavePhotoTrigger(true);
    };
    const handleSavePhoto = async() => {
        if(JSON.stringify(formImgData) === JSON.stringify(originalFormImgData)){
            setFileUploadModal(false);
            return;
        }
        try{
            setPhotoSaving(true);
            await fetch(`${API_BASE}/api/content/deleteByRelated`,{
                method: 'POST',
                body: JSON.stringify({
                    relatedToIds : [contact._id]
                }),
                headers: {
                    'content-type' : 'application/json'
                }
            });
            let related_Type__c = 'Contact';
            let related_To_Id__c = contact._id;
            let type__c = 'Image';
            let title__c = contact.full_Name__c;
            let related_To_Code__c = contact.contact_Code__c;
            if(formImgData?.images.length){
                const contentPayloads = formImgData.images.map(img => ({
                    related_Type__c,
                    related_To_Id__c,
                    type__c,
                    primaryImage: img.primary,
                    title__c,
                    image_URL__c: img.url,
                    public_Id__c: img.publicId,
                    related_To_Code__c
                }));
                await Promise.all(
                    contentPayloads.map(async (payload) => {
                        const contentResp = await fetch(`${API_BASE}/api/content/`,{
                            method: 'POST',
                            body: JSON.stringify(payload),
                            headers: {
                                'content-type' : 'application/json'
                            }
                        });
                    })
                );
            }
            setContact(prev => ({
                ...prev,
                images: formImgData.images
            }));
            setOriginalFormImgData({
                ...formImgData
            });
            setFileUploadModal(false);
        }catch (err){
            console.error(err);
        }finally{
            setPhotoSaving(false);
        }
    }
    const handleSave = async () => {
        const contactChanged = JSON.stringify(formData) !== JSON.stringify(originalFormData);
         if(!contactChanged){
            toast('No changes to save');
            return;
        }
        const {
            contact_Id__c,
            first_Name__c,
            middle_Name__c,
            last_Name__c,
            phone__c,
            email__c,
            gender__c,
            date_Of_Birth__c
        } = formData;
        const newErrors = {
            last_Name__c: !last_Name__c.trim() ? 'last name is required.' : '' ,
            email__c: email__c.trim() ? !isEmailValid(email__c) 
                            ? 'Invalid email.' 
                            : ''
                            :'',
            phone__c: phone__c.trim() 
                            ? !isPhoneValid(phone__c) 
                            ? 'Invalid phone number.' 
                            : ''
                            :''
        };
        setErrors(newErrors);
        const hasErrors = Object.values(newErrors).some(error => error);

        if (hasErrors) {
            setTimeout(() => {
                const firstErrorField = document.querySelector(
                    '.text-label-red'
                );

                if (firstErrorField) {
                    firstErrorField.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }, 100);

            return;
        }
        setLoading(true);
        const form_data = { contact_Id__c,first_Name__c,middle_Name__c,last_Name__c,
                                    phone__c,email__c,gender__c,date_Of_Birth__c
                                  };
        try{
            const conResp = await fetch(`${API_BASE}/api/Contact/${contact_Id__c}`,{
                method: 'PATCH',
                body: JSON.stringify(form_data),
                headers: {
                    'content-type' : 'application/json'
                }
            });
            const conJson = await conResp.json();
            if(!conResp.ok){
                console.log('Error in updating Contact.',conJson);
                setLoading(false);
                throw new Error(conJson.error || 'Contact update failed');
            }
            console.log('Contact updated',conJson);
            toast.success('Contact updated successfully');
            setOriginalFormData({ ...formData });
            setShowUpdateForm(false);
            setLoading(false);
        }catch(error){
            console.log('Error while updating Contact record.',JSON.stringify(error));
        }
    }
    const handleShowCropper = () => {
        setFileUploadTitle("Adjust Photo");
    };
    const handleFieldChange = (field,value) => {
        setFormData(prev => ({ ...prev,[field]: value }));
        setErrors(prev => ({ ...prev,[field]: '' }));
    };
    const handleArrayChange = (field,array) => {
        setFormData(prev => ({ ...prev,[field]: array }));
        setErrors(prev => ({ ...prev,[field]: '' }));
    };
    const renderSection = () => {
        switch(activeSection){
            case "wishlist":
                return (
                    <div className="cls_dtl_sct2_prof">

                        <h2>My Wishlist</h2>

                        <p>
                            Wishlist content here
                        </p>

                    </div>
                );
            case "bookings":
                return(
                    <div className="cls_dtl_sct2_prof">

                        <h2>My Bookings</h2>

                        <p>
                            Booking content here
                        </p>

                    </div>
                );
            default:
                return(
                    <div className="cls_dtl_sct2_prof">
                        <HCContactDetail
                            showStatus={true} 
                            formData={formData} 
                            mode={showUpdateForm ? 'edit' : 'view'} 
                            onFieldChange={handleFieldChange}
                            onArrayChange={handleArrayChange}
                            onEditClick={handleEdit} 
                            errors={errors}
                        />
                    </div>
                );
        }
    };

    return (
        <div className="cls_cnt_scdt">
            {/* HERO */}
            <div className="cls_bg_prof" style={{
                backgroundImage: `url(${ic_coverDefault})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}>
                <div className="cls_text_smallwhite_scdt"><b><Link to = "/" className="emailLinkWhite">Home</Link> » <Link to = "/profile-detail" className="emailLinkWhite">{contact?.full_Name__c}</Link> </b></div>
                <div className="cls_avatar_wrap_prof">
                    <img
                        src={contact?.images?.[0]?.url || ic_avatar}
                        className="avatar_prof"
                        alt="User Avatar"
                    />
                    <label className="cls_avatar_overlay_prof">
                        <span className="cls_avatar_upload_icon_prof" onClick={() => setFileUploadModal(true)}>
                            📷
                        </span>
                    </label>
                </div>
            </div>
            {/* MAIN SECTION */}
            <div className="cls_dtl_scn_prof">
                {showStickyHeader && (
                        <div className="cls_floating_prof_header" style={{
                        backgroundImage: `url(${ic_coverDefault})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        overflow: "hidden"
                    }}></div>
                )}
                <div className="cls_flx_row">
                    {/* SIDEBAR */}
                    <div className="event-sidebar_prof">
                        <span>My Account</span>
                        <div className="cls_sidebar_childcnt1_prof">
                            <div className={`cls_sidbr_item_wrap_prof ${activeSection === 'profile' ? "active" : ""}`}
                                onClick={() => handleSectionChange("profile")}
                            >
                                <ProfileIcon size={18} color="#a5aab0" />
                                My Profile
                            </div>
                        </div>
                        <div className="cls_sidebar_childcnt1_prof">
                            <div className={`cls_sidbr_item_wrap_prof ${activeSection === 'bookings' ? "active" : ""}`}
                                onClick={() => handleSectionChange("bookings")}
                            >
                                <AppointmentIcon size={18} color="#a5aab0" />
                                My Bookings
                            </div>
                        </div>
                        <div className="cls_sidebar_childcnt1_prof">
                            <div className={`cls_sidbr_item_wrap_prof ${activeSection === 'wishlist' ? "active" : ""}`}
                                onClick={() => handleSectionChange("wishlist")}
                            >
                                <WishlistIcon size={18} color="#a5aab0" />
                                My Wishlist
                            </div>
                        </div>
                        <div className="cls_sidebar_childcnt1_prof">
                            <div className="cls_sidbr_item_wrap_prof">
                                <SigninIcon size={18} color="#a5aab0" />
                                <span onClick={handleLogout}>Logout</span>
                            </div>
                        </div>
                    </div>
                    {/* RIGHT SECTION */}
                    <div className="cls_detailcnt_prof">
                       <div className="cls_dtl_sct1_prof">
                            <div className="text-med cls_font_700">
                                {
                                    activeSection === "profile" ? "My Profile" 
                                        : activeSection === "bookings" ? "My Bookings"
                                            : "My Wishlist"
                                }
                            </div>
                            {activeSection === "profile" && !showUpdateForm &&
                                <div className="cls_crd_hdr_btnwrp_adve">
                                    <HCButton myclass="cls_btn_primary_adm" onClick={() => setShowUpdateForm(true)}>
                                        Edit
                                    </HCButton>
                                </div>
                            }
                            {activeSection === "profile" && showUpdateForm && 
                                <div className="cls_crd_hdr_btnwrp_adve">
                                    <HCButton myclass="cls_btn_primary_adm" onClick={() => setShowUpdateForm(false)}>
                                        Cancel
                                    </HCButton>
                                    <HCButton myclass="cls_btn_primary_adm" onClick={() => handleSave()}>
                                        Save
                                    </HCButton>
                                </div>
                            }
                        </div>
                        {renderSection()}
                    </div>
                </div>
            </div>
            {fileUploadModal && 
                <HCModal isOpen={fileUploadModal} title={fileUploadTitle} onClose={handleCloseFileModal} clsModalContent="cls_modal_content_prof cls_modal_content_prof_wide">
                    <HCFileUpload 
                        maxFiles={1} 
                        cls_upload_cnt="cls_upload_cnt_prof" 
                        onUploadComplete={handleFileUploadComplete} 
                        profileMode={true} 
                        onShowCropper={handleShowCropper} 
                        saving={photoSaving}
                    />
                </HCModal>
            }
        </div>
    );
};
export default HCProfileDetail;