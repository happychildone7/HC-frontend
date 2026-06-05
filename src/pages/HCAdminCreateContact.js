import React, { useState } from "react";
import Button from "../components/HCButton";
import ic_check from '../images/check.WebP';
import '../styles/HCPostAddEvent.css';
import ic_arrowup from '../images/arrowup.WebP';
import ic_arrowdown from '../images/arrowdown.WebP';
import HCSpinner from '../components/HCSpinner';
import { useNavigate } from "react-router-dom";
import HCContactDetail from "../common/HCContactDetail";
import HCLocationDetail from '../common/HCLocationDetail';
import HCImageDetail from "../common/HCImageDetail";
import { isEmailValid, isPhoneValid } from '../utils/validations.js';
import { API_BASE } from "../utils/config.js";

const HCAdminCreateContact = () => {
    const [isFormVisible,setIsFormVisible] = useState(true);
    const [isSection1Open,setIsSection1Open] = useState(true);
    const [isSection2Open,setIsSection2Open] = useState(true);
    const [isSection3Open,setIsSection3Open] = useState(true);
    const [formData,setFormData] = useState({
        first_Name__c: '',
        middle_Name__c: '',
        last_Name__c: '',
        contact_Type__c: '',
        phone__c: '',
        email__c: '',
        gender__c: '',
        date_Of_Birth__: '',
        active__c: false
    });
    const [errors,setErrors] = useState({});
    const [formImgData,setFormImgData] = useState({ title: '', description: '', contentType: '', images: [] });
    const [isSuccessVisible,setIsSuccessVisible] = useState(false);
    const [isDataLoading,setIsDataLoading] = useState(false);

    const navigate = useNavigate();

    const handleRefresh = () => {
        setFormImgData({ title: '', description: '', contentType: '', images: [] });
        setFormData({
            first_Name__c: '',
            middle_Name__c: '',
            last_Name__c: '',
            contact_Type__c: '',
            phone__c: '',
            email__c: '',
            gender__c: '',
            date_Of_Birth__: '',
            active__c: false
        });
        setErrors({});
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {
            first_Name__c,
            middle_Name__c,
            last_Name__c,
            contact_Type__c,
            phone__c,
            email__c,
            gender__c,
            date_Of_Birth__,
            active__c
        } = formData;
        const newErrors = {
            last_Name__c: !last_Name__c.trim() ? 'last name is required.' : '' ,
            email__c: email__c.trim() ? !isEmailValid(email__c) 
                            ? 'Invalid email.' 
                            : ''
                            :'Email is required.',
            phone__c: phone__c.trim() 
                            ? !isPhoneValid(phone__c) 
                            ? 'Invalid phone number.' 
                            : ''
                            :'Phone is required.',
            contact_Type__c: !contact_Type__c.trim() ? 'contact type is required.' : ''
        }
        setErrors(newErrors);
        const hasErrors = Object.values(newErrors).some(error => error);

        if (hasErrors) {

            // wait for error messages to render
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
        setIsDataLoading(true);
        const form_data = { first_Name__c,middle_Name__c,last_Name__c,contact_Type__c,phone__c,email__c,
                            gender__c,date_Of_Birth__,active__c 
                        };
        try{
            const resp = await fetch(`${API_BASE}/api/contact/`, {
                method: 'POST',
                body: JSON.stringify(form_data),
                headers: {
                    'content-type' : 'application/json'
                }
            });
            const jsonCon = await resp.json();
            if(!resp.ok){
                console.log('Error in creating contact.',jsonCon);
                setIsDataLoading(false);
            }
            if(resp.ok){
                console.log('contact created',jsonCon);
                let related_Type__c = 'Contact';
                let related_To_Id__c = jsonCon._id;
                let type__c = 'Image';
                let title__c = jsonCon.full_Name__c;
                let related_To_Code__c = jsonCon.contact_Code__c;
                if(formImgData?.images.length){
                    const contentPayloads = formImgData.images.map((img) => ({
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
                            console.log('Form data content>'+JSON.stringify(payload));
                            const resp = await fetch(`${API_BASE}/api/content/`, {
                                method: 'POST',
                                body: JSON.stringify(payload),
                                headers: {
                                    'content-type' : 'application/json'
                                }
                            });
                            const jsonContent = await resp.json();
                            if(!resp.ok){
                                throw new Error(jsonContent.error || 'Content creation failed.');
                            }
                        })
                    );
                }
                handleRefresh();
                setIsDataLoading(false);
                setIsFormVisible(false);
                setIsSuccessVisible(true);
                setTimeout(() => {
                    setIsSuccessVisible(false);
                    setIsFormVisible(true);
                    navigate('/admin-contact');
                }, 2000);
            }
        }catch(error){
            console.log('Error in contact creation:'+JSON.stringify(error));
        }

    };
    const handleCancel = async (e) => {
        e.preventDefault();
        handleRefresh();
        if(formImgData?.images.length > 0){
            await fetch(`${API_BASE}api/fileUpload/cleanUp`, {
                method: 'POST',
                headers: {
                    'content-type' : 'application/json'
                },
                body: JSON.stringify({ publicIds : formImgData.images.map(img => img.publicId) })
            });
        }
        navigate('/admin-contact');
    }
    const handleFileUploadComplete = (uploadedImages) => {
        console.log('IMMGG>');
        setFormImgData({
            ...formImgData,
            images: uploadedImages.map(img => ({
                url: img.url,
                publicId: img.id,
                primary: img.primary
            }))
        });
    };
    const handleFieldChange = (field,value) => {
        setFormData(prev => ({ ...prev,[field]: value }));
        setErrors(prev => ({ ...prev,[field]: '' }));
    };
    const handleArrayChange = (field,array) => {
        setFormData(prev => ({ ...prev,[field]: array }));
        setErrors(prev => ({ ...prev,[field]: '' }));
    };

    return(
        <div className="cls_wrap">
            <div className="cls_crd_cnt_pa_pae">
                <div className="footerContColm_ft_wt_AD_pae footerContColm_pae">
                    {isDataLoading ? <div className="spinner_cnt"><HCSpinner /></div> :  isFormVisible && 
                        <div>
                            <div className="text-heading-medium text-center"><b>New Contact</b></div><br/>
                            <div id="input_form">
                                <form className="myFlex">
                                    <div className="cls_sec_header1_pae">
                                        <img src={isSection1Open ? ic_arrowdown : ic_arrowup} className="icon_cls_cnt_FT_pae" style={{cursor : 'pointer'}} onClick={() => setIsSection1Open(!isSection1Open)}></img>
                                        <span className="text-large text-label-white">Contact Details</span>
                                    </div>
                                    {isSection1Open && 
                                        <HCContactDetail 
                                            formData={formData} 
                                            onFieldChange={handleFieldChange} 
                                            onArrayChange={handleArrayChange} 
                                            errors={errors} 
                                            mode="edit" 
                                        />
                                    }
                                    {/* <div className="cls_sec_header1_pae">
                                        <img src={isSection2Open ? ic_arrowdown : ic_arrowup} className="icon_cls_cnt_FT_pae" style={{cursor : 'pointer'}} onClick={() => setIsSection2Open(!isSection2Open)}></img>
                                        <span className="text-large text-label-white">Event Address Details</span>
                                    </div>
                                    {isSection2Open && 
                                        <HCLocationDetail 
                                            formData={formData} 
                                            showStatus={showStatus}
                                            onFieldChange={handleFieldChange} 
                                            onArrayChange={handleArrayChange} 
                                            errors={errors} 
                                            mode="edit" 
                                        />
                                    } */}
                                    <div className="cls_sec_header1_pae">
                                        <img src={isSection3Open ? ic_arrowdown : ic_arrowup} className="icon_cls_cnt_FT_pae" style={{cursor : 'pointer'}} onClick={() => setIsSection3Open(!isSection3Open)}></img>
                                        <span className="text-large text-label-white">Add Contact Images</span>
                                    </div>
                                    {isSection3Open && 
                                        <HCImageDetail 
                                            mode="edit" 
                                            onUploadComplete={handleFileUploadComplete} 
                                            maxFiles={4} 
                                            label="Contact Images"
                                        />
                                    }
                                    <div className="cls_inpCard_foot_pae">
                                        <div className="clsSubmit">
                                            <Button myclass="buttonWhite" onClick={handleCancel}>Cancel</Button>
                                        </div>
                                        <div className="clsSubmit">
                                            <Button myclass="buttonBlue" onClick={handleSubmit}>Submit</Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    }
                    {isSuccessVisible && 
                        <div className="success_cnt_pae">
                            <img src={ic_check} className="success_img_pae"></img>
                            <span className="text-large text-center">HC Contact created successfully.</span>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};
export default HCAdminCreateContact;