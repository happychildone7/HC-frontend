import React, { useEffect, useState } from "react";
import HCNavBar from "../common/HCNavBar";
import '../styles/HCSchool.css';
import Dropdown from '../components/HCDropdown.js';
import DropdownItem from '../components/HCDropdownItem.js';
import HCHorizontalFilter from "../components/HCHorizontalFilter.js";
import HCRangeSelector from "../components/HCRangeSelector.js";
import HCDisplayFeatured from "../common/HCDisplayFeatured.js";
import HCDisplayAllEntities from "../common/HCDisplayAllEntities.js";
import HCVerticalFilterBar from "../components/HCVerticalFilterBar.js";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../utils/config.js";

const HCSchool = () => {
    const navigate = useNavigate();
    const [board,setBoard] = useState(null);
    const [type,setType] = useState('Day');
    const [selectedCountry,setSelectedCountry] = useState('');
    const [selectedState,setSelectedState] = useState('');
    const [displayFeatured,setDisplayFeatured] = useState(false);
    const [featuredWrapper,setFeaturedWrapper] = useState([]);
    const [displayAllSchool,setDisplayAllSchool] = useState(false);
    const [schoolsWrapper,setSchoolsWrapper] = useState([]);
    const [schoolsWrapperMaster,setSchoolsWrapperMaster] = useState([]);
    const [filters,setFilters] = useState({
        board: [],
        class: [],
        admissionStatus: [],
        ownershipType: [],
        coedType: [],
        schoolType: [],
        medium: [],
        facilities: [],
    });
    const filterConfig = [
        { key: 'board', label: 'Board', options: ["CBSE", "ICSE", "IB", "State Board", "Cambridge"], selectedValues: filters.board },
        { key: 'class', label: 'Class', options: ["Play-Group", "Pre-Nursery", "Nursery", "LKG", "UKG", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"], selectedValues: filters.class },
        { key: 'admissionStatus', label: 'Admission Status', options: ["Ongoing", "Closed"], selectedValues: filters.admissionStatus },
        { key: 'ownershipType', label: 'Ownership Type', options: ["Government", "Private", "International"], selectedValues: filters.ownershipType },
        { key: 'coedType', label: 'Co-Ed Type', options: ["Boys Only", "Co-Ed", "Girls Only"], selectedValues: filters.coedType },
        { key: 'schoolType', label: 'School Type', options: ["Day", "Boarding", "Online"], selectedValues: filters.schoolType },
        { key: 'medium', label: 'Medium of Instruction', options: ["English", "Hindi", "Bengali"], selectedValues: filters.medium },
        { key: 'facilities', label: 'Facilities Available', options: ["Playground", "Library", "Computer Lab", "Swimming Pool", "Canteen", "Sports Complex", "Horse Riding"], selectedValues: filters.facilities }
    ];

    const handleChangeLoc = (loc) => {
        const fetchSchools = async () => {
            const resp = await fetch(`${API_BASE}/api/schoolContent/fetchFeatured/?country=${selectedCountry}&state=${selectedState}&city=${loc}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'content-type' : 'application/json'
                }
            });
            const json = await resp.json();
            console.log('schools><><',json);
            if(resp.ok && json.schools.length>0){
                setDisplayFeatured(true);
                setFeaturedWrapper(json.schools);
            }
            else{
                setDisplayFeatured(false);
            }
            const resp1 = await fetch(`${API_BASE}/api/schoolContent/fetch/?country=${selectedCountry}&state=${selectedState}&city=${loc}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'content-type' : 'application/json'
                }
            });
            const json1 = await resp1.json();
            console.log('schools><><',json1);
            if(resp1.ok && json.schools.length>0){
                setDisplayAllSchool(true);
                setSchoolsWrapper(json1.schools);
                setSchoolsWrapperMaster(json1.schools);
            } 
            else{
                setDisplayAllSchool(false);
            }
        }
        fetchSchools();
    };
    const handleChangeType = (type) => {
        setFilters(prev => ({
            ...prev,
            schoolType: [type]
        }));
        setType(type);
    };
    const handleFeeChange = () => {

    };
    const handleSelectSchool = () => {

    };
    const handleVerticalFilterChange = (key,val) => {
        setFilters(prev => ({
            ...prev,
            [key]: prev[key].includes(val)
                ? prev[key].filter(v => v !== val)
                : [...prev[key], val]
        }));
    };
    const handleViewDetails = (entity) => {
        console.log('Full entity:', entity);
        navigate(`/school-detail/${entity.entityId}`);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });    
    };

    //vertical filters hook
    useEffect(() => {
        console.log('chc',filters);
        let schoolsFilteredWrapper = schoolsWrapperMaster;
        //filter by board
        if(filters.board.length > 0){
            schoolsFilteredWrapper = schoolsFilteredWrapper.filter(school => 
                filters.board.some(board => 
                    school.entityBody6.toLowerCase().includes(board.toLowerCase())
                )
            );
        }
        //filter by class
        if(filters.class.length > 0){
            schoolsFilteredWrapper = schoolsFilteredWrapper.filter(school => 
                filters.class.some(cls => 
                    school.entityBody11.toLowerCase().includes(cls.toLowerCase())
                )
            );
        }
        //filter by Admission Status
        if(filters.admissionStatus.length > 0){
            schoolsFilteredWrapper = schoolsFilteredWrapper.filter(school => 
                filters.admissionStatus.some(admst => 
                    school.entityBody2.toLowerCase().includes(admst.toLowerCase())
                )
            );
        }
        //filter by Ownership Type
        if(filters.ownershipType.length > 0){
            schoolsFilteredWrapper = schoolsFilteredWrapper.filter(school => 
                filters.ownershipType.some(owner => 
                    school.entityBody4.toLowerCase().includes(owner.toLowerCase())
                )
            );
        }
        //filter by Co-Ed Type
        if(filters.coedType.length > 0){
            schoolsFilteredWrapper = schoolsFilteredWrapper.filter(school => 
                filters.coedType.some(coed => 
                    school.entityBody7.toLowerCase().includes(coed.toLowerCase())
                )
            );
        }
        //filter by School Type
        if(filters.schoolType.length > 0){
            schoolsFilteredWrapper = schoolsFilteredWrapper.filter(school => 
                filters.schoolType.some(sclType => 
                    school.entityBody8.toLowerCase().includes(sclType.toLowerCase())
                )
            );
        }
        //filter by Medium of Instruction
        if(filters.medium.length > 0){
            schoolsFilteredWrapper = schoolsFilteredWrapper.filter(school => 
                filters.medium.some(med => 
                    school.entityBody9.toLowerCase().includes(med.toLowerCase())
                )
            );
        }
        //filter by Facilities available
        if(filters.facilities.length > 0){
            schoolsFilteredWrapper = schoolsFilteredWrapper.filter(school => 
                filters.facilities.some(fac => 
                    school.entityBody10.toLowerCase().includes(fac.toLowerCase())
                )
            );
        }
       setSchoolsWrapper(schoolsFilteredWrapper);
    },[filters]);
    
    //Board Dropdown hook
    useEffect(() => {
        if(board){
            setFilters(prev => ({
                ...prev,
                board: [board]
            }));
        }
    },[board]);

    return(
        <div className="cls_wrap">
            <HCNavBar onChange={handleChangeLoc}/>
            <div className="cls_flx_row cls_main_2sec_cnt">
                <HCVerticalFilterBar filterConfig={filterConfig} onFilterChange={(key,val) => handleVerticalFilterChange(key,val)}/>
                <div className="cls_crdsc_prnt">
                    <div className="cls_fltr_cnt">
                        <Dropdown
                            buttonLabel=""
                            buttonText={board?board:"Board"}
                            isRequired="false"
                            customCls = "buttonWhiteSmoke"
                            content={
                                <>
                                    <DropdownItem key="cbse" customCls="my-dropdown-item" onClick={(event) => {
                                        setBoard(event.target.textContent);
                                    }}>CBSE
                                    </DropdownItem>
                                    <DropdownItem key="icse" customCls="my-dropdown-item" onClick={(event) => {
                                        setBoard(event.target.textContent);
                                    }}>ICSE
                                    </DropdownItem>
                                    <DropdownItem key="state" customCls="my-dropdown-item" onClick={(event) => {
                                        setBoard(event.target.textContent);
                                    }}>State
                                    </DropdownItem>
                                    <DropdownItem key="cisce" customCls="my-dropdown-item" onClick={(event) => {
                                        setBoard(event.target.textContent);
                                    }}>CISCE
                                    </DropdownItem>
                                </>
                            } 
                        />
                        <HCHorizontalFilter label="Type" options={["Day", "Boarding", "Online"]} value={type} onChange={handleChangeType} />
                        <HCRangeSelector value="1000" onChange={handleFeeChange} min="0" max="10000" />
                    </div>
                    {displayFeatured && 
                        <div>
                            <span className="cls_text_large">Featured</span><br/><br/>
                            <div className="cls_ftrd_cnt">
                                <HCDisplayFeatured facilityWrapper={featuredWrapper} handleClickSelect={handleSelectSchool} showHeader={false} cls_crd_prnt="cls_crd_prnt" featured={true} ribbonText="Featured" showImgTitle={true} />
                            </div>
                        </div>
                    }
                    {displayAllSchool && 
                        <div>
                            <span className="cls_text_large">All Schools</span><br/><br/>
                            <div className="cls_ftrd_cnt">
                                <HCDisplayAllEntities facilityWrapper={schoolsWrapper} handleClickSelect={handleSelectSchool} showHeader={false} crdbody="cls_crd_body" clsbodysectncnt="cls_body_sectn_cnt" cls_crd_prnt="cls_crd_prnt" cls_view_btn="cls_view_btn_sc" handleViewDetails={handleViewDetails} clsbodycnt="cls_body_cnt" icnbcg="cls_scl_img" />
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};
export default HCSchool;