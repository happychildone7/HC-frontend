import React, { useEffect, useState } from "react";
import HCNavBar from "../common/HCNavBar";
import '../styles/HCEvent.css';
import Dropdown from '../components/HCDropdown.js';
import DropdownItem from '../components/HCDropdownItem.js';
import HCHorizontalFilter from "../components/HCHorizontalFilter.js";
import HCRangeSelector from "../components/HCRangeSelector.js";
import HCDisplayFeatured from "../common/HCDisplayFeatured.js";
import HCDisplayAllEntities from "../common/HCDisplayAllEntities.js";
import HCVerticalFilterBar from "../components/HCVerticalFilterBar.js";
import { useNavigate } from "react-router-dom";

const HCEvent = () => {
    const navigate = useNavigate();
    const [board,setBoard] = useState(null);
    const [type,setType] = useState('Day');
    const [selectedCountry,setSelectedCountry] = useState('');
    const [selectedState,setSelectedState] = useState('');
    const [displayFeatured,setDisplayFeatured] = useState(false);
    const [featuredWrapper,setFeaturedWrapper] = useState([]);
    const [displayAllEvent,setDisplayAllEvent] = useState(false);
    const [eventsWrapper,setEventsWrapper] = useState([]);
    const [eventsWrapperMaster,setEventsWrapperMaster] = useState([]);
    const [filters,setFilters] = useState({
        eventType: [],
        feeRange: [],
        ageGroup: [],
        format: [],
        amenities: []
    });
    const filterConfig = [
        { key: 'eventType', label: 'Event Type', options: ["Annual Day", "Sports Day", "Cultural Fest", "Science Fair", "PTM", "Workshop", "Seminar", "Field Trip", "Talent_Show", "Quiz", "Festival", "Other"], selectedValues: filters.eventType },
        { key: 'feeRange', label: 'Fee Range', options: ["Free", "Low(₹0-500)", "Medium(₹500-2000)", "High(₹2000+)"], selectedValues: filters.feeRange },
        { key: 'ageGroup', label: 'Age Group', options: ["Playgroup-KG", "1-5", "6-10", "11-12", "All Ages"], selectedValues: filters.ageGroup },
        { key: 'format', label: 'Event Format', options: ["Online", "Offline", "Hybrid"], selectedValues: filters.format },
        { key: 'amenities', label: 'Event Amenities', options: ["AC Hall", "Outdoor Venue", "Stage", "Sports Ground", "Refreshments", "Parking", "Transport", "Certificates"], selectedValues: filters.amenities }
    ];

    const handleChangeLoc = (loc) => {
        const fetchEvents = async () => {
            const resp = await fetch(`/api/eventContent/fetchFeatured/?country=${selectedCountry}&state=${selectedState}&city=${loc}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'content-type' : 'application/json'
                }
            });
            const json = await resp.json();
            console.log('Events><><',json);
            if(resp.ok && json.events.length>0){
                setDisplayFeatured(true);
                setFeaturedWrapper(json.events);
            }
            else{
                setDisplayFeatured(false);
            }
            const resp1 = await fetch(`/api/eventContent/fetch/?country=${selectedCountry}&state=${selectedState}&city=${loc}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'content-type' : 'application/json'
                }
            });
            const json1 = await resp1.json();
            console.log('Events><><',json1);
            if(resp1.ok && json.events.length>0){
                setDisplayAllEvent(true);
                setEventsWrapper(json1.events);
                setEventsWrapperMaster(json1.events);
            } 
            else{
                setDisplayAllEvent(false);
            }
        }
        fetchEvents();
    };
    const handleChangeType = (type) => {
        setFilters(prev => ({
            ...prev,
            eventType: [type]
        }));
        setType(type);
    };
    const handleFeeChange = () => {

    };
    const handleSelectEvent = () => {

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
        navigate(`/event-detail/${entity.entityId}`);  
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });  
    };
    const formatImgTitle = (htmlString) => {
        let cleanText = htmlString.replace(/<[^>]*>/g, '').trim();
        
        // Remove "Event Date" prefix
        cleanText = cleanText.replace(/^Event Date\s*/, '').trim();
        
        // Get ONLY date part (first 4 words), add comma after day
        const dateParts = cleanText.split(' ').slice(0, 4);
        return `${dateParts[0]}, ${dateParts.slice(1).join(' ')}`;
    };
    const formatImgTitle4 = (htmlString) => {
        let cleanText = htmlString.replace(/<[^>]*>/g, '').trim();
        
        // Remove prefixes: "Event Date", "Event Type", etc.
        cleanText = cleanText.replace(/^(Event Date|Event Type)\s*/i, '').trim();
        
        // ✅ Remove underscores & replace with spaces
        cleanText = cleanText.replace(/_+/g, ' ').trim();
        
        // For dates: Add comma after day
        const datePattern = /^\w{3}\s\w{3}\s\d{2}\s\d{4}/;
        if (datePattern.test(cleanText)) {
            const dateParts = cleanText.split(' ').slice(0, 4);
            return `${dateParts[0]}, ${dateParts.slice(1).join(' ')}`;
        }
        
        return cleanText;
    };

    //vertical filters hook
    useEffect(() => {
        console.log('chc',filters);
        let eventsFilteredWrapper = eventsWrapperMaster;
        //filter by event type
        if(filters.eventType.length > 0){
            eventsFilteredWrapper = eventsFilteredWrapper.filter(event => 
                filters.eventType.some(et => 
                    event.entityBody6.toLowerCase().includes(et.toLowerCase())
                )
            );
        }
        //filter by fee range
        if(filters.feeRange.length > 0){
            eventsFilteredWrapper = eventsFilteredWrapper.filter(event => 
                filters.feeRange.some(fee => 
                    event.entityBody11.toLowerCase().includes(fee.toLowerCase())
                )
            );
        }
        //filter by age group
        if(filters.ageGroup.length > 0){
            eventsFilteredWrapper = eventsFilteredWrapper.filter(event => 
                filters.ageGroup.some(age => 
                    event.entityBody2.toLowerCase().includes(age.toLowerCase())
                )
            );
        }
        //filter by format
        if(filters.format.length > 0){
            eventsFilteredWrapper = eventsFilteredWrapper.filter(event => 
                filters.ownershipType.some(frm => 
                    event.entityBody4.toLowerCase().includes(frm.toLowerCase())
                )
            );
        }
        //filter by amenities
        if(filters.amenities.length > 0){
            eventsFilteredWrapper = eventsFilteredWrapper.filter(event => 
                filters.amenities.some(amn => 
                    event.entityBody7.toLowerCase().includes(amn.toLowerCase())
                )
            );
        }
       setEventsWrapper(eventsFilteredWrapper);
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
            <div className="cls_flx_row cls_main_2sec_cnt_ev">
                <HCVerticalFilterBar filterConfig={filterConfig} onFilterChange={(key,val) => handleVerticalFilterChange(key,val)}/>
                <div className="cls_crdsc_prnt_ev">
                    <div className="cls_fltr_cnt_ev">
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
                            <span className="cls_text_large_ev">Featured</span><br/><br/>
                            <div className="cls_ftrd_cnt_ev">
                                <HCDisplayFeatured 
                                    facilityWrapper={featuredWrapper} 
                                    handleClickSelect={handleSelectEvent} 
                                    showHeader={false} 
                                    cls_crd_prnt="cls_crd_prnt_ev" 
                                    featured={true} 
                                    ribbonText="Featured" 
                                    showImgTitle={true} 
                                />
                            </div>
                        </div>
                    }
                    {displayAllEvent && 
                        <div>
                            <span className="cls_text_large_ev">All Events</span><br/><br/>
                            <div className="cls_ftrd_cnt_ev">
                                <HCDisplayAllEntities 
                                    facilityWrapper={eventsWrapper} 
                                    handleClickSelect={handleSelectEvent} 
                                    showHeader={false} 
                                    cls_crd_prnt="cls_crd_prnt_ev" 
                                    cls_crd_cnt="cls_crd_cnt_ev" 
                                    cls_icon="cls_icon_ev" 
                                    imgTitle="eventTitle"
                                    showImgTitle="true"
                                    clsImgTitle="cls_img_title_ev"
                                    clsImgTitle2="cls_img_title2_ev"
                                    clsImgTitle3="text-label_small"
                                    clsImgTitle4="cls_img_title4_ev"
                                    formatImgTitle={formatImgTitle}
                                    formatImgTitle4={formatImgTitle4}
                                    cls_view_btn="cls_view_btn_ev" 
                                    handleViewDetails={handleViewDetails} 
                                    icnbcg="cls_scl_img" 
                                />
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};
export default HCEvent;