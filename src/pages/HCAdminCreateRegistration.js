import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/HCButton";
import ic_check from '../images/check.WebP';
import '../styles/HCPostAddEvent.css';
import ic_arrowup from '../images/arrowup.WebP';
import ic_arrowdown from '../images/arrowdown.WebP';
import HCSpinner from '../components/HCSpinner';
import HCRegistrationDetail from "../common/HCRegistrationDetail";
import { API_BASE } from "../utils/config";

const HCAdminCreateRegistration = () => {
    const [isFormVisible,setIsFormVisible] = useState(true);
    const [isSection1Open,setIsSection1Open] = useState(true);
    const [formData,setFormData] = useState({
        registration_Id__c: '',
        registration_Number__c: '',
        contact__c: '',
        event__c: '',
        status__c: '',
        attendance_Status__c: '',
        payment_Status__c: '',
        seat_Count__c: '',
        notes__c: '',
        consent__c: '',
        registered_On__c: '',
        waitlist_Position__c: ''
    });
    const [errors,setErrors] = useState({});
    const [formImgData,setFormImgData] = useState({ title: '', description: '', contentType: '', images: [] });
    const [isSuccessVisible,setIsSuccessVisible] = useState(false);
    const [isDataLoading,setIsDataLoading] = useState(false);

    const navigate = useNavigate();

    const handleRefresh = () => {
        setFormData({
            contact__c: '',
            event__c: '',
            status__c: '',
            attendance_Status__c: '',
            payment_Status__c: '',
            seat_Count__c: '',
            notes__c: '',
            consent__c: '',
            registered_On__c: '',
            waitlist_Position__c: ''
        });
        setErrors({});
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {
            contact__c,
            event__c,
            status__c,
            attendance_Status__c,
            payment_Status__c,
            seat_Count__c,
            notes__c,
            consent__c,
            registered_On__c,
            waitlist_Position__c
        } = formData;
        const newErrors = {
            event__c: !event__c ? 'Event is required.' : '',
            contact__c: !contact__c ? 'Contact is required.' : '',
            seat_Count__c: !seat_Count__c?.trim() ? 'seat count is required.' : '',
            status__c: !status__c?.trim() ? 'status is required' : '',
            consent__c: !consent__c ? 'consent is required.' : ''
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
        const form_data = { contact__c,event__c,status__c,attendance_Status__c,payment_Status__c,seat_Count__c,
            notes__c,consent__c,waitlist_Position__c };
        try{
            const resp = await fetch(`${API_BASE}/api/registration/`, {
                method: 'POST',
                body: JSON.stringify(form_data),
                headers: {
                    'content-type' : 'application/json'
                }
            });
            const jsonReg = await resp.json();
            if(!resp.ok){
                console.log('Error in creating registration.',jsonReg);
                setIsDataLoading(false);
            }
            if(resp.ok){
                console.log('registration created',jsonReg);
                handleRefresh();
                setIsDataLoading(false);
                setIsFormVisible(false);
                setIsSuccessVisible(true);
                setTimeout(() => {
                    setIsSuccessVisible(false);
                    setIsFormVisible(true);
                    navigate('/admin-registration');
                }, 2000);
            }
        }catch(error){
            console.log('Error in reg creation:'+JSON.stringify(error));
        }

    };
    const handleCancel = async (e) => {
        e.preventDefault();
        handleRefresh();
        handleOnCancel();
    }
    const handleOnCancel = () => {
        navigate('/admin-registration');
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
                            <div className="text-heading-medium text-center"><b>New Registration</b></div><br/>
                            <div id="input_form">
                                <form className="myFlex">
                                    <div className="cls_sec_header1_pae">
                                        <img src={isSection1Open ? ic_arrowdown : ic_arrowup} className="icon_cls_cnt_FT_pae" style={{cursor : 'pointer'}} onClick={() => setIsSection1Open(!isSection1Open)}></img>
                                        <span className="text-large text-label-white">Registration Details</span>
                                    </div>
                                    {isSection1Open && 
                                        <HCRegistrationDetail 
                                            formData={formData} 
                                            onFieldChange={handleFieldChange} 
                                            onArrayChange={handleArrayChange} 
                                            errors={errors} 
                                            mode="edit" 
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
                            <span className="text-large text-center">HC Registration created successfully.</span>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};
export default HCAdminCreateRegistration;