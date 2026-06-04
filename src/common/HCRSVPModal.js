import React, { useState } from "react";
import HCModal from "../components/HCModal";
import '../styles/HCRSVPModal.css';
import Button from '../components/HCButton';
import { useAuth } from "../auth/useAuth";
import HCSpinner from "../components/HCSpinner";
import { toast } from "react-toastify";
const Initial_Form = {
        email: '',
        phone: '',
        seatCount: 1,
        specialRequirements: '',
        consent: false
    };

const HCRSVPModal = ({ showRSVPModal, onClose, event }) => { 
    const { user,contact } = useAuth();
    const [form,setForm] = useState({
                            ...Initial_Form,
                            email: user?.email || '',
                            phone: user?.phone || ''
                        });
    const [errors,setErrors] = useState({});
    const [showSpinner,setShowSpinner] = useState(false);
    const [isSuccessVisible,setIsSuccessVisible] = useState(false);

    const handleFieldChange = (field,value) => {
        setForm(prev => ({ ...prev,[field]: value }));
        setErrors(prev => ({ ...prev,[field]: '' }));
    };
    const handleCancel = () => {
        handleRefresh();
        onClose();
    };
    const handleRefresh = () => {
        setForm({
            email: '',
            phone: '',
            seatCount: '',
            specialRequirements: '',
            consent: false
        });
        setErrors({});
    }
    const isEmailValid = (email) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    };
    const isPhoneValid = (phone) => {
        const regex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
        return regex.test(phone);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {
            email,
            phone,
            seatCount,
            specialRequirements,
            consent
        } = form;
        const newErrors = {
            phone: !phone.trim() ? 'Phone is required.' : !isPhoneValid(phone) ? 'Invalid phone number.' : '',
            seatCount: !seatCount || seatCount===0 ? 'Minimum one seat is required for booking.' : '',
            consent: !consent ? 'Consent is required.' : ''
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
        setShowSpinner(true);
        if (!contact?._id) {
            toast.error('Unable to determine contact.');
            setShowSpinner(false);
            return;
        }
        const form_data = { 
            contact__c: contact._id,
            event__c: event._id,
            status__c: 'Draft',
            email__c: email,
            phone__c: phone,
            seat_Count__c: seatCount,
            notes__c: specialRequirements,
            consent__c: consent 
        };
        try{
            const resp = await fetch('/api/registration/', {
                method: 'POST',
                body: JSON.stringify(form_data),
                headers: {
                    'content-type' : 'application/json'
                }
            });
            const jsonReg = await resp.json();
            if(!resp.ok){
                console.log('Error in creating booking.',jsonReg);
                setShowSpinner(false);
                toast.error(`${jsonReg.error}`);
            }
            if(resp.ok){
                console.log('booking created',jsonReg);
                let registration__c = jsonReg._id;
                handleRefresh();
                setShowSpinner(false);
                toast.success(`${jsonReg.registration_Number__c} Registration created successfully.`);
                handleRefresh();
                onClose();
            }
        }catch(error){
            console.log('Error in Registration creation:'+JSON.stringify(error));
            setShowSpinner(false);
        }

    };

    return(
        <HCModal isOpen={showRSVPModal} title="New Registration" onClose={() => {handleRefresh();onClose()}} clsModalContent="cls_modal_content_rsvpmod">
            {showSpinner ? <div className="spinner_cnt"><HCSpinner /></div> : 
                <div className="cls_flx_column">
                    <div class="cls_cnt2_rsvpmod">
                        <div className="col-md-1 my-3 cls_flx_column">
                            <label>Seat Count</label>
                            <div className="seat-grid">
                                {[1,2,3,4,5,6,7,8,9,10].map((num) => (
                                    <button
                                        key={num}
                                        type="button"
                                        onClick={(e) => handleFieldChange('seatCount',num)}
                                        className={`seat-btn ${form.seatCount === num ? "active" : ""}`}
                                    >
                                    {num}
                                    </button>
                                ))}
                            </div>
                            {errors.seatCount && (
                                <div className="text-label-red text-small"><b>{errors.seatCount}</b></div>
                            )}
                        </div>
                    </div>
                    <div className="search-container_rsvpmod">
                        <div className="col-md-1 my-3 cls_flx_column">
                            <label>Phone</label>
                            <input 
                                className={user?.phone? "disabled-input" : "formInputBox" }
                                type="phone" 
                                placeholder="Enter phone number*"
                                onChange={(e) => handleFieldChange('phone',e.target.value)}
                                value={user?.phone || ''}
                                disabled={user?.phone}
                            />
                            {errors.phone && (
                                <div className="text-label-red text-small"><b>{errors.phone}</b></div>
                            )}
                        </div>
                        <div className="col-md-1 my-3 cls_flx_column">
                            <label>Email</label>
                            <input 
                                className={user?.email? "disabled-input" : "formInputBox" }
                                type="email"
                                placeholder="Enter email"
                                onChange={(e) => handleFieldChange('email',e.target.value)}
                                value={user?.email || ''}
                                disabled={user?.email}
                            />
                            {errors.email && (
                                <div className="text-label-red text-small"><b>{errors.email}</b></div>
                            )}
                        </div>
                        
                    </div>
                    <div class="cls_cnt2_rsvpmod">
                        <div className="col-md-1 my-3 cls_flx_column">
                            <label>Special Requirements</label>
                            <input 
                                className="formInputBox" 
                                type="textarea" 
                                rows={4}
                                placeholder="Dietary, accessibility, or other requirements"
                                onChange={(e) => handleFieldChange('specialRequirements',e.target.value)}
                                value={form.specialRequirements || ''}
                            />
                            {errors.specialRequirements && (
                                <div className="text-label-red text-small"><b>{errors.specialRequirements}</b></div>
                            )}
                        </div>
                        <div className="col-md-1 my-3">
                            <div className="cls_flx_row">
                                <input 
                                    type="checkbox" 
                                    onChange={(e) => handleFieldChange('consent',e.target.checked)}
                                    checked={form.consent || false}
                                />
                                <label htmlFor="consent">I agree to share my details for this event registration. *</label>
                            </div>
                            {errors.consent && (
                                <div className="text-label-red text-small"><b>{errors.consent}</b></div>
                            )}
                        </div>
                    </div>
                    <div className="cls_fullWidth_rsvpmod"></div>
                    <div className="cls_inpCard_foot">
                        <div className="clsSubmit">
                            <Button myclass="buttonWhite" onClick={handleCancel}>Cancel</Button>
                        </div>
                        <div className="clsSubmit">
                            <Button myclass="buttonBlue" onClick={handleSubmit}>Submit</Button>
                        </div>
                    </div>
                </div>
            }
        </HCModal>
    );
};

export default HCRSVPModal;


