import React, { useState } from "react";
import Dropdown from "../components/HCDropdown";
import MultiSelectDropdwon from "../components/HCMultiSelectDropdown";
import ic_edit from '../images/edit.WebP';
import DropdownItem from "../components/HCDropdownItem";
import '../styles/HCAdminCommon.css';

const HCSchoolDetail = ({ formData,showStatus,onFieldChange,onArrayChange,errors={},mode='view',onEditClick }) => {

    const BOARDS = [
        {
            label: 'CBSE',
            value: 'CBSE'
        },
        {
            label: 'ICSE',
            value: 'ICSE'
        },
        {
            label: 'State',
            value: 'State'
        },
        {
            label: 'IB',
            value: 'IB'
        },
        {
            label: 'CISCE',
            value: 'CISCE'
        }
    ];
    const OWNERSHIP_TYPES = [
        {
            label: 'Government',
            value: 'Government'
        },
        {
            label: 'Private',
            value: 'Private'
        },
        {
            label: 'International',
            value: 'International'
        }
    ];
    const TYPES = [
        {
            label: 'Day',
            value: 'Day'
        },
        {
            label: 'Boarding',
            value: 'Boarding'
        },
        {
            label: 'Online',
            value: 'Online'
        }
    ];
    const COEDTYPES = [
        {
            label: 'Boys Only',
            value: 'Boys_Only'
        },
        {
            label: 'Girls Only',
            value: 'Girls_Only'
        },
        {
            label: 'Co-Ed',
            value: 'Co_Ed'
        }
    ];
    const MEDIUMS = [
        {
            label: 'English',
            value: 'English'
        },
        {
            label: 'Hindi',
            value: 'Hindi'
        },
        {
            label: 'Bengali',
            value: 'Bengali'
        }
    ];
    const CLASSES = [
        {
            label: 'Play Group',
            value: 'Play_Group'
        },
        {
            label: 'Pre-Nursery',
            value: 'Pre_Nursery'
        },
        {
            label: 'Nursery',
            value: 'Nursery'
        },
        {
            label: 'LKG',
            value: 'LKG'
        },
        {
            label: 'UKG',
            value: 'UKG'
        },
        {
            label: 'Class 1',
            value: 'Class_1'
        },
        {
            label: 'Class 2',
            value: 'Class_2'
        },
        {
            label: 'Class 3',
            value: 'Class_3'
        },
        {
            label: 'Class 4',
            value: 'Class_4'
        },
        {
            label: 'Class 5',
            value: 'Class_5'
        },
        {
            label: 'Class 6',
            value: 'Class_6'
        },
        {
            label: 'Class 7',
            value: 'Class_7'
        },
        {
            label: 'Class 8',
            value: 'Class_8'
        },
        {
            label: 'Class 9',
            value: 'Class_9'
        },
        {
            label: 'Class 10',
            value: 'Class_10'
        },
        {
            label: 'Class 11',
            value: 'Class_11'
        },
        {
            label: 'Class 12',
            value: 'Class_12'
        }
    ];
    const FACILITIES = [
        {
            label: 'Playground',
            value: 'Playground'
        },
        {
            label: 'Library',
            value: 'Library'
        },
        {
            label: 'Computer Lab',
            value: 'Computer_Lab'
        },
        {
            label: 'Swimming Pool',
            value: 'Swimming_Pool'
        },
        {
            label: 'Canteen',
            value: 'Canteen'
        },
        {
            label: 'Sports Complex',
            value: 'Sports_Complex'
        },
        {
            label: 'Horse Riding',
            value: 'Horse_Riding'
        }
    ];
    const ADMISSION_STATUS = [
        {
            label: 'On-Going',
            value: 'Ongoing'
        },
        {
            label: 'Closed',
            value: 'Closed'
        }
    ];
    const APPROVAL_STATUS = [
        {
            label: 'Approved',
            value: 'Approved'
        },
        {
            label: 'Not Approved',
            value: 'Not_Approved'
        }
    ];
    return(
        <div className="cls_adm_form-row_hcpas">
            {mode==='edit' && 
                <>
                    <div className="col-md-6 my-3 displayFlexColumn">
                        <label>School Name</label>
                        <input 
                            className="formInputBox" 
                            type="text" 
                            placeholder="Enter school name*"
                            onChange={(e) => onFieldChange('school_Name__c',e.target.value)}
                            value={formData.school_Name__c || ''}
                        />
                        {errors.school_Name__c && (
                            <div className="text-label-red text-small"><b>{errors.school_Name__c}</b></div>
                        )}
                    </div>
                    <div className="col-md-6 my-3 displayFlexColumn">
                        <label>Board</label>
                        <Dropdown
                            buttonLabel=""
                            buttonText={formData.board__c?formData.board__c:"Select board*"}
                            isRequired=""
                            content={
                                <>
                                    {BOARDS?.map((brd) => (
                                        <DropdownItem key={brd?.value} onClick={() => {
                                            console.log('select loc type'+brd.label);
                                            onFieldChange('board__c',brd.value);
                                        }}>{brd?.label}</DropdownItem>
                                    ))}
                                </>
                            }
                            customCls="dropdown-btn max-width_90 bg_white box-shadow_none"
                            hoverable={false}
                        />
                        {errors.board__c && 
                            <div className="text-label-red text-small"><b>{errors.board__c}</b></div>
                        }
                    </div> 
                    <div className="col-md-6 my-3 displayFlexColumn">
                        <label>Ownership Type</label>
                        <Dropdown
                            buttonLabel=""
                            buttonText={formData.ownership_Type__c?formData.ownership_Type__c:"Select ownership type*"}
                            isRequired=""
                            content={
                                <>
                                    {OWNERSHIP_TYPES?.map((ot) => (
                                        <DropdownItem key={ot?.value} onClick={() => {
                                            console.log('select loc type'+ot.label);
                                            onFieldChange('ownership_Type__c',ot.value);
                                        }}>{ot?.label}</DropdownItem>
                                    ))}
                                </>
                            }
                            customCls="dropdown-btn max-width_90 bg_white box-shadow_none"
                            hoverable={false}
                        />
                        {errors.ownership_Type__c &&
                            <div className="text-label-red text-small"><b>{errors.ownership_Type__c}</b></div>
                        }
                    </div>
                    <div className="col-md-6 my-3 displayFlexColumn">
                        <label>Mode of Schooling</label>
                        <Dropdown
                            buttonLabel=""
                            buttonText={formData.type__c?formData.type__c:"Select schooling mode*"}
                            isRequired=""
                            content={
                                <>
                                    {TYPES?.map((tp) => (
                                        <DropdownItem key={tp?.value} onClick={() => {
                                            console.log('select mode type'+tp.label);
                                            onFieldChange('type__c',tp.value);
                                        }}>{tp?.label}</DropdownItem>
                                    ))}
                                </>
                            }
                            customCls="dropdown-btn max-width_90 bg_white box-shadow_none"
                            hoverable={false}
                        />
                        {errors.type__c && 
                            <div className="text-label-red text-small"><b>{errors.type__c}</b></div>
                        }
                    </div>
                    <div className="col-md-6 my-3 displayFlexColumn">
                        <label>Min Monthly fees</label>
                        <input 
                            className="formInputBox" 
                            type="number" 
                            placeholder="Enter minimium monthly fees*"
                            onChange={(e) => onFieldChange('fee_Monthly_Min__c',e.target.value)}
                            value={formData.fee_Monthly_Min__c}
                        />
                        {errors.fee_Monthly_Min__c && 
                            <div className="text-label-red text-small"><b>{errors.fee_Monthly_Min__c}</b></div>
                        }
                    </div>
                    <div className="col-md-6 my-3 displayFlexColumn">
                        <label>Co-Ed Status</label>
                        <Dropdown
                            buttonLabel=""
                            buttonText={formData.co_Ed_Status__c?formData.co_Ed_Status__c:"Select co-ed status*"}
                            isRequired=""
                            content={
                                <>
                                    {COEDTYPES?.map((coed) => (
                                        <DropdownItem key={coed?.value} onClick={() => {
                                            console.log('select co-ed type'+coed.label);
                                            onFieldChange('co_Ed_Status__c',coed.value);
                                        }}>{coed?.label}</DropdownItem>
                                    ))}
                                </>
                            }
                            customCls="dropdown-btn max-width_90 bg_white box-shadow_none"
                            hoverable={false}
                        />
                        {errors.co_Ed_Status__c && 
                            <div className="text-label-red text-small"><b>{errors.co_Ed_Status__c}</b></div>
                        }
                    </div>
                    <div className="col-md-6 my-3 displayFlexColumn">
                        <label>Medium of Instruction</label>
                        <Dropdown
                            buttonLabel=""
                            buttonText={formData.medium_Instruction__c?formData.medium_Instruction__c:"Select medium of instruction*"}
                            isRequired=""
                            content={
                                <>
                                    {MEDIUMS?.map((med) => (
                                        <DropdownItem key={med?.value} onClick={() => {
                                            console.log('select medium'+med.label);
                                            onFieldChange('medium_Instruction__c',med.value);
                                        }}>{med?.label}</DropdownItem>
                                    ))}
                                </>
                            }
                            customCls="dropdown-btn max-width_90 bg_white box-shadow_none"
                            hoverable={false}
                        />
                        {errors.medium_Instruction__c && 
                            <div className="text-label-red text-small"><b>{errors.medium_Instruction__c}</b></div>
                        }
                    </div>
                    <div className="col-md-6 my-3 displayFlexColumn">
                        <label>Classes</label>
                        <MultiSelectDropdwon
                            buttonLabel=""
                            buttonText={formData.classes__c?.length>0 ? CLASSES.filter(c => formData.classes__c.includes(c.value)).map(c => c.label).join(", ") : "Select classes*"}
                            isRequired=""
                            content={
                                <>
                                    {CLASSES?.map((cls) => (
                                        <DropdownItem 
                                            key={cls?.value} 
                                            onClick={() => {
                                                console.log('select class'+cls.label);
                                                const current = formData.classes__c || [];
                                                const exists = current.includes(cls.value);
                                                const next = exists
                                                    ? current.filter(v => v !== cls.value)
                                                    : [...current, cls.value];
                                                onArrayChange('classes__c',next);
                                            }}
                                            selected={formData.classes__c?.includes(cls.value)}
                                            showCheckbox={true}
                                        >{cls?.label}</DropdownItem>
                                    ))}
                                </>
                            }
                            customCls="dropdown-btn max-width_90 bg_white box-shadow_none"
                            hoverable={false}
                        />
                        {errors.classes__c && 
                            <div className="text-label-red text-small"><b>{errors.classes__c}</b></div>
                        }
                    </div>
                    <div className="col-md-6 my-3 displayFlexColumn">
                        <label>Age criteria minimum</label>
                        <input 
                            className="formInputBox" 
                            type="number" 
                            placeholder="Enter minimium age*"
                            onChange={(e) => onFieldChange('age_Criteria_Min__c',e.target.value)}
                            value={formData.age_Criteria_Min__c}
                        />
                    </div>
                    <div className="col-md-6 my-3 displayFlexColumn">
                        <label>Age criteria maximum</label>
                        <input 
                            className="formInputBox" 
                            type="number" 
                            placeholder="Enter maximum age*"
                            onChange={(e) => onFieldChange('age_Criteria_Max__c',e.target.value)}
                            value={formData.age_Criteria_Max__c}
                        />
                    </div>
                    <div className="col-md-6 my-3 displayFlexColumn">
                        <label>Facilities</label>
                        <MultiSelectDropdwon
                            buttonLabel=""
                            buttonText={formData.facilities__c?.length>0 ? FACILITIES.filter(f => formData.facilities__c.includes(f.value)).map(f => f.label).join(", ") : "Select facilities*"}
                            isRequired=""
                            content={
                                <>
                                    {FACILITIES?.map((fac) => (
                                        <DropdownItem 
                                            key={fac?.value} 
                                            onClick={() => {
                                                console.log('select facility'+fac.label);
                                                const current = formData.facilities__c || [];
                                                const exists = current.includes(fac.value);
                                                const next = exists
                                                    ? current.filter(v => v !== fac.value)
                                                    : [...current, fac.value];
                                                onArrayChange('facilities__c',next);
                                            }}
                                            selected={formData.facilities__c?.includes(fac.value)}
                                            showCheckbox={true}
                                        >{fac?.label}</DropdownItem>
                                    ))}
                                </>
                            }
                            customCls="dropdown-btn max-width_90 bg_white box-shadow_none"
                            hoverable={false}
                        />
                        {errors.facilities__c && 
                            <div className="text-label-red text-small"><b>{errors.facilities__c}</b></div>
                        }
                    </div>
                    <div className="col-md-6 my-3 displayFlexColumn">
                        <label>Admission Status</label>
                        <Dropdown
                            buttonLabel=""
                            buttonText={formData.admission_Status__c?formData.admission_Status__c:"Select admission status*"}
                            isRequired=""
                            content={
                                <>
                                    {ADMISSION_STATUS?.map((adm) => (
                                        <DropdownItem key={adm?.value} onClick={() => {
                                            console.log('select admission status'+adm.label);
                                            onFieldChange('admission_Status__c',adm.value);
                                        }}>{adm?.label}</DropdownItem>
                                    ))}
                                </>
                            }
                            customCls="dropdown-btn max-width_90 bg_white box-shadow_none"
                            hoverable={false}
                        />
                        {errors.admission_Status__c && 
                            <div className="text-label-red text-small"><b>{errors.admission_Status__c}</b></div>
                        }
                    </div>
                    {showStatus &&
                        <div className="col-md-6 my-3 displayFlexColumn">
                            <label>Activation Status</label>
                            <Dropdown
                                buttonLabel=""
                                buttonText={formData.approval_Status__c?formData.approval_Status__c:"Select approval status*"}
                                isRequired=""
                                content={
                                    <>
                                        {APPROVAL_STATUS?.map((apv) => (
                                            <DropdownItem key={apv?.value} onClick={() => {
                                                console.log('select approval status'+apv.label);
                                                onFieldChange('approval_Status__c',apv.value);
                                            }}>{apv?.label}</DropdownItem>
                                        ))}
                                    </>
                                }
                                customCls="dropdown-btn max-width_90 bg_white box-shadow_none"
                                hoverable={false}
                            />
                            {errors.approval_Status__c && 
                                <div className="text-label-red text-small"><b>{errors.approval_Status__c}</b></div>
                            }
                        </div>
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
                    </div>
                </>  
            }
            {mode==='view' && 
                <>
                    <div className="cls_adm_rec_page_body_col col-md-2">
                        <div className="cls_adm_rec_page_body_col_cnt">
                            <div className="cls_adm_rec_page_body_col_lbl">School Name</div>
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
                            <div className="cls_adm_rec_page_body_col_lbl">Board</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                {formData.board__c}
                                <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                            </div>
                        </div>
                        <hr className="line_SN width_90"></hr>
                    </div>
                    <div className="cls_adm_rec_page_body_col col-md-2">
                        <div className="cls_adm_rec_page_body_col_cnt">
                            <div className="cls_adm_rec_page_body_col_lbl">Ownership Type</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                {formData.ownership_Type__c}
                                <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                            </div>
                        </div>
                        <hr className="line_SN width_90"></hr>
                    </div>
                    <div className="cls_adm_rec_page_body_col col-md-2">
                        <div className="cls_adm_rec_page_body_col_cnt">
                            <div className="cls_adm_rec_page_body_col_lbl">Mode of schooling</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                {formData.type__c}
                                <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                            </div>
                        </div>
                        <hr className="line_SN width_90"></hr>
                    </div>
                    <div className="cls_adm_rec_page_body_col col-md-2">
                        <div className="cls_adm_rec_page_body_col_cnt">
                            <div className="cls_adm_rec_page_body_col_lbl">Min Monthly fees</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                {formData.fee_Monthly_Min__c}
                                <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                            </div>
                        </div>
                        <hr className="line_SN width_90"></hr>
                    </div>
                    <div className="cls_adm_rec_page_body_col col-md-2">
                        <div className="cls_adm_rec_page_body_col_cnt">
                            <div className="cls_adm_rec_page_body_col_lbl">Co-Ed Status</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                {formData.co_Ed_Status__c}
                                <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                            </div>
                        </div>
                        <hr className="line_SN width_90"></hr>
                    </div>
                    <div className="cls_adm_rec_page_body_col col-md-2">
                        <div className="cls_adm_rec_page_body_col_cnt">
                            <div className="cls_adm_rec_page_body_col_lbl">Medium of Instruction</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                {formData.medium_Instruction__c}
                                <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                            </div>
                        </div>
                        <hr className="line_SN width_90"></hr>
                    </div>
                    <div className="cls_adm_rec_page_body_col col-md-2">
                        <div className="cls_adm_rec_page_body_col_cnt">
                            <div className="cls_adm_rec_page_body_col_lbl">Classes</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                <div className="cls_classes_badges">
                                            {(formData?.classes__c || []).map((cls, idx) => (
                                                <span key={idx} className="cls_class_chip">
                                                    {cls}
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
                            <div className="cls_adm_rec_page_body_col_lbl">Age criteria minimum</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                {formData.age_Criteria_Min__c}
                                <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                            </div>
                        </div>
                        <hr className="line_SN width_90"></hr>
                    </div>
                    <div className="cls_adm_rec_page_body_col col-md-2">
                        <div className="cls_adm_rec_page_body_col_cnt">
                            <div className="cls_adm_rec_page_body_col_lbl">Age criteria maximum</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                {formData.age_Criteria_Max__c}
                                <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                            </div>
                        </div>
                        <hr className="line_SN width_90"></hr>
                    </div>
                    <div className="cls_adm_rec_page_body_col col-md-2">
                        <div className="cls_adm_rec_page_body_col_cnt">
                            <div className="cls_adm_rec_page_body_col_lbl">Facilities</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                <div className="cls_classes_badges">
                                            {(formData?.facilities__c || []).map((fac, idx) => (
                                                <span key={idx} className="cls_class_chip">
                                                    {fac}
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
                            <div className="cls_adm_rec_page_body_col_lbl">Admission Status</div>
                            <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                onEditClick();
                            }}>
                                {formData.admission_Status__c}
                                <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                            </div>
                        </div>
                        <hr className="line_SN width_90"></hr>
                    </div>
                    {showStatus && 
                        <div className="cls_adm_rec_page_body_col col-md-2">
                            <div className="cls_adm_rec_page_body_col_cnt">
                                <div className="cls_adm_rec_page_body_col_lbl">Activation Status</div>
                                <div className="cls_adm_rec_page_body_col_val" onDoubleClick={() => {
                                    onEditClick();
                                }}>
                                    {formData.approval_Status__c}
                                    <img src={ic_edit} alt="edit" className="edit_img" onClick={() => onEditClick()}></img>
                                </div>
                            </div>
                            <hr className="line_SN width_90"></hr>
                        </div>
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
export default HCSchoolDetail;