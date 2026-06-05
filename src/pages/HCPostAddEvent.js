import React, { useState } from "react";
import Button from "../components/HCButton";
import ic_check from '../images/check.WebP';
import '../styles/HCPostAddEvent.css';
import ic_arrowup from '../images/arrowup.WebP';
import ic_arrowdown from '../images/arrowdown.WebP';
import HCSpinner from '../components/HCSpinner';
import { useNavigate } from "react-router-dom";
import HCEventDetail from "../common/HCEventDetail";
import HCLocationDetail from '../common/HCLocationDetail';
import HCImageDetail from "../common/HCImageDetail";
import { API_BASE } from "../utils/config";

const HCPostAddEvent = ({ onCancel,showStatus }) => {
    const [isFormVisible,setIsFormVisible] = useState(true);
    const [isSection1Open,setIsSection1Open] = useState(true);
    const [isSection2Open,setIsSection2Open] = useState(true);
    const [isSection3Open,setIsSection3Open] = useState(true);
    const [formData,setFormData] = useState({
        event_Name__c: '',
        event_Type__c: '',
        event_Date__c: '',
        event_Start_Time__c: '',
        event_End_Time__c: '',
        duration_Hours__c: '',
        fee_Range__c: '',
        age_Group__c: '',
        format__c: '',
        amenities__c: [],
        school__c: '',
        capacity__c: '',
        registered_Count__c: '',
        active__c: '',
        status__c: '',
        description__c: '',
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
            event_Name__c: '',
            event_Type__c: '',
            event_Date__c: '',
            event_Start_Time__c: '',
            event_End_Time__c: '',
            duration_Hours__c: '',
            fee_Range__c: '',
            age_Group__c: '',
            format__c: '',
            amenities__c: [],
            school__c: '',
            capacity__c: '',
            registered_Count__c: '',
            active__c: '',
            status__c: '',
            description__c: '',
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
            event_Name__c,
            event_Type__c,
            event_Date__c,
            event_Start_Time__c,
            event_End_Time__c,
            duration_Hours__c,
            fee_Range__c,
            age_Group__c,
            format__c,
            amenities__c,
            school__c,
            capacity__c,
            registered_Count__c,
            active__c,
            status__c,
            description__c,
            line1__c,
            line2__c,
            country__c,
            state__c,
            city__c,
            pin__c,
            location_Type__c,
            coordinates__c
        } = formData;
        const newErrors = {
            event_Name__c: !event_Name__c?.trim() ? 'Event name is required.' : '',
            event_Type__c: !event_Type__c?.trim() ? 'Event type is required.' : '',
            event_Date__c: !event_Date__c?.trim() ? 'Event date is required.' : '',
            event_Start_Time__c: !event_Start_Time__c?.trim() ? 'Event start time is required' : '',
            duration_Hours__c: !duration_Hours__c?.trim() ? 'Duration of event is required.' : '',
            fee_Range__c: !fee_Range__c?.trim() ? 'Fee Range is required.' : '',
            age_Group__c: !age_Group__c?.trim() ? 'Age group is required.' : '',
            format__c: !format__c?.trim() ? 'Event format is requried.' : '',
            amenities__c: !amenities__c || amenities__c.length === 0 ? 'At least one amenity is required.' : '',
            school__c: !school__c || !school__c._id ? 'Related school is required.' : '',
            capacity__c: !capacity__c?.trim() ? 'Capacity is required.' : '',
            registered_Count__c: !registered_Count__c?.trim() ? 'Countof registered users is required.' : '',
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
            const resp = await fetch(`${API_BASE}/api/location/`, {
                method: 'POST',
                body: JSON.stringify(form_data_location),
                headers: {
                    'content-type' : 'application/json'
                }
            });
            const jsonLoc = await resp.json();
            if(!resp.ok){
                console.log('Error in creating location.',jsonLoc);
                setIsDataLoading(false);
            }
            if(resp.ok){
                console.log('location created',jsonLoc);
                let location__c = jsonLoc._id;
                let Name__c = event_Name__c;
                const form_data_event = { 
                                            Name__c,description__c,event_Type__c,event_Date__c,event_Start_Time__c,event_End_Time__c,duration_Hours__c,fee_Range__c,
                                            age_Group__c,format__c,amenities__c,school__c,location__c,capacity__c,
                                            registered_Count__c 
                                        };
                console.log('Form data Event>'+JSON.stringify(form_data_event));
                try{
                    const resp = await fetch(`${API_BASE}/api/event/`, {
                        method: 'POST',
                        body: JSON.stringify(form_data_event),
                        headers: {
                            'content-type' : 'application/json'
                        }
                    });
                    const jsonEvent = await resp.json();
                    if(!resp.ok){
                        console.log('Something went wrong while creating Event.',jsonEvent);
                        setIsDataLoading(false);
                    }
                    if(resp.ok){
                        let related_Type__c = 'Event';
                        let related_To_Id__c = jsonEvent._id;
                        let type__c = 'Image';
                        let location__c = jsonEvent.location__c;
                        let title__c = jsonEvent.Name__c;
                        let related_To_Code__c = jsonEvent.event_Code__c;
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
                            navigate('/post-add');
                        }, 2000);
                    }
                }catch(error){
                    console.log('Error in Event creation>'+JSON.stringify(error));
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
            await fetch(`${API_BASE}api/fileUpload/cleanUp`, {
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
            <div className="cls_crd_cnt_pa_pae">
                <div className="footerContColm_ft_wt_AD_pae footerContColm_pae">
                    {isDataLoading ? <div className="spinner_cnt"><HCSpinner /></div> :  isFormVisible && 
                        <div>
                            <div className="text-heading-medium text-center"><b>New Event</b></div><br/>
                            <div id="input_form">
                                <form className="myFlex">
                                    <div className="cls_sec_header1_pae">
                                        <img src={isSection1Open ? ic_arrowdown : ic_arrowup} className="icon_cls_cnt_FT_pae" style={{cursor : 'pointer'}} onClick={() => setIsSection1Open(!isSection1Open)}></img>
                                        <span className="text-large text-label-white">Event Details</span>
                                    </div>
                                    {isSection1Open && 
                                        <HCEventDetail 
                                            formData={formData} 
                                            onFieldChange={handleFieldChange} 
                                            onArrayChange={handleArrayChange} 
                                            errors={errors} 
                                            mode="edit" 
                                        />
                                    }
                                    <div className="cls_sec_header1_pae">
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
                                    }
                                    <div className="cls_sec_header1_pae">
                                        <img src={isSection3Open ? ic_arrowdown : ic_arrowup} className="icon_cls_cnt_FT_pae" style={{cursor : 'pointer'}} onClick={() => setIsSection3Open(!isSection3Open)}></img>
                                        <span className="text-large text-label-white">Add Event Images</span>
                                    </div>
                                    {isSection3Open && 
                                        <HCImageDetail 
                                            mode="edit" 
                                            onUploadComplete={handleFileUploadComplete} 
                                            maxFiles={4} 
                                            label="Event Images"
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
                            <span className="text-large text-center">HC Event created successfully.</span>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default HCPostAddEvent;