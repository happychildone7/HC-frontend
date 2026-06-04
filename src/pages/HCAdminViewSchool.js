import React, { useEffect, useState } from "react";
import '../styles/HCAdminViewSchool.css';
import '../styles/HCAdminCommon.css';
import Button from '../components/HCButton';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import HCSchoolDetail from '../common/HCSchoolDetail';
import HCLocationDetail from '../common/HCLocationDetail';
import HCSpinner from '../components/HCSpinner';
import ic_arrowup from '../images/arrowup.WebP';
import ic_arrowdown from '../images/arrowdown.WebP';
import HCImageDetail from "../common/HCImageDetail";
import ic_check from '../images/check.WebP';
import { toast } from 'react-toastify';

const HCAdminViewSchool = () => {
    const { id } = useParams();
    const [isDataLoading,setIsDataLoading] = useState(false);
    const [showUpdateForm,setShowUpdateForm] = useState(false);
    const [isSection1Open,setIsSection1Open] = useState(true);
    const [isSection2Open,setIsSection2Open] = useState(true);
    const [isSection3Open,setIsSection3Open] = useState(true);
    const [originalFormData,setOriginalFormData] = useState(null);
    const [originalFormImgData,setOriginalFormImgData] = useState({ title: '', description: '', contentType: '', images: [] });
    const [formData,setFormData] = useState({
            school_Id__c: '',
            school_Name__c: '',
            board__c: '',
            ownership_Type__c: '',
            type__c: '',
            fee_Monthly_Min__c: '',
            co_Ed_Status__c: '',
            medium_Instruction__c: '',
            classes__c: [],
            facilities__c: [],
            admission_Status__c: '',
            approval_Status__c: '',
            description__c: '',
            age_Criteria_Min__c: '',
            age_Criteria_Max__c: '',
            // location
            location__Id__c: '',
            line1__c: '',
            line2__c: '',
            country__c: '',
            state__c: '',
            city__c: '',
            pin__c: '',
            location_Type__c: '',
            coordinates__c: null
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
                const resp = await fetch(`/api/school/${id}`, {
                    method: 'GET'
                });
                const json = await resp.json();
                if(!resp.ok){
                    console.log('Issue in fetching school record');
                    return;
                }
                console.log('school record'+JSON.stringify(json));
                const school = json;
                const loc = school.location__c || {};
                const schoolLocFormData = {
                    school_Id__c: school._id || '',
                    school_Name__c: school.Name__c || '',
                    board__c: school.board__c || '',
                    ownership_Type__c: school.ownership_Type__c || '',
                    type__c: school.type__c || '',
                    fee_Monthly_Min__c: school.fee_Monthly_Min__c || '',
                    co_Ed_Status__c: school.co_Ed_Status__c || '',
                    medium_Instruction__c: school.medium_Instruction__c || '',
                    classes__c: school.classes__c || [],
                    facilities__c: school.facilities__c || [],
                    admission_Status__c: school.admission_Status__c || '',
                    approval_Status__c: school.approval_Status__c || '',
                    description__c: school.description__c || '',
                    age_Criteria_Min__c: school.age_Criteria_Min__c || '',
                    age_Criteria_Max__c: school.age_Criteria_Max__c || '',
                    // location
                    location__Id__c: loc._id || '',
                    line1__c: loc.line1__c || '',
                    line2__c: loc.line2__c || '',
                    country__c: loc.country__c || '',
                    state__c: loc.state__c || '',
                    city__c: loc.city__c || '',
                    pin__c: loc.pin__c || '',
                    location_Type__c: loc.location_Type__c || '',
                    coordinates__c: loc.coordinates__c || null
                };
                const fullImgData = {
                    title: school.Name__c || '', 
                    description: '', 
                    contentType: 'School', 
                    images: school.images
                };
                setFormData(schoolLocFormData);
                setOriginalFormData({ ...schoolLocFormData });

                setFormImgData(fullImgData);
                setOriginalFormImgData({ ...fullImgData });
            }catch(error){
                console.log('Error in fetching school record'+error);
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
        const schoolOrlocChanged = JSON.stringify(formData) !== JSON.stringify(originalFormData);
        const imgChanged = JSON.stringify(formImgData) !== JSON.stringify(originalFormImgData);
        if(!schoolOrlocChanged && !imgChanged){
            toast('No changes to save');
            return;
        }
        const {
            school_Id__c,
            school_Name__c,
            board__c,
            ownership_Type__c,
            type__c,
            fee_Monthly_Min__c,
            co_Ed_Status__c,
            medium_Instruction__c,
            classes__c,
            facilities__c,
            admission_Status__c,
            approval_Status__c,
            description__c,
            age_Criteria_Min__c,
            age_Criteria_Max__c,
            location__Id__c,
            line1__c,
            line2__c,
            country__c,
            state__c,
            city__c,
            pin__c,
            location_Type__c,
            coordinates__c
        } = formData;
        const {
            title, 
            description, 
            contentType, 
            images
        } = formImgData;
        const newErrors = {
            school_Name__c: !school_Name__c?.trim() ? 'School name is required.' : '',
            board__c: !board__c?.trim() ? 'Board is required.' : '',
            ownership_Type__c: !ownership_Type__c?.trim() ? 'Ownership type is required.' : '',
            type__c: !type__c?.trim() ? 'Mode of schooling is required.' : '',
            fee_Monthly_Min__c: !fee_Monthly_Min__c ? 'Min monthly fees is required.' : '',
            co_Ed_Status__c: !co_Ed_Status__c?.trim() ? 'Co-Ed Status is required.' : '',
            medium_Instruction__c: !medium_Instruction__c?.trim() ? 'Medium of instruction is required.' : '',
            classes__c: !classes__c || classes__c.length === 0 ? 'At least one class is required.' : '',
            facilities__c: !facilities__c || facilities__c.length === 0 ? 'At least one facility is required.' : '',
            admission_Status__c: !admission_Status__c?.trim() ? 'Admission status is requried.' : '',
            line1__c: !line1__c?.trim() ? 'Address line1 is required.' : '',
            country__c: !country__c?.trim() ? 'Country is required.' : '',
            state__c: !state__c?.trim() ? 'State is required.' : '',
            city__c: !city__c?.trim() ? 'City is required.' : '',
            pin__c: !pin__c?.trim() ? 'Pin is requied.' : '',
            location_Type__c: !location_Type__c?.trim() ? 'Location type is required.' : '',
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
        const form_data_location = { line1__c,line2__c,location_Type__c,city__c,state__c,country__c,pin__c,coordinates__c };
        try{
            let method = location__Id__c ? 'PATCH' : 'POST';
            let url = location__Id__c ? `/api/location/${location__Id__c}` : '/api/location';
            const locResp = await fetch(url,{
                method: method,
                body: JSON.stringify(form_data_location),
                headers: {
                    'content-type' : 'application/json'
                }
            });
            const locJson = await locResp.json();
            if(!locResp.ok){
                console.log('Error in updating location.',locJson);
                setIsDataLoading(false);
                throw new Error(locJson.error || 'Location update failed');
            }
            console.log('location updated',locJson);
            const location__c = locJson._id;
            const Name__c = school_Name__c;
            const form_data_school = { Name__c,description__c,location__c,board__c,ownership_Type__c,type__c,fee_Monthly_Min__c,co_Ed_Status__c,
                            medium_Instruction__c,classes__c,age_Criteria_Min__c,age_Criteria_Max__c,facilities__c,
                            admission_Status__c };
            const schoolResp = await fetch(`/api/school/${school_Id__c}`,{
                method: 'PATCH',
                body: JSON.stringify(form_data_school),
                headers: {
                    'content-type' : 'application/json'
                }
            });
            const schoolJson = await schoolResp.json();
            if(!schoolResp.ok){
                console.log('Error in updating school.',schoolJson);
                setIsDataLoading(false);
                throw new Error(schoolJson.error || 'School update failed');
            }
            console.log('School udpated',schoolJson);
            if(imgChanged){
                await fetch('/api/content/deleteByRelated',{
                    method: 'POST',
                    body: JSON.stringify({
                        relatedToIds : [school_Id__c]
                    }),
                    headers: {
                        'content-type' : 'application/json'
                    }
                });
                let related_Type__c = 'School';
                let related_To_Id__c = school_Id__c;
                let type__c = 'Image';
                let location__c = location__Id__c;
                let title__c = school_Name__c;
                let related_To_Code__c = schoolJson.school_Code__c;
                if(formImgData?.images.length){
                    const contentPayloads = formImgData.images.map(img => ({
                        related_Type__c,
                        related_To_Id__c,
                        type__c,
                        location__c,
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
            toast.success('School updated successfully');
            setOriginalFormData({ ...formData });
            setOriginalFormImgData({ ...formImgData });
            setShowUpdateForm(false);
            setIsDataLoading(false);
        }catch(error){
            console.log('Error while updating schhol and related records.',JSON.stringify(error));
        }
    };

    return(
        <div className="cls_header_advs">
            <div className="cls_crd_wrp_advs">
                {isDataLoading ? <div className="spinner_cnt"><HCSpinner /></div> :  
                    <div className="cls_crd_cnt_advs">
                        <div className="cls_crd_hdr_advs">
                            <div>
                                <h2>School Detail</h2>
                            </div>
                            {!showUpdateForm && 
                                <div className="cls_crd_hdr_btnwrp_advs">
                                    <Button myclass="cls_btn_primary_adm" onClick={() => setShowUpdateForm(true)}>
                                        Edit
                                    </Button>
                                    <Button myclass="cls_btn_primary_adm" onClick={() => navigate('/admin-school')}>
                                        Back
                                    </Button>
                                </div>
                            }
                            {showUpdateForm && 
                                <div className="cls_crd_hdr_btnwrp_advs">
                                    <Button myclass="cls_btn_primary_adm" onClick={() => setShowUpdateForm(false)}>
                                        Cancel
                                    </Button>
                                    <Button myclass="cls_btn_primary_adm" onClick={() => handleSave()}>
                                        Save
                                    </Button>
                                </div>
                            }
                        </div>
                        <div className="cls_sec_header_advs">
                            <img src={isSection1Open ? ic_arrowdown : ic_arrowup} className="icon_cls_cnt_FT" style={{cursor : 'pointer'}} onClick={() => setIsSection1Open(!isSection1Open)}></img>
                            <span className="text-large text-label-white">School Details</span>
                        </div>
                        {isSection1Open && 
                            <HCSchoolDetail 
                                showStatus={true} 
                                formData={formData} 
                                mode={showUpdateForm ? 'edit' : 'view'} 
                                onFieldChange={handleFieldChange}
                                onArrayChange={handleArrayChange}
                                onEditClick={handleEdit} 
                                errors={errors}
                            />
                        }
                        <div className="cls_sec_header_advs">
                            <img src={isSection2Open ? ic_arrowdown : ic_arrowup} className="icon_cls_cnt_FT" style={{cursor : 'pointer'}} onClick={() => setIsSection2Open(!isSection2Open)}></img>
                            <span className="text-large text-label-white">Address Details</span>
                        </div>
                        {isSection2Open && 
                            <HCLocationDetail 
                                formData={formData} 
                                mode={showUpdateForm ? 'edit' : 'view'} 
                                onFieldChange={handleFieldChange}
                                onArrayChange={handleArrayChange}
                                onEditClick={handleEdit}
                            />
                        }
                        <div className="cls_sec_header_advs">
                            <img src={isSection3Open ? ic_arrowdown : ic_arrowup} className="icon_cls_cnt_FT" style={{cursor : 'pointer'}} onClick={() => setIsSection3Open(!isSection3Open)}></img>
                            <span className="text-large text-label-white">School Image Details</span>
                        </div>
                        {isSection3Open && 
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
export default HCAdminViewSchool;