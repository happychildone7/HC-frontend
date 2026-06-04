import React, { useState } from "react";
import Dropdown from "../components/HCDropdown";
import MultiSelectDropdwon from "../components/HCMultiSelectDropdown";
import ic_edit from '../images/edit.WebP';
import DropdownItem from "../components/HCDropdownItem";
import '../styles/HCAdminCommon.css';
import ic_checked from '../images/checked.WebP';
import ic_unchecked from '../images/unchecked.WebP';
import HCLookup from "../components/HCLookup";

const HCEventDetail = ({ formData,showStatus,onFieldChange,onArrayChange,errors={},mode='view',onEditClick }) => {

    const EVENT_TYPE = [
        {
            label: 'Annual Day',
            value: 'Annual_Day'
        },
        {
            label: 'Sports Day',
            value: 'Sports_Day'
        },
        {
            label: 'Cultural Fest',
            value: 'Cultural_Fest'
        },
        {
            label: 'Science Fair',
            value: 'Science_Fair'
        },
        {
            label: 'PTM',
            value: 'PTM'
        },
        {
            label: 'Workshop',
            value: 'Workshop'
        },
        {
            label: 'Seminar',
            value: 'Seminar'
        },
        {
            label: 'Field Trip',
            value: 'Field_Trip'
        },
        {
            label: 'Talent Show',
            value: 'Talent_Show'
        },
        {
            label: 'Quiz',
            value: 'Quiz'
        },
        {
            label: 'Festival',
            value: 'Festival'
        },
        {
            label: 'Other',
            value: 'Other'
        },
    ];
    const STATUS = [
        {
            label: 'Draft',
            value: 'Draft'
        },
        {
            label: 'Published',
            value: 'Published'
        },
        {
            label: 'Ongoing',
            value: 'Ongoing'
        },
        {
            label: 'Completed',
            value: 'Completed'
        },
        {
            label: 'Cancelled',
            value: 'Cancelled'
        }
    ];
    const FEE_RANGE = [
        {
            label: 'Free',
            value: 'Free'
        },
        {
            label: 'Low(₹0-500)',
            value: 'Low(₹0-500)'
        },
        {
            label: 'Medium(₹500-2000)',
            value: 'Medium(₹500-2000)'
        },
        {
            label: 'High(₹2000+)',
            value: 'High(₹2000+)'
        }
    ];
    const AGE_GROUP = [
        {
            label: 'Playgroup-KG',
            value: 'Playgroup-KG'
        },
        {
            label: '1-5',
            value: '1-5'
        },
        {
            label: '6-10',
            value: '6-10'
        },
        {
            label: '11-12',
            value: '11-12'
        },
        {
            label: 'All Ages',
            vale: 'All_Ages'
        }
    ];
    const FORMAT = [
        {
            label: 'Online',
            value: 'Online'
        },
        {
            label: 'Offline',
            value: 'Offline'
        },
        {
            label: 'Hybrid',
            value: 'Hybrid'
        }
    ];
    const AMENITIES = [
        {
            label: 'AC Hall',
            value: 'AC_Hall'
        },
        {
            label: 'Outdoor Venue',
            value: 'Outdoor_Venue'
        },
        {
            label: 'Stage',
            value: 'Stage'
        },
        {
            label: 'Sports Ground',
            value: 'Sports_Ground'
        },
        {
            label: 'Refreshments',
            value: 'Refreshments'
        },
        {
            label: 'Parking',
            value: 'Parking'
        },
        {
            label: 'Transport',
            value: 'Transport'
        },
        {
            label: 'Certificates',
            value: 'Certificates'
        }
    ];

    return(
        <div className="cls_adm_form-row_hcpas">
            {mode==='edit' && 
                <>
                    <div className="col-md-6 my-3 displayFlexColumn">
                        <label>Event Name</label>
                        <input 
                            className="formInputBox" 
                            type="text" 
                            placeholder="Enter Event name*"
                            onChange={(e) => onFieldChange('event_Name__c',e.target.value)}
                            value={formData.event_Name__c || ''}
                        />
                        {errors.event_Name__c && (
                            <div className="text-label-red text-small"><b>{errors.event_Name__c}</b></div>
                        )}
                    </div>
                    <div className="col-md-6 my-3 displayFlexColumn">
                        <label>Event Type</label>
                        <Dropdown
                            buttonLabel=""
                            buttonText={formData.event_Type__c?formData.event_Type__c:"Select event type*"}
                            isRequired=""
                            content={
                                <>
                                    {EVENT_TYPE?.map((etyp) => (
                                        <DropdownItem key={etyp?.value} onClick={() => {
                                            console.log('select loc type'+etyp.label);
                                            onFieldChange('event_Type__c',etyp.value);
                                        }}>{etyp?.label}</DropdownItem>
                                    ))}
                                </>
                            }
                            customCls="dropdown-btn max-width_90 bg_white box-shadow_none"
                            hoverable={false}
                        />
                        {errors.event_Type__c && 
                            <div className="text-label-red text-small"><b>{errors.event_Type__c}</b></div>
                        }
                    </div> 
                    <div className="col-md-6 my-3 displayFlexColumn">
                        <label>Date of Event</label>
                        <input 
                            className="formInputBox" 
                            type="date" 
                            placeholder="Enter event date*"
                            onChange={(e) => onFieldChange('event_Date__c',e.target.value)}
                            value={formData.event_Date__c || ''}
                        />
                        {errors.event_Date__c && (
                            <div className="text-label-red text-small"><b>{errors.event_Date__c}</b></div>
                        )}
                    </div>
                    <div className="col-md-6 my-3 displayFlexColumn">
                        <label>Event Start Time</label>
                        <input 
                            className="formInputBox" 
                            type="time" 
                            placeholder="Enter event start time*"
                            onChange={(e) => onFieldChange('event_Start_Time__c',e.target.value)}
                            value={formData.event_Start_Time__c || ''}
                        />
                        {errors.event_Start_Time__c && (
                            <div className="text-label-red text-small"><b>{errors.event_Start_Time__c}</b></div>
                        )}
                    </div>
                    <div className="col-md-6 my-3 displayFlexColumn">
                        <label>Event End Time</label>
                        <input 
                            className="formInputBox" 
                            type="time" 
                            placeholder="Enter event end time*"
                            onChange={(e) => onFieldChange('event_End_Time__c',e.target.value)}
                            value={formData.event_End_Time__c || ''}
                        />
                        {errors.event_End_Time__c && (
                            <div className="text-label-red text-small"><b>{errors.event_End_Time__c}</b></div>
                        )}
                    </div>
                    <div className="col-md-6 my-3 displayFlexColumn">
                        <label>Duration(hours)</label>
                        <input 
                            className="formInputBox" 
                            type="number" 
                            placeholder="Enter event duration in hours*"
                            onChange={(e) => onFieldChange('duration_Hours__c',e.target.value)}
                            value={formData.duration_Hours__c || ''}
                        />
                        {errors.duration_Hours__c && (
                            <div className="text-label-red text-small"><b>{errors.duration_Hours__c}</b></div>
                        )}
                    </div>
                    <div className="col-md-6 my-3 displayFlexColumn">
                        <label>Fee Range</label>
                        <Dropdown
                            buttonLabel=""
                            buttonText={formData.fee_Range__c?formData.fee_Range__c:"Select event fee range*"}
                            isRequired=""
                            content={
                                <>
                                    {FEE_RANGE?.map((frnge) => (
                                        <DropdownItem key={frnge?.value} onClick={() => {
                                            console.log('select fee rng'+frnge.label);
                                            onFieldChange('fee_Range__c',frnge.value);
                                        }}>{frnge?.label}</DropdownItem>
                                    ))}
                                </>
                            }
                            customCls="dropdown-btn max-width_90 bg_white box-shadow_none"
                            hoverable={false}
                        />
                        {errors.fee_Range__c && 
                            <div className="text-label-red text-small"><b>{errors.fee_Range__c}</b></div>
                        }
                    </div> 
                    <div className="col-md-6 my-3 displayFlexColumn">
                        <label>Age Group</label>
                        <Dropdown
                            buttonLabel=""
                            buttonText={formData.age_Group__c?formData.age_Group__c:"Select event age group*"}
                            isRequired=""
                            content={
                                <>
                                    {AGE_GROUP?.map((age) => (
                                        <DropdownItem key={age?.value} onClick={() => {
                                            console.log('select age group'+age.label);
                                            onFieldChange('age_Group__c',age.value);
                                        }}>{age?.label}</DropdownItem>
                                    ))}
                                </>
                            }
                            customCls="dropdown-btn max-width_90 bg_white box-shadow_none"
                            hoverable={false}
                        />
                        {errors.age_Group__c && 
                            <div className="text-label-red text-small"><b>{errors.age_Group__c}</b></div>
                        }
                    </div> 
                    <div className="col-md-6 my-3 displayFlexColumn">
                        <label>Event Format</label>
                        <Dropdown
                            buttonLabel=""
                            buttonText={formData.format__c?formData.format__c:"Select event format*"}
                            isRequired=""
                            content={
                                <>
                                    {FORMAT?.map((frmt) => (
                                        <DropdownItem key={frmt?.value} onClick={() => {
                                            console.log('select format'+frmt.label);
                                            onFieldChange('format__c',frmt.value);
                                        }}>{frmt?.label}</DropdownItem>
                                    ))}
                                </>
                            }
                            customCls="dropdown-btn max-width_90 bg_white box-shadow_none"
                            hoverable={false}
                        />
                        {errors.format__c && 
                            <div className="text-label-red text-small"><b>{errors.format__c}</b></div>
                        }
                    </div> 
                    <div className="col-md-6 my-3 displayFlexColumn">
                        <label>Event Amenities</label>
                        <MultiSelectDropdwon
                            buttonLabel=""
                            buttonText={formData.amenities__c?.length>0 ? AMENITIES.filter(a => formData.amenities__c.includes(a.value)).map(a => a.label).join(", ") : "Select amenities*"}
                            isRequired=""
                            content={
                                <>
                                    {AMENITIES?.map((amn) => (
                                        <DropdownItem 
                                            key={amn?.value} 
                                            onClick={() => {
                                                console.log('select amenities'+amn.label);
                                                const current = formData.amenities__c || [];
                                                const exists = current.includes(amn.value);
                                                const next = exists
                                                    ? current.filter(v => v !== amn.value)
                                                    : [...current, amn.value];
                                                onArrayChange('amenities__c',next);
                                            }}
                                            selected={formData.amenities__c?.includes(amn.value)}
                                            showCheckbox={true}
                                        >{amn?.label}</DropdownItem>
                                    ))}
                                </>
                            }
                            customCls="dropdown-btn max-width_90 bg_white box-shadow_none"
                            hoverable={false}
                        />
                        {errors.amenities__c && 
                            <div className="text-label-red text-small"><b>{errors.amenities__c}</b></div>
                        }
                    </div>
                    <div className="col-md-6 my-3 displayFlexColumn">
                        <label>Related School</label>
                        <HCLookup 
                            placeholder="Enter related school" 
                            className="formInputBox max-width_90" 
                            endpoint="/api/school/search/?query="
                            initialValue={formData.school_Name__c || ''}
                            onRecordSelect={(record) => {
                                console.log('Selected record:<>', record);
                                onFieldChange('school__c',record);
                            }}
                            fieldName="Name__c"
                        />
                        {errors.school__c && 
                            <div className="text-label-red text-small"><b>{errors.school__c}</b></div>
                        }
                    </div>
                    <div className="col-md-6 my-3 displayFlexColumn">
                        <label>Capacity</label>
                        <input 
                            className="formInputBox" 
                            type="number" 
                            placeholder="Enter event capacity*"
                            onChange={(e) => onFieldChange('capacity__c',e.target.value)}
                            value={formData.capacity__c}
                        />
                        {errors.capacity__c && 
                            <div className="text-label-red text-small"><b>{errors.capacity__c}</b></div>
                        }
                    </div>
                    <div className="col-md-6 my-3 displayFlexColumn">
                        <label>Registered Count</label>
                        <input 
                            className="formInputBox" 
                            type="number" 
                            placeholder="Enter count of participants registered*"
                            onChange={(e) => onFieldChange('registered_Count__c',e.target.value)}
                            value={formData.registered_Count__c}
                        />
                        {errors.registered_Count__c && 
                            <div className="text-label-red text-small"><b>{errors.registered_Count__c}</b></div>
                        }
                    </div>
                    {showStatus &&
                        <>
                            <div className="col-md-6 my-3 displayFlexColumn">
                                <label>Activation Status</label>
                                <input 
                                    type="checkbox" 
                                    onChange={(e) => onFieldChange('active__c',e.target.value)}
                                    checked={formData.active__c || false}
                                />
                                {errors.active__c && 
                                    <div className="text-label-red text-small"><b>{errors.active__c}</b></div>
                                }
                            </div>
                            <div className="col-md-6 my-3 displayFlexColumn">
                                <label>Status</label>
                                <Dropdown
                                    buttonLabel=""
                                    buttonText={formData.status__c?formData.status__c:"Select event status*"}
                                    isRequired=""
                                    content={
                                        <>
                                            {STATUS?.map((sts) => (
                                                <DropdownItem key={sts?.value} onClick={() => {
                                                    console.log('select loc type'+sts.label);
                                                    onFieldChange('status__c',sts.value);
                                                }}>{sts?.label}</DropdownItem>
                                            ))}
                                        </>
                                    }
                                    customCls="dropdown-btn max-width_90 bg_white box-shadow_none"
                                    hoverable={false}
                                />
                                {errors.status__c && 
                                    <div className="text-label-red text-small"><b>{errors.status__c}</b></div>
                                }
                            </div>
                        </>
                    }
                    <div className="col-md-80 my-3 displayFlexColumn">
                        <label>Description</label>
                        <input 
                            className="formInputBox" 
                            type="textarea" 
                            placeholder="Enter description"
                            onChange={(e) => onFieldChange('description__c',e.target.value)}
                            value={formData.description__c}
                        />
                        {errors.description__c && 
                            <div className="text-label-red text-small"><b>{errors.description__c}</b></div>
                        }
                    </div>
                </>  
            }
            {mode==='view' && 
                <>
                    <div className="cls_adm_rec_page_body_col col-md-2">
                        <div className="cls_adm_rec_page_body_col_cnt">
                            <div className="cls_adm_rec_page_body_col_lbl">Event Name</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                {formData.event_Name__c}
                                <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                            </div>
                        </div>
                        <hr className="line_SN width_90"></hr>
                    </div>
                    <div className="cls_adm_rec_page_body_col col-md-2">
                        <div className="cls_adm_rec_page_body_col_cnt">
                            <div className="cls_adm_rec_page_body_col_lbl">Event Type</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                {formData.event_Type__c}
                                <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                            </div>
                        </div>
                        <hr className="line_SN width_90"></hr>
                    </div>
                    <div className="cls_adm_rec_page_body_col col-md-2">
                        <div className="cls_adm_rec_page_body_col_cnt">
                            <div className="cls_adm_rec_page_body_col_lbl">Date of Event</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                {formData.event_Date__c}
                                <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                            </div>
                        </div>
                        <hr className="line_SN width_90"></hr>
                    </div>
                    <div className="cls_adm_rec_page_body_col col-md-2">
                        <div className="cls_adm_rec_page_body_col_cnt">
                            <div className="cls_adm_rec_page_body_col_lbl">Event Start Time</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                {formData.event_Start_Time__c}
                                <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                            </div>
                        </div>
                        <hr className="line_SN width_90"></hr>
                    </div>
                    <div className="cls_adm_rec_page_body_col col-md-2">
                        <div className="cls_adm_rec_page_body_col_cnt">
                            <div className="cls_adm_rec_page_body_col_lbl">Event End Time</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                {formData.event_End_Time__c}
                                <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                            </div>
                        </div>
                        <hr className="line_SN width_90"></hr>
                    </div>
                    <div className="cls_adm_rec_page_body_col col-md-2">
                        <div className="cls_adm_rec_page_body_col_cnt">
                            <div className="cls_adm_rec_page_body_col_lbl">Duration(hours)</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                {formData.duration_Hours__c}
                                <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                            </div>
                        </div>
                        <hr className="line_SN width_90"></hr>
                    </div>
                    <div className="cls_adm_rec_page_body_col col-md-2">
                        <div className="cls_adm_rec_page_body_col_cnt">
                            <div className="cls_adm_rec_page_body_col_lbl">Fee Range</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                {formData.fee_Range__c}
                                <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                            </div>
                        </div>
                        <hr className="line_SN width_90"></hr>
                    </div>
                    <div className="cls_adm_rec_page_body_col col-md-2">
                        <div className="cls_adm_rec_page_body_col_cnt">
                            <div className="cls_adm_rec_page_body_col_lbl">Age Group</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                {formData.age_Group__c}
                                <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                            </div>
                        </div>
                        <hr className="line_SN width_90"></hr>
                    </div>
                    <div className="cls_adm_rec_page_body_col col-md-2">
                        <div className="cls_adm_rec_page_body_col_cnt">
                            <div className="cls_adm_rec_page_body_col_lbl">Event Format</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                {formData.format__c}
                                <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                            </div>
                        </div>
                        <hr className="line_SN width_90"></hr>
                    </div>
                    <div className="cls_adm_rec_page_body_col col-md-2">
                        <div className="cls_adm_rec_page_body_col_cnt">
                            <div className="cls_adm_rec_page_body_col_lbl">Event Amenities</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                <div className="cls_classes_badges">
                                    {(formData?.amenities__c || []).map((amn, idx) => (
                                        <span key={idx} className="cls_class_chip">
                                            {amn}
                                        </span>
                                    ))}
                                </div>
                                <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                            </div>
                        </div>
                        <hr className="line_SN width_90"></hr>
                    </div>
                    <div className="cls_adm_rec_page_body_col col-md-2">
                        <div className="cls_adm_rec_page_body_col_cnt">
                            <div className="cls_adm_rec_page_body_col_lbl">Related School</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                {formData.school_Name__c}
                                <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                            </div>
                        </div>
                        <hr className="line_SN width_90"></hr>
                    </div>
                    <div className="cls_adm_rec_page_body_col col-md-2">
                        <div className="cls_adm_rec_page_body_col_cnt">
                            <div className="cls_adm_rec_page_body_col_lbl">Capacity</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                {formData.capacity__c}
                                <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                            </div>
                        </div>
                        <hr className="line_SN width_90"></hr>
                    </div>
                    <div className="cls_adm_rec_page_body_col col-md-2">
                        <div className="cls_adm_rec_page_body_col_cnt">
                            <div className="cls_adm_rec_page_body_col_lbl">Registered Count</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                {formData.registered_Count__c}
                                <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                            </div>
                        </div>
                        <hr className="line_SN width_90"></hr>
                    </div>
                    {showStatus && 
                        <>
                            <div className="cls_adm_rec_page_body_col col-md-2">
                                <div className="cls_adm_rec_page_body_col_cnt">
                                    <div className="cls_adm_rec_page_body_col_lbl">Activation Status</div>
                                    <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                        onEditClick();
                                    }}>
                                        {formData.active__c &&
                                            <img src={ic_checked} className="edit_img"></img>
                                        }
                                        {!formData.active__c && 
                                            <img src={ic_unchecked} className="edit_img"></img>
                                        }
                                        <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                                    </div>
                                </div>
                                <hr className="line_SN width_90"></hr>
                            </div>
                            <div className="cls_adm_rec_page_body_col col-md-2">
                                <div className="cls_adm_rec_page_body_col_cnt">
                                    <div className="cls_adm_rec_page_body_col_lbl">Status</div>
                                    <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                        onEditClick();
                                    }}>
                                        {formData.status__c}
                                        <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                                    </div>
                                </div>
                                <hr className="line_SN width_90"></hr>
                            </div>
                        </>
                    }
                    <div className="cls_adm_rec_page_body_col col-md-1">
                        <div className="cls_adm_rec_page_body_col_cnt">
                            <div className="cls_adm_rec_page_body_col_lbl">Description</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                {formData.description__c}
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
export default HCEventDetail;