import React, { useEffect, useState } from "react";
import '../styles/HCAdminViewEvent.css';
import '../styles/HCAdminCommon.css';
import Button from '../components/HCButton';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import HCContactDetail from '../common/HCContactDetail';
import HCSpinner from '../components/HCSpinner';
import ic_arrowup from '../images/arrowup.WebP';
import ic_arrowdown from '../images/arrowdown.WebP';
import { isEmailValid, isPhoneValid } from '../utils/validations.js';
import HCImageDetail from "../common/HCImageDetail.js";
import { toast } from 'react-toastify';

const HCAdminViewContact = () => {
    const { id } = useParams();
    const [isDataLoading,setIsDataLoading] = useState(false);
    const [showUpdateForm,setShowUpdateForm] = useState(false);
    const [isSection1Open,setIsSection1Open] = useState(true);
    const [isSection2Open,setIsSection2Open] = useState(true);
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
        const fetchRecord = async () => {
            try{
                const resp = await fetch(`/api/contact/${id}`, {
                    method: 'GET'
                });
                const json = await resp.json();
                if(!resp.ok){
                    console.log('Issue in fetching Contact record');
                    return;
                }
                console.log('Contact record'+JSON.stringify(json));
                const contact = json;
                const contactFormData = {
                    contact_Id__c: contact._id || '',
                    first_Name__c: contact.first_Name__c || '',
                    middle_Name__c: contact.middle_Name__c || '',
                    last_Name__c: contact.last_Name__c || '',
                    contact_Type__c: contact.contact_Type__c || '',
                    phone__c: contact.phone__c || '',
                    email__c: contact.email__c || '',
                    gender__c: contact.gender__c || '',
                    date_Of_Birth__c: contact.date_Of_Birth__c || 0,
                    active__c: contact.active__c || false
                };
                const fullImgData = {
                    title: contact.full_Name__c || '', 
                    description: '', 
                    contentType: 'Contact', 
                    images: contact.images
                };
                setFormData(contactFormData);
                setOriginalFormData({ ...contactFormData });

                setFormImgData(fullImgData);
                setOriginalFormImgData({ ...fullImgData });
            }catch(error){
                console.log('Error in fetching Contact record'+error);
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
    const handleEdit = () => {
        setShowUpdateForm(true);
    };
    const handleSave = async () => {
        const contactChanged = JSON.stringify(formData) !== JSON.stringify(originalFormData);
        const imgChanged = JSON.stringify(formImgData) !== JSON.stringify(originalFormImgData);
        if(!contactChanged && !imgChanged){
            toast('No changes to save');
            return;
        }
        const {
            contact_Id__c,
            first_Name__c,
            middle_Name__c,
            last_Name__c,
            contact_Type__c,
            phone__c,
            email__c,
            gender__c,
            date_Of_Birth__c,
            active__c
        } = formData;
        const {
            title, 
            description, 
            contentType, 
            images
        } = formImgData;
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
                            :'',
            contact_Type__c: !contact_Type__c.trim() ? 'contact type is required.' : ''
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
        const form_data = { contact_Id__c,first_Name__c,middle_Name__c,last_Name__c,contact_Type__c,
                            phone__c,email__c,gender__c,date_Of_Birth__c,active__c
                          };
        try{
            const conResp = await fetch(`/api/Contact/${contact_Id__c}`,{
                method: 'PATCH',
                body: JSON.stringify(form_data),
                headers: {
                    'content-type' : 'application/json'
                }
            });
            const conJson = await conResp.json();
            if(!conResp.ok){
                console.log('Error in updating Contact.',conJson);
                setIsDataLoading(false);
                throw new Error(conJson.error || 'Contact update failed');
            }
            console.log('Contact updated',conJson);
            if(imgChanged){
                await fetch('/api/content/deleteByRelated',{
                    method: 'POST',
                    body: JSON.stringify({
                        relatedToIds : [contact_Id__c]
                    }),
                    headers: {
                        'content-type' : 'application/json'
                    }
                });
                let related_Type__c = 'Contact';
                let related_To_Id__c = contact_Id__c;
                let type__c = 'Image';
                let title__c = (first_Name__c ? first_Name__c + ' ' : '') + (middle_Name__c ? middle_Name__c + ' ' : '') + last_Name__c;
                let related_To_Code__c = conJson.contact_Code__c;
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
                            const contentResp = await fetch('/api/content/',{
                                method: 'POST',
                                body: JSON.stringify(payload),
                                headers: {
                                    'content-type' : 'application/json'
                                }
                            });
                            const contentJson = await contentResp.json();
                            if(!contentResp.ok){
                                setIsDataLoading(false);
                                throw new Error(contentJson.error || 'Content creation failed.');
                            }
                        })
                    );
                }
            }
            toast.success('Contact updated successfully');
            setOriginalFormData({ ...formData });
            setShowUpdateForm(false);
            setIsDataLoading(false);
        }catch(error){
            console.log('Error while updating Contact record.',JSON.stringify(error));
        }
    };

    return(
        <div className="cls_header_adve">
            <div className="cls_crd_wrp_adve">
                {isDataLoading ? <div className="spinner_cnt"><HCSpinner /></div> :  
                    <div className="cls_crd_cnt_adve">
                        <div className="cls_crd_hdr_adve">
                            <div>
                                <h2>Contact Detail</h2>
                            </div>
                            {!showUpdateForm && 
                                <div className="cls_crd_hdr_btnwrp_adve">
                                    <Button myclass="cls_btn_primary_adm" onClick={() => setShowUpdateForm(true)}>
                                        Edit
                                    </Button>
                                    <Button myclass="cls_btn_primary_adm" onClick={() => navigate('/admin-Contact')}>
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
                            <span className="text-large text-label-white">Contact Details</span>
                        </div>
                        {isSection1Open && 
                            <HCContactDetail 
                                showStatus={true} 
                                formData={formData} 
                                mode={showUpdateForm ? 'edit' : 'view'} 
                                onFieldChange={handleFieldChange}
                                onArrayChange={handleArrayChange}
                                onEditClick={handleEdit} 
                                errors={errors}
                                adminView={true}
                            />
                        }
                        <div className="cls_sec_header_adve">
                            <img src={isSection2Open ? ic_arrowdown : ic_arrowup} className="icon_cls_cnt_FT" style={{cursor : 'pointer'}} onClick={() => setIsSection2Open(!isSection2Open)}></img>
                            <span className="text-large text-label-white">Contact Image Details</span>
                        </div>
                        {isSection2Open && 
                            <HCImageDetail
                                formData={formImgData}
                                images={formImgData.images || []}
                                mode={showUpdateForm ? 'edit' : 'view'}
                                maxFiles={4}
                                onUploadComplete={handleFileUploadComplete}
                                onEditClick={handleEdit}
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
export default HCAdminViewContact;