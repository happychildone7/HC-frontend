import React, { useEffect, useState } from "react";
import '../styles/HCAdminViewEvent.css';
import '../styles/HCAdminCommon.css';
import Button from '../components/HCButton';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import HCRegistrationDetail from '../common/HCRegistrationDetail';
import HCSpinner from '../components/HCSpinner';
import ic_arrowup from '../images/arrowup.WebP';
import ic_arrowdown from '../images/arrowdown.WebP';
import { toast } from 'react-toastify';

const HCAdminViewRegistration = () => {
    const { id } = useParams();
    const [isDataLoading,setIsDataLoading] = useState(false);
    const [showUpdateForm,setShowUpdateForm] = useState(false);
    const [isSection1Open,setIsSection1Open] = useState(true);
    const [originalFormData,setOriginalFormData] = useState(null);
    const [formData,setFormData] = useState({
            registration_Id__c: '',
            registration_Number__c: '',
            contact__c: '',
            contact_Name__c: '',
            event__c: '',
            event_Name__c: '',
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
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecord = async () => {
            try{
                const resp = await fetch(`/api/registration/${id}`, {
                    method: 'GET'
                });
                const json = await resp.json();
                if(!resp.ok){
                    console.log('Issue in fetching Registration record');
                    return;
                }
                console.log('Registration record'+JSON.stringify(json));
                const registration = json;
                const contact = registration.contact__c || {};
                const event = registration.event__c || {};
                const registrationFormData = {
                    registration_Id__c: registration._id || '',
                    registration_Number__c: registration.registration_Number__c || '',
                    contact__c: contact._id || '',
                    contact_Name__c: contact.full_Name__c || '',
                    event__c: event._id || '',
                    event_Name__c: event.Name__c || '',
                    status__c: registration.status__c || '',
                    attendance_Status__c: registration.attendance_Status__c || '',
                    payment_Status__c: registration.payment_Status__c || 0,
                    seat_Count__c: registration.seat_Count__c || '',
                    notes__c: registration.notes__c || '',
                    consent__c: registration.consent__c || false,
                    registered_On__c: registration.registered_On__c || '',
                    waitlist_Position__c: registration.waitlist_Position__c || ''
                };
                setFormData(registrationFormData);
                setOriginalFormData({ ...registrationFormData });
            }catch(error){
                console.log('Error in fetching Registration record'+error);
            }
        };
        if(id) fetchRecord();
    }, [id]);

    const handleFieldChange = (field,value) => {
        setFormData(prev => ({ ...prev,[field]: value }));
        setErrors(prev => ({ ...prev,[field]: '' }));
    };
    const handleArrayChange = (field,array) => {
        setFormData(prev => ({ ...prev,[field]: array }));
        setErrors(prev => ({ ...prev,[field]: '' }));
    };
    const handleEdit = () => {
        setShowUpdateForm(true);
    };
    const handleSave = async () => {
        const registrationChanged = JSON.stringify(formData) !== JSON.stringify(originalFormData);
        if(!registrationChanged){
            toast('No changes to save');
            return;
        }
        const {
            registration_Id__c,
            registration_Number__c,
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
            contact__c: !contact__c ? 'contact is required.' : '' ,
            event__c: !event__c ? 'event is required.' : ''
        };
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
        const form_data = { contact__c,event__c,status__c,
                            attendance_Status__c,payment_Status__c,seat_Count__c,notes__c,consent__c,
                            registered_On__c,waitlist_Position__c 
                          };
        try{
            const regResp = await fetch(`/api/registration/${registration_Id__c}`,{
                method: 'PATCH',
                body: JSON.stringify(form_data),
                headers: {
                    'content-type' : 'application/json'
                }
            });
            const regJson = await regResp.json();
            if(!regResp.ok){
                console.log('Error in updating registration.',regJson);
                setIsDataLoading(false);
                throw new Error(regJson.error || 'Registration update failed');
            }
            console.log('registration updated',regJson);
            toast.success('Registration updated successfully');
            setOriginalFormData({ ...formData });
            setShowUpdateForm(false);
            setIsDataLoading(false);
        }catch(error){
            console.log('Error while updating registration record.',JSON.stringify(error));
        }
    };

    return(
        <div className="cls_header_adve">
            <div className="cls_crd_wrp_adve">
                {isDataLoading ? <div className="spinner_cnt"><HCSpinner /></div> :  
                    <div className="cls_crd_cnt_adve">
                        <div className="cls_crd_hdr_adve">
                            <div>
                                <h2>Registration Detail</h2>
                            </div>
                            {!showUpdateForm && 
                                <div className="cls_crd_hdr_btnwrp_adve">
                                    <Button myclass="cls_btn_primary_adm" onClick={() => setShowUpdateForm(true)}>
                                        Edit
                                    </Button>
                                    <Button myclass="cls_btn_primary_adm" onClick={() => navigate('/admin-Registration')}>
                                        Back
                                    </Button>
                                </div>
                            }
                            {showUpdateForm && 
                                <div className="cls_crd_hdr_btnwrp_adve">
                                    <Button myclass="cls_btn_primary_adm" onClick={() => setShowUpdateForm(false)}>
                                        Cancel
                                    </Button>
                                    <Button myclass="cls_btn_primary_adm" onClick={() => handleSave()}>
                                        Save
                                    </Button>
                                </div>
                            }
                        </div>
                        <div className="cls_sec_header_adve">
                            <img src={isSection1Open ? ic_arrowdown : ic_arrowup} className="icon_cls_cnt_FT" style={{cursor : 'pointer'}} onClick={() => setIsSection1Open(!isSection1Open)}></img>
                            <span className="text-large text-label-white">Registration Details</span>
                        </div>
                        {isSection1Open && 
                            <HCRegistrationDetail 
                                showStatus={true} 
                                formData={formData} 
                                mode={showUpdateForm ? 'edit' : 'view'} 
                                onFieldChange={handleFieldChange}
                                onArrayChange={handleArrayChange}
                                onEditClick={handleEdit} 
                                errors={errors}
                            />
                        }
                        {/* Edit Mode buttons */}
                        {showUpdateForm && 
                            <>
                                <div className="cls_adm_rec_page_upd__foot">
                                    <Button myclass="buttonWhite cls_padding" onClick={(e) => {
                                            e.preventDefault();
                                            setShowUpdateForm(false);
                                            }}>Cancel
                                    </Button> 
                                    <Button myclass={"buttonBlue cls_padding"} onClick={(e) => {
                                        e.preventDefault();
                                        handleSave();
                                        }}>Save
                                    </Button>
                                </div>
                        </>
                        }
                    </div>
                }
            </div>
        </div>
    );
};
export default HCAdminViewRegistration;