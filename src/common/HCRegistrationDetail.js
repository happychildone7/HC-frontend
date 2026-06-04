import React, { useState } from "react";
import Dropdown from "../components/HCDropdown";
import MultiSelectDropdwon from "../components/HCMultiSelectDropdown";
import ic_edit from '../images/edit.WebP';
import DropdownItem from "../components/HCDropdownItem";
import '../styles/HCAdminCommon.css';
import ic_checked from '../images/checked.WebP';
import ic_unchecked from '../images/unchecked.WebP';
import HCLookup from "../components/HCLookup";

const HCRegistrationDetail = ({ formData,showStatus,onFieldChange,onArrayChange,errors={},mode='view',onEditClick }) => {

    const STATUS = [
        {
            label: 'Draft',
            value: 'Draft'
        },
        {
            label: 'Registered',
            value: 'Registered'
        },
        {
            label: 'Waitlisted',
            value: 'Waitlisted'
        },
        {
            label: 'Cancelled',
            value: 'Cancelled'
        },
        {
            label: 'Rejected',
            value: 'Rejected'
        },
        {
            label: 'Checked In',
            value: 'Checked_In'
        }
    ];
    const ATTENDANCE_STATUS = [
        {
            label: 'Not Checked In',
            value: 'Not_Checked_In'
        },
        {
            label: 'Attended',
            value: 'Attended'
        },
        {
            label: 'No Show',
            value: 'No_Show'
        }
    ];
    const PAYMENT_STATUS = [
        {
            label: 'Not Required',
            value: 'Not_Required'
        },
        {
            label: 'Paid',
            value: 'Paid'
        },
        {
            label: 'Pending',
            value: 'Pending'
        },
        {
            label: 'Refunded',
            value: 'Refunded'
        },
        {
            label: 'Failed',
            value: 'Failed'
        }
    ];

    return(
        <div className="cls_adm_form-row_hcpas">
            {mode==='edit' && 
                <>
                    {<div className="col-md-6 my-3 displayFlexColumn">
                        <label>Registration Number</label>
                        <input 
                            className="disabled-input" 
                            type="text" 
                            placeholder="Enter Registration name*"
                            value={formData.registration_Number__c || ''}
                        />
                        {errors.registration_Number__c && (
                            <div className="text-label-red text-small"><b>{errors.registration_Number__c}</b></div>
                        )}
                    </div>}
                    <div className="col-md-6 my-3 displayFlexColumn">
                        <label>Contact</label>
                        <HCLookup 
                            placeholder="Enter related contact" 
                            className="formInputBox max-width_90" 
                            endpoint="/api/contact/search/?query="
                            initialValue={formData.contact_Name__c || ''}
                            onRecordSelect={(record) => {
                                console.log('Selected record:<>', record);
                                onFieldChange('contact__c',record);
                            }}
                            fieldName="full_Name__c"
                        />
                        {errors.contact__c && 
                            <div className="text-label-red text-small"><b>{errors.contact__c}</b></div>
                        }
                    </div>
                    <div className="col-md-6 my-3 displayFlexColumn">
                        <label>Event</label>
                        <HCLookup 
                            placeholder="Enter related event" 
                            className="formInputBox max-width_90" 
                            endpoint="/api/event/search/?query="
                            initialValue={formData.event_Name__c || ''}
                            onRecordSelect={(record) => {
                                console.log('Selected record:<>', record);
                                onFieldChange('event__c',record);
                            }}
                            fieldName="Name__c"
                        />
                        {errors.event__c && 
                            <div className="text-label-red text-small"><b>{errors.event__c}</b></div>
                        }
                    </div>
                    <div className="col-md-6 my-3 displayFlexColumn">
                        <label>Status</label>
                        <Dropdown
                            buttonLabel=""
                            buttonText={formData.status__c?formData.status__c.replaceAll('_',' '):"Select registration status*"}
                            isRequired=""
                            content={
                                <>
                                    {STATUS?.map((st) => (
                                        <DropdownItem key={st?.value} onClick={() => {
                                            console.log('select status'+st.label);
                                            onFieldChange('status__c',st.value);
                                        }}>{st?.label}</DropdownItem>
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
                    <div className="col-md-6 my-3 displayFlexColumn">
                        <label>Attendance Status</label>
                        <Dropdown
                            buttonLabel=""
                            buttonText={formData.attendance_Status__c?formData.attendance_Status__c.replaceAll('_',' '):"Select attendance status*"}
                            isRequired=""
                            content={
                                <>
                                    {ATTENDANCE_STATUS?.map((st) => (
                                        <DropdownItem key={st?.value} onClick={() => {
                                            console.log('select status'+st.label);
                                            onFieldChange('status__c',st.value);
                                        }}>{st?.label}</DropdownItem>
                                    ))}
                                </>
                            }
                            customCls="dropdown-btn max-width_90 bg_white box-shadow_none"
                            hoverable={false}
                        />
                        {errors.attendance_Status__c && (
                            <div className="text-label-red text-small"><b>{errors.attendance_Status__c}</b></div>
                        )}
                    </div>
                    <div className="col-md-6 my-3 displayFlexColumn">
                        <label>Payment Status</label>
                        <Dropdown
                            buttonLabel=""
                            buttonText={formData.payment_Status__c?formData.payment_Status__c.replaceAll('_',' '):"Select payment status*"}
                            isRequired=""
                            content={
                                <>
                                    {PAYMENT_STATUS?.map((st) => (
                                        <DropdownItem key={st?.value} onClick={() => {
                                            console.log('select status'+st.label);
                                            onFieldChange('status__c',st.value);
                                        }}>{st?.label}</DropdownItem>
                                    ))}
                                </>
                            }
                            customCls="dropdown-btn max-width_90 bg_white box-shadow_none"
                            hoverable={false}
                        />
                        {errors.payment_Status__c && (
                            <div className="text-label-red text-small"><b>{errors.payment_Status__c}</b></div>
                        )}
                    </div>
                    <div className="col-md-6 my-3 displayFlexColumn">
                        <label>Registration On</label>
                        <input 
                            className="disabled-input" 
                            type="time" 
                            placeholder="Enter Registration on*"
                            onChange={(e) => onFieldChange('registered_On__c',e.target.value)}
                            value={formData.registered_On__c || ''}
                        />
                        {errors.registered_On__c && (
                            <div className="text-label-red text-small"><b>{errors.registered_On__c}</b></div>
                        )}
                    </div>
                    <div className="col-md-6 my-3 displayFlexColumn">
                        <label>Waitlist Position</label>
                        <input 
                            className="formInputBox" 
                            type="number" 
                            placeholder="Enter waitlist position*"
                            onChange={(e) => onFieldChange('waitlist_Position__c',e.target.value)}
                            value={formData.waitlist_Position__c || ''}
                        />
                        {errors.waitlist_Position__c && (
                            <div className="text-label-red text-small"><b>{errors.waitlist_Position__c}</b></div>
                        )}
                    </div>
                    <div className="col-md-6 my-3 displayFlexColumn">
                        <label>Seat Count</label>
                        <input 
                            className="formInputBox" 
                            type="number" 
                            placeholder="Enter seat count*"
                            onChange={(e) => onFieldChange('seat_Count__c',e.target.value)}
                            value={formData.seat_Count__c || ''}
                        />
                        {errors.seat_Count__c && (
                            <div className="text-label-red text-small"><b>{errors.seat_Count__c}</b></div>
                        )}
                    </div>
                    <div className="col-md-6 my-3 displayFlexColumn">
                        <label>Consent</label>
                        <input 
                            type="checkbox" 
                            onChange={(e) => onFieldChange('consent__c',e.target.checked)}
                            checked={formData.consent__c || false}
                        />
                        {errors.consent__c && 
                            <div className="text-label-red text-small"><b>{errors.consent__c}</b></div>
                        }
                    </div>
                    <div className="col-md-80 my-3 displayFlexColumn">
                        <label>Notes</label>
                        <input 
                            className="formInputBox" 
                            type="textarea" 
                            placeholder="Enter notes"
                            onChange={(e) => onFieldChange('notes__c',e.target.value)}
                            value={formData.notes__c}
                        />
                        {errors.notes__c && 
                            <div className="text-label-red text-small"><b>{errors.notes__c}</b></div>
                        }
                    </div>
                </>  
            }
            {mode==='view' && 
                <>
                    <div className="cls_adm_rec_page_body_col col-md-2">
                        <div className="cls_adm_rec_page_body_col_cnt">
                            <div className="cls_adm_rec_page_body_col_lbl">Registration Number</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                {formData.registration_Number__c}
                                <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                            </div>
                        </div>
                        <hr className="line_SN width_90"></hr>
                    </div>
                    <div className="cls_adm_rec_page_body_col col-md-2">
                        <div className="cls_adm_rec_page_body_col_cnt">
                            <div className="cls_adm_rec_page_body_col_lbl">Contact</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                {formData.contact_Name__c}
                                <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                            </div>
                        </div>
                        <hr className="line_SN width_90"></hr>
                    </div>
                    <div className="cls_adm_rec_page_body_col col-md-2">
                        <div className="cls_adm_rec_page_body_col_cnt">
                            <div className="cls_adm_rec_page_body_col_lbl">Event</div>
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
                            <div className="cls_adm_rec_page_body_col_lbl">Status</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                {formData.status__c.replaceAll('_',' ')}
                                <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                            </div>
                        </div>
                        <hr className="line_SN width_90"></hr>
                    </div>
                    <div className="cls_adm_rec_page_body_col col-md-2">
                        <div className="cls_adm_rec_page_body_col_cnt">
                            <div className="cls_adm_rec_page_body_col_lbl">Attendance Status</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                {formData.attendance_Status__c.replaceAll('_',' ')}
                                <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                            </div>
                        </div>
                        <hr className="line_SN width_90"></hr>
                    </div>
                    <div className="cls_adm_rec_page_body_col col-md-2">
                        <div className="cls_adm_rec_page_body_col_cnt">
                            <div className="cls_adm_rec_page_body_col_lbl">Payment Status</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                {formData.payment_Status__c.replaceAll('_',' ')}
                                <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                            </div>
                        </div>
                        <hr className="line_SN width_90"></hr>
                    </div>
                    <div className="cls_adm_rec_page_body_col col-md-2">
                        <div className="cls_adm_rec_page_body_col_cnt">
                            <div className="cls_adm_rec_page_body_col_lbl">Registration On</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                {formData.registered_On__c}
                                <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                            </div>
                        </div>
                        <hr className="line_SN width_90"></hr>
                    </div>
                    <div className="cls_adm_rec_page_body_col col-md-2">
                        <div className="cls_adm_rec_page_body_col_cnt">
                            <div className="cls_adm_rec_page_body_col_lbl">Waitlist Position</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                {formData.waitlist_Position__c}
                                <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                            </div>
                        </div>
                        <hr className="line_SN width_90"></hr>
                    </div>
                    <div className="cls_adm_rec_page_body_col col-md-2">
                        <div className="cls_adm_rec_page_body_col_cnt">
                            <div className="cls_adm_rec_page_body_col_lbl">Seat Count</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                {formData.seat_Count__c}
                                <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                            </div>
                        </div>
                        <hr className="line_SN width_90"></hr>
                    </div>
                    <div className="cls_adm_rec_page_body_col col-md-2">
                        <div className="cls_adm_rec_page_body_col_cnt">
                            <div className="cls_adm_rec_page_body_col_lbl">Consent</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                {formData.consent__c &&
                                    <img src={ic_checked} className="edit_img"></img>
                                }
                                {!formData.consent__c && 
                                    <img src={ic_unchecked} className="edit_img"></img>
                                }
                                <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                            </div>
                        </div>
                        <hr className="line_SN width_90"></hr>
                    </div>
                    <div className="cls_adm_rec_page_body_col col-md-2">
                        <div className="cls_adm_rec_page_body_col_cnt">
                            <div className="cls_adm_rec_page_body_col_lbl">Notes</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                {formData.notes__c}
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
export default HCRegistrationDetail;