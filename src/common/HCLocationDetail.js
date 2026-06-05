import React, { useState, useEffect } from "react";
import Dropdown from "../components/HCDropdown";
import MultiSelectDropdwon from "../components/HCMultiSelectDropdown";
import DropdownItem from "../components/HCDropdownItem";
import MapPicker from '../components/HCMapPicker';
import ic_edit from '../images/edit.WebP';
import '../styles/HCAdminCommon.css';
import { API_BASE } from "../utils/config";

const HCSchoolDetail = ({ formData,onFieldChange,onArrayChange,errors={},mode='view',onEditClick }) => {
    const [countries,setCountries] = useState([]);
    const [states,setStates] = useState([]);
    const [cities,setCities] = useState([]);
    const [countryId__c,setCountryId__c] = useState('');
    const [stateId__c,setStateId__c] = useState('');
    const [cityId__c,setCityId__c] = useState('');

    const GOOGLE_MAPS_KEY = process.env.REACT_APP_GOOGLE_MAPS_KEY;

    const locationTypes = [
        {
            label: 'Urban',
            value: 'Urban'
        },
        {
            label: 'Suburban',
            value: 'Suburban'
        },
        {
            label: 'Rural',
            value: 'Rural'
        },
        {
            label: 'Semi-Urbanrban',
            value: 'Semi-Urban'
        },
        {
            label: 'Hill Area',
            value: 'Hill-Area'
        },
        {
            label: 'Coastal',
            value: 'Coastal'
        },
        {
            label: 'Remote',
            value: 'Remote'
        },
        {
            label: 'Tribal',
            value: 'Tribal'
        }
    ];

    useEffect(() => {
        fetchCountries();
    },[]);
    useEffect(() => {
        fetchStates();
    },[formData.country__c, countries]);
    useEffect(() => {
        fetchCities();
    },[stateId__c]);

    const fetchCountries = async(e) => {
        try{
            const resp = await fetch(`${API_BASE}/api/country/`, {
                method: 'GET',
                headers: {
                    'content-type' : 'application/json'
                }
            })
            const json = await resp.json();
            if(!resp.ok){
                console.log('ERROR in fetch all countries>',json);
            }
            else{
                setCountries(json);
            }
        }catch(error){
            console.log('ERROR in fetch all countries>',JSON.stringify(error));
        }
    };
    const fetchStates = async(e) => {
        try{
            if(!countryId__c) return;
            const resp = await fetch(`${API_BASE}/api/state/fetch/?country__c=${countryId__c}`, {
                method: 'GET', 
                headers: {
                    'content-type' : 'application/json'
                }
            })
            const json = await resp.json();
            if(!resp.ok){
                console.log('ERROR in fetch all states for a country>',json);
            }
            else{
                setStates(json);
            }
        }catch(error){
            console.log('ERROR in fetch all states for a country>',JSON.stringify(error));
        }
    };
    const fetchCities = async(e) => {
        try{
            if(!stateId__c) return;
            const resp = await fetch(`${API_BASE}/api/city/fetch/?state__c=${stateId__c}`, {
                method: 'GET', 
                headers: {
                    'content-type' : 'application/json'
                }
            })
            const json = await resp.json();
            if(!resp.ok){
                console.log('ERROR in fetch all cities for a state>',json);
            }
            else{
                setCities(json);
            }
        }catch(error){
            console.log('ERROR in fetch all cities for a state>',JSON.stringify(error));
        }
    };
    const handleMapChange = (pos) => {
        onFieldChange('coordinates__c',{
            type: 'Point',
            coordinates: [pos.lng, pos.lat]
        });
    };

    return(
        <div className="cls_adm_form-row_hcpas">
            {mode==='edit' &&
                <>
                    <div className="col-md-6 my-3 displayFlexColumn">
                        <label>Line 1</label>
                        <input 
                            className="formInputBox" 
                            type="text" 
                            placeholder="Enter address line 1"
                            onChange={(e) => onFieldChange('line1__c',e.target.value)}
                            value={formData.line1__c}
                        />
                        {errors.line1__c && 
                            <div className="text-label-red text-small"><b>{errors.line1__c}</b></div>
                        }
                    </div>
                    <div className="col-md-6 my-3 displayFlexColumn">
                        <label>Line 2</label>
                        <input 
                            className="formInputBox" 
                            type="text" 
                            placeholder="Enter address line 2"
                            onChange={(e) => onFieldChange('line2__c',e.target.value)}
                            value={formData.line2__c}
                            disabled={mode==='view'}
                        />
                    </div>
                    <div className="col-md-6 my-3 displayFlexColumn">
                        <label>Country</label>
                        <Dropdown
                            buttonLabel=""
                            buttonText={formData.country__c || "Select Country"}
                            isRequired=""
                            content={
                                <>
                                    {countries?.map((cont) => (
                                        <DropdownItem key={cont?._id} onClick={() => {
                                            console.log('select cont'+cont.name__c);
                                            onFieldChange('country__c',cont.name__c);
                                            setCountryId__c(cont._id);
                                        }}>{cont?.name__c}</DropdownItem>
                                    ))}
                                </>
                            }
                            customCls="dropdown-btn max-width_90 bg_white box-shadow_none"
                            hoverable={false}
                        />
                        {errors.country__c && 
                            <div className="text-label-red text-small"><b>{errors.country__c}</b></div>
                        }
                    </div>
                    <div className="col-md-6 my-3 displayFlexColumn">
                        <label>State</label>
                        <Dropdown
                            buttonLabel=""
                            buttonText={formData.state__c || "Select State"}
                            isRequired=""
                            content={
                                <>
                                    {states?.map((st) => (
                                        <DropdownItem key={st?._id} onClick={() => {
                                            console.log('select cont'+st.name__c);
                                            onFieldChange('state__c',st.name__c);
                                            setStateId__c(st._id);
                                        }}>{st?.name__c}</DropdownItem>
                                    ))}
                                </>
                            }
                            customCls="dropdown-btn max-width_90 bg_white box-shadow_none"
                            hoverable={false}
                        />
                        {errors.state__c && 
                            <div className="text-label-red text-small"><b>{errors.state__c}</b></div>
                        }
                    </div>
                    <div className="col-md-6 my-3 displayFlexColumn">
                        <label>City</label>
                        <Dropdown
                            buttonLabel=""
                            buttonText={formData.city__c || "Select City"}
                            isRequired=""
                            content={
                                <>
                                    {cities?.map((ct) => (
                                        <DropdownItem key={ct?._id} onClick={() => {
                                            console.log('select city'+ct.name__c);
                                            onFieldChange('city__c',ct.name__c);
                                            setCityId__c(ct._id);
                                        }}>{ct?.name__c}</DropdownItem>
                                    ))}
                                </>
                            }
                            customCls="dropdown-btn max-width_90 bg_white box-shadow_none"
                            hoverable={false}
                        />
                        {errors.city__c && 
                            <div className="text-label-red text-small"><b>{errors.city__c}</b></div>
                        }
                    </div>
                    <div className="col-md-6 my-3 displayFlexColumn">
                        <label>Pin Code</label>
                        <input 
                            className="formInputBox" 
                            type="text" 
                            placeholder="Enter pin code*"
                            onChange={(e) => onFieldChange('pin__c',e.target.value)}
                            value={formData.pin__c}
                            disabled={mode==='view'}
                        />
                        {errors.pin__c && 
                            <div className="text-label-red text-small"><b>{errors.pin__c}</b></div>
                        }
                    </div>
                    <div className="col-md-6 my-3 displayFlexColumn">
                        <label>School Location Type</label>
                        <Dropdown
                            buttonLabel=""
                            buttonText={formData.location_Type__c?formData.location_Type__c:"Select School Location Type"}
                            isRequired=""
                            content={
                                <>
                                    {locationTypes?.map((loct) => (
                                        <DropdownItem key={loct?.value} onClick={() => {
                                            console.log('select loc type'+loct.label);
                                            onFieldChange('location_Type__c',loct.value);
                                        }}>{loct?.label}</DropdownItem>
                                    ))}
                                </>
                            }
                            customCls="dropdown-btn max-width_90 bg_white box-shadow_none"
                            hoverable={false}
                        />
                        {errors.location_Type__c && 
                            <div className="text-label-red text-small"><b>{errors.location_Type__c}</b></div>
                        }
                    </div>
                    <div className="col-md-6 my-3 displayFlexColumn">
                        <label>Coordinates (select on map)</label>
                        <div className="coords-map-wrapper">
                            <MapPicker apiKey={GOOGLE_MAPS_KEY} value={formData.coordinates__c?.coordinates ? {lat : formData.coordinates__c?.coordinates[1], lng : formData.coordinates__c.coordinates[0]} : null} onChange={handleMapChange}/>
                        </div>
                        <small>
                                Lat: {formData.coordinates__c?.coordinates ? formData.coordinates__c.coordinates[1] : "-"} 
                                {" | "} 
                                Lng: {formData.coordinates__c?.coordinates ? formData.coordinates__c.coordinates[0] : "-"}
                        </small>
                        {errors.coordinates__c && 
                            <div className="text-label-red text-small"><b>{errors.coordinates__c}</b></div>
                        }
                    </div>
                </>
            }
            {mode==='view' && 
                <>
                    <div className="cls_adm_rec_page_body_col col-md-2">
                        <div className="cls_adm_rec_page_body_col_cnt">
                            <div className="cls_adm_rec_page_body_col_lbl">Line 1</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                {formData.line1__c}
                                <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                            </div>
                        </div>
                        <hr className="line_SN width_90"></hr>
                    </div>
                    <div className="cls_adm_rec_page_body_col col-md-2">
                        <div className="cls_adm_rec_page_body_col_cnt">
                            <div className="cls_adm_rec_page_body_col_lbl">Line 2</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                {formData.line2__c}
                                <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                            </div>
                        </div>
                        <hr className="line_SN width_90"></hr>
                    </div>
                    <div className="cls_adm_rec_page_body_col col-md-2">
                        <div className="cls_adm_rec_page_body_col_cnt">
                            <div className="cls_adm_rec_page_body_col_lbl">Country</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                {formData.country__c}
                                <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                            </div>
                        </div>
                        <hr className="line_SN width_90"></hr>
                    </div>
                    <div className="cls_adm_rec_page_body_col col-md-2">
                        <div className="cls_adm_rec_page_body_col_cnt">
                            <div className="cls_adm_rec_page_body_col_lbl">State</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                {formData.state__c}
                                <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                            </div>
                        </div>
                        <hr className="line_SN width_90"></hr>
                    </div>
                    <div className="cls_adm_rec_page_body_col col-md-2">
                        <div className="cls_adm_rec_page_body_col_cnt">
                            <div className="cls_adm_rec_page_body_col_lbl">City</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                {formData.city__c}
                                <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                            </div>
                        </div>
                        <hr className="line_SN width_90"></hr>
                    </div>
                    <div className="cls_adm_rec_page_body_col col-md-2">
                        <div className="cls_adm_rec_page_body_col_cnt">
                            <div className="cls_adm_rec_page_body_col_lbl">Pin Code</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                {formData.pin__c}
                                <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                            </div>
                        </div>
                        <hr className="line_SN width_90"></hr>
                    </div>
                    <div className="cls_adm_rec_page_body_col col-md-2">
                        <div className="cls_adm_rec_page_body_col_cnt">
                            <div className="cls_adm_rec_page_body_col_lbl">School Location Type</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                {formData.location_Type__c}
                                <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                            </div>
                        </div>
                        <hr className="line_SN width_90"></hr>
                    </div>
                    <div className="cls_adm_rec_page_body_col col-md-2">
                        <div className="cls_adm_rec_page_body_col_cnt">
                            <div className="cls_adm_rec_page_body_col_lbl">Coordinates</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                {formData.coordinates__c?.coordinates 
                                    ? `${formData.coordinates__c.coordinates[1].toFixed(6)}, ${formData.coordinates__c.coordinates[0].toFixed(6)}`
                                    : "Not set"
                                }
                                <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                            </div>
                        </div>
                        <hr className="line_SN width_90"></hr>
                    </div>
                </>
            }
        </div>
    );
};
export default HCSchoolDetail;