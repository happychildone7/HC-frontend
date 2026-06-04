import React, { useState } from "react";
import Dropdown from "../components/HCDropdown";
import ic_edit from '../images/edit.WebP';
import DropdownItem from "../components/HCDropdownItem";
import '../styles/HCAdminCommon.css';
import ic_checked from '../images/checked.WebP';
import ic_unchecked from '../images/unchecked.WebP';

const HCContactDetail = ({ formData,showStatus,onFieldChange,onArrayChange,errors={},mode='view',onEditClick,adminView=false }) => {

    const CONTACT_TYPE = [
        {
            label: 'Internal',
            value: 'Internal'
        },
        {
            label: 'Consumer',
            value: 'Consumer'
        }
    ];
    const GENDER = [
        {
            label: 'Male',
            value: 'Male'
        },
        {
            label: 'Female',
            value: 'Female'
        }
    ];

    return(
        <div className="cls_adm_form-row_hcpas">
            {mode==='edit' && 
                <>
                    <div className="col-md-6 my-3 displayFlexColumn">
                        <label>First Name</label>
                        <input 
                            className="formInputBox" 
                            type="text" 
                            placeholder="Enter first name*"
                            onChange={(e) => onFieldChange('first_Name__c',e.target.value)}
                            value={formData.first_Name__c || ''}
                            
                        />
                        {errors.first_Name__c && (
                            <div className="text-label-red text-small"><b>{errors.first_Name__c}</b></div>
                        )}
                    </div>
                    <div className="col-md-6 my-3 displayFlexColumn">
                        <label>Middle Name</label>
                        <input 
                            className="formInputBox" 
                            type="text" 
                            placeholder="Enter middle name"
                            onChange={(e) => onFieldChange('middle_Name__c',e.target.value)}
                            value={formData.middle_Name__c || ''}
                        />
                        {errors.middle_Name__c && (
                            <div className="text-label-red text-small"><b>{errors.middle_Name__c}</b></div>
                        )}
                    </div>
                    <div className="col-md-6 my-3 displayFlexColumn">
                        <label>Last Name</label>
                        <input 
                            className="formInputBox" 
                            type="text" 
                            placeholder="Enter last name*"
                            onChange={(e) => onFieldChange('last_Name__c',e.target.value)}
                            value={formData.last_Name__c || ''}
                        />
                        {errors.last_Name__c && (
                            <div className="text-label-red text-small"><b>{errors.last_Name__c}</b></div>
                        )}
                    </div>
                    {adminView && 
                        <div className="col-md-6 my-3 displayFlexColumn">
                            <label>Contact Type</label>
                            <Dropdown
                                buttonLabel=""
                                buttonText={formData.contact_Type__c?formData.contact_Type__c.replaceAll('_',' '):"Select contact type*"}
                                isRequired=""
                                content={
                                    <>
                                        {CONTACT_TYPE?.map((st) => (
                                            <DropdownItem key={st?.value} onClick={() => {
                                                console.log('select cont type'+st.label);
                                                onFieldChange('contact_Type__c',st.value);
                                            }}>{st?.label}</DropdownItem>
                                        ))}
                                    </>
                                }
                                customCls="dropdown-btn max-width_90 bg_white box-shadow_none"
                                hoverable={false}
                            />
                            {errors.contact_Type__c && 
                                <div className="text-label-red text-small"><b>{errors.contact_Type__c}</b></div>
                            }
                        </div>
                    }
                    <div className="col-md-6 my-3 displayFlexColumn">
                        <label>Phone</label>
                        <input 
                            className="formInputBox" 
                            type="phone" 
                            placeholder="Enter phone"
                            onChange={(e) => onFieldChange('phone__c',e.target.value)}
                            value={formData.phone__c || ''}
                        />
                        {errors.phone__c && (
                            <div className="text-label-red text-small"><b>{errors.phone__c}</b></div>
                        )}
                    </div>
                    <div className="col-md-6 my-3 displayFlexColumn">
                        <label>Email</label>
                        <input 
                            className="formInputBox" 
                            type="email" 
                            placeholder="Enter email*"
                            onChange={(e) => onFieldChange('email__c',e.target.value)}
                            value={formData.email__c || ''}
                        />
                        {errors.email__c && (
                            <div className="text-label-red text-small"><b>{errors.email__c}</b></div>
                        )}
                    </div>
                    <div className="col-md-6 my-3 displayFlexColumn">
                        <label>Date of Birth</label>
                        <input 
                            className="formInputBox" 
                            type="date" 
                            placeholder="Enter date of birth"
                            onChange={(e) => onFieldChange('date_Of_Birth__c',e.target.value)}
                            value={
                                formData.date_Of_Birth__c
                                ? formData.date_Of_Birth__c.split('T')[0]
                                : ''
                            }
                        />
                        {errors.date_Of_Birth__c && (
                            <div className="text-label-red text-small"><b>{errors.date_Of_Birth__c}</b></div>
                        )}
                    </div>
                    <div className="col-md-6 my-3 displayFlexColumn">
                        <label>Gender</label>
                        <Dropdown
                            buttonLabel=""
                            buttonText={formData.gender__c?formData.gender__c.replaceAll('_',' '):"Select gender"}
                            isRequired=""
                            content={
                                <>
                                    {GENDER?.map((st) => (
                                        <DropdownItem key={st?.value} onClick={() => {
                                            console.log('select gender'+st.label);
                                            onFieldChange('gender__c',st.value);
                                        }}>{st?.label}</DropdownItem>
                                    ))}
                                </>
                            }
                            customCls="dropdown-btn max-width_90 bg_white box-shadow_none"
                            hoverable={false}
                        />
                        {errors.gender__c && 
                            <div className="text-label-red text-small"><b>{errors.gender__c}</b></div>
                        }
                    </div>
                    {adminView && 
                        <div className="col-md-6 my-3 displayFlexColumn">
                            <label>Activation Status</label>
                            <input 
                                type="checkbox" 
                                onChange={(e) => onFieldChange('active__c',e.target.checked)}
                                checked={formData.active__c || false}
                            />
                            {errors.active__c && 
                                <div className="text-label-red text-small"><b>{errors.active__c}</b></div>
                            }
                        </div>
                    }
                </>  
            }
            {mode==='view' && 
                <>
                    <div className="cls_adm_rec_page_body_col col-md-2">
                        <div className="cls_adm_rec_page_body_col_cnt">
                            <div className="cls_adm_rec_page_body_col_lbl">First Name</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                {formData.first_Name__c}
                                <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                            </div>
                        </div>
                        <hr className="line_SN width_90"></hr>
                    </div>
                    <div className="cls_adm_rec_page_body_col col-md-2">
                        <div className="cls_adm_rec_page_body_col_cnt">
                            <div className="cls_adm_rec_page_body_col_lbl">Middle Name</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                {formData.middle_Name__c}
                                <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                            </div>
                        </div>
                        <hr className="line_SN width_90"></hr>
                    </div>
                    <div className="cls_adm_rec_page_body_col col-md-2">
                        <div className="cls_adm_rec_page_body_col_cnt">
                            <div className="cls_adm_rec_page_body_col_lbl">Last Name</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                {formData.last_Name__c}
                                <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                            </div>
                        </div>
                        <hr className="line_SN width_90"></hr>
                    </div>
                    {adminView && 
                        <div className="cls_adm_rec_page_body_col col-md-2">
                            <div className="cls_adm_rec_page_body_col_cnt">
                                <div className="cls_adm_rec_page_body_col_lbl">Contact Type</div>
                                <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                    onEditClick();
                                }}>
                                    {formData.contact_Type__c.replaceAll('_',' ')}
                                    <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                                </div>
                            </div>
                            <hr className="line_SN width_90"></hr>
                        </div>
                    }
                    <div className="cls_adm_rec_page_body_col col-md-2">
                        <div className="cls_adm_rec_page_body_col_cnt">
                            <div className="cls_adm_rec_page_body_col_lbl">Phone</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                {formData.phone__c}
                                <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                            </div>
                        </div>
                        <hr className="line_SN width_90"></hr>
                    </div>
                    <div className="cls_adm_rec_page_body_col col-md-2">
                        <div className="cls_adm_rec_page_body_col_cnt">
                            <div className="cls_adm_rec_page_body_col_lbl">Email</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                {formData.email__c}
                                <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                            </div>
                        </div>
                        <hr className="line_SN width_90"></hr>
                    </div>
                    <div className="cls_adm_rec_page_body_col col-md-2">
                        <div className="cls_adm_rec_page_body_col_cnt">
                            <div className="cls_adm_rec_page_body_col_lbl">Date of Birth</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                {
                                    formData?.date_Of_Birth__c
                                        ? new Date(formData.date_Of_Birth__c)
                                            .toLocaleDateString("en-GB")
                                        : ""
                                }
                                <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                            </div>
                        </div>
                        <hr className="line_SN width_90"></hr>
                    </div>
                    <div className="cls_adm_rec_page_body_col col-md-2">
                        <div className="cls_adm_rec_page_body_col_cnt">
                            <div className="cls_adm_rec_page_body_col_lbl">Gender</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                {formData.gender__c}
                                <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                            </div>
                        </div>
                        <hr className="line_SN width_90"></hr>
                    </div>
                    {adminView && 
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
                    }
                </>
            }
        </div>
    );
};
export default HCContactDetail;