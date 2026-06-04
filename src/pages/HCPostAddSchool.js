import React, { useState } from "react";
import Button from "../components/HCButton";
import ic_check from '../images/check.WebP';
import '../styles/HCPostAddSchool.css';
import ic_arrowup from '../images/arrowup.WebP';
import ic_arrowdown from '../images/arrowdown.WebP';
import HCSpinner from '../components/HCSpinner';
import { useNavigate } from "react-router-dom";
import HCSchoolDetail from "../common/HCSchoolDetail";
import HCLocationDetail from '../common/HCLocationDetail';
import HCImageDetail from "../common/HCImageDetail";

const HCPostAddSchool = ({ onCancel,showStatus }) => {
    const [isFormVisible,setIsFormVisible] = useState(true);
    const [isSection1Open,setIsSection1Open] = useState(true);
    const [isSection2Open,setIsSection2Open] = useState(true);
    const [isSection3Open,setIsSection3Open] = useState(true);
    const [formData,setFormData] = useState({
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
        line1__c: '',
        line2__c: '',
        country__c: '',
        state__c: '',
        city__c: '',
        pin__c: '',
        location_Type__c: '',
        coordinates__c: null
    });
    const [errors,setErrors] = useState({});
    const [formImgData,setFormImgData] = useState({ title: '', description: '', contentType: '', images: [] });
    const [isSuccessVisible,setIsSuccessVisible] = useState(false);
    const [isDataLoading,setIsDataLoading] = useState(false);

    const navigate = useNavigate();

    const handleRefresh = () => {
        setFormImgData({ title: '', description: '', contentType: '', images: [] });
        setFormData({
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
            line1__c: '',
            line2__c: '',
            country__c: '',
            state__c: '',
            city__c: '',
            pin__c: '',
            location_Type__c: '',
            coordinates__c: null
        });
        setErrors({});
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {
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
            description__c,
            age_Criteria_Min__c,
            age_Criteria_Max__c,
            line1__c,
            line2__c,
            country__c,
            state__c,
            city__c,
            pin__c,
            location_Type__c,
            coordinates__c,
            approval_Status__c
        } = formData;
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
        const form_data_location = { line1__c,line2__c,location_Type__c,city__c,state__c,country__c,pin__c,coordinates__c };
        try{
            const resp = await fetch('/api/location/', {
                method: 'POST',
                body: JSON.stringify(form_data_location),
                headers: {
                    'content-type' : 'application/json'
                }
            });
            const json = await resp.json();
            if(!resp.ok){
                console.log('Error in creating location.',json);
                setIsDataLoading(false);
            }
            if(resp.ok){
                console.log('location created',json);
                let location__c = json._id;
                let Name__c = school_Name__c;
                const form_data_school = {
                                            Name__c,description__c,location__c,board__c,ownership_Type__c,type__c,
                                            fee_Monthly_Min__c,co_Ed_Status__c,medium_Instruction__c,classes__c,
                                            age_Criteria_Min__c,age_Criteria_Max__c,facilities__c,
                                            admission_Status__c 
                                         };
                console.log('Form data school>'+JSON.stringify(form_data_school));
                try{
                    const resp = await fetch('/api/school', {
                        method: 'POST',
                        body: JSON.stringify(form_data_school),
                        headers: {
                            'content-type' : 'application/json'
                        }
                    });
                    const json = await resp.json();
                    if(!resp.ok){
                        console.log('Something went wrong while creating school.',json);
                        setIsDataLoading(false);
                    }
                    if(resp.ok){
                        let related_Type__c = 'School';
                        let related_To_Id__c = json._id;
                        let type__c = 'Image';
                        let location__c = json.location__c;
                        let title__c = json.Name__c;
                        let related_To_Code__c = json.school_Code__c;
                        if(formImgData?.images.length){
                            const contentPayloads = formImgData.images.map((img) => ({
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
                                    console.log('Form data content>'+JSON.stringify(payload));
                                    const resp = await fetch('/api/content/', {
                                        method: 'POST',
                                        body: JSON.stringify(payload),
                                        headers: {
                                            'content-type' : 'application/json'
                                        }
                                    });
                                    const json = await resp.json();
                                    if(!resp.ok){
                                        throw new Error(json.error || 'Content creation failed.');
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
                            navigate('/post-add');
                        }, 2000);
                    }
                }catch(error){
                    console.log('Error in school creation>'+JSON.stringify(error));
                }
            }
        }catch(error){
            console.log('Error in loc creation:'+JSON.stringify(error));
        }

    };
    const handleCancel = async (e) => {
        e.preventDefault();
        handleRefresh();
        if(formImgData?.images.length > 0){
            await fetch('api/fileUpload/cleanUp', {
                method: 'POST',
                headers: {
                    'content-type' : 'application/json'
                },
                body: JSON.stringify({ publicIds : formImgData.images.map(img => img.publicId) })
            });
        }
        if(onCancel){
            onCancel();
        }
        else{
            navigate('/post-add');
        }
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
            <div className="cls_crd_cnt_pas">
                <div className="footerContColm_ft_wt_AD footerContColm">
                    {isDataLoading ? <div className="spinner_cnt"><HCSpinner /></div> :  isFormVisible && 
                        <div>
                            <div className="text-heading-medium text-center"><b>New School</b></div><br/>
                            <div id="input_form">
                                <form className="myFlex">
                                    <div className="cls_sec_header1">
                                        <img src={isSection1Open ? ic_arrowdown : ic_arrowup} className="icon_cls_cnt_FT" style={{cursor : 'pointer'}} onClick={() => setIsSection1Open(!isSection1Open)}></img>
                                        <span className="text-large text-label-white">School Details</span>
                                    </div>
                                    {isSection1Open && 
                                        <HCSchoolDetail 
                                            formData={formData} 
                                            onFieldChange={handleFieldChange} 
                                            onArrayChange={handleArrayChange} 
                                            errors={errors} 
                                            mode="edit" 
                                        />
                                    }
                                    <div className="cls_sec_header1">
                                        <img src={isSection2Open ? ic_arrowdown : ic_arrowup} className="icon_cls_cnt_FT" style={{cursor : 'pointer'}} onClick={() => setIsSection2Open(!isSection2Open)}></img>
                                        <span className="text-large text-label-white">Address Details</span>
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
                                    }
                                    <div className="cls_sec_header1">
                                        <img src={isSection3Open ? ic_arrowdown : ic_arrowup} className="icon_cls_cnt_FT" style={{cursor : 'pointer'}} onClick={() => setIsSection3Open(!isSection3Open)}></img>
                                        <span className="text-large text-label-white">Add School Images</span>
                                    </div>
                                    {isSection3Open && 
                                        <HCImageDetail 
                                            mode="edit" 
                                            onUploadComplete={handleFileUploadComplete} 
                                            maxFiles={4} 
                                            label="School Images"
                                        />
                                    }
                                    <div className="cls_inpCard_foot">
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
                        <div className="success_cnt">
                            <img src={ic_check} className="success_img"></img>
                            <span className="text-large text-center">HC School created successfully.</span>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default HCPostAddSchool;