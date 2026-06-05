import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HCSchoolDetail from "../common/HCSchoolDetail";
import HCImageDetail from "../common/HCImageDetail";
import '../styles/HCSchoolDetailPage.css';
import { Link } from "react-router-dom";
import ic_map from "../images/map.WebP";
import ic_navigation from "../images/navigation.WebP";
import ic_computerIcon from "../images/computerIcon.WebP";
import ic_libraryIcon from "../images/libraryIcon.WebP";
import ic_canteenIcon from "../images/canteenIcon.WebP";
import ic_playgroundIcon from "../images/playgroundIcon.WebP";
import ic_sportsComplexIcon from "../images/sportsComplexIcon.WebP";
import ic_swimmingPoolIcon from "../images/swimmingPoolIcon.WebP";
import ic_acIcon from "../images/acIcon.WebP";
import ic_defaultImg from "../images/defaultImg.WebP";
import HCClassesSection from "../common/HCClassesSection";
import HCAmenitiesSection from "../common/HCAmenitiesSection";
import HCMapPicker from "../components/HCMapPicker";
import Button from "../components/HCButton";
import { API_BASE } from "../utils/config";

const HCSchoolDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [school, setSchool] = useState(null);
    const [loading, setLoading] = useState(true);
    const amenitiesRef = useRef(null);
    const mapRef = useRef(null);
    const GOOGLE_MAPS_KEY = process.env.REACT_APP_GOOGLE_MAPS_KEY;
    const allAmenities = [
        'Computer_Lab', 'Library', 'Playground', 'Canteen', 'Sports_Complex',
        'Swimming_Pool', 'Auditorium', 'Transport', 'AC_Classes', 'Smart_Classes', 'Horse_Riding'
    ];
    const facilityIcons = {
        'Computer_Lab': ic_computerIcon,
        'Library': ic_libraryIcon, 
        'Playground': ic_playgroundIcon,
        'Canteen': ic_canteenIcon,
        'Sports_Complex': ic_sportsComplexIcon,
        'Swimming_Pool': ic_swimmingPoolIcon,
        'AC_Classes': ic_acIcon,
        default: '🏫'
    };

    const loc = school?.location__c || {};
    const stats = {
        ownership: school?.ownership_Type__c || 'Private',
        board: school?.board__c || 'CBSE',
        coed: school?.co_Ed_Status__c || 'Co-Ed',
        campusType: loc?.location_Type__c || 'Urban'
    };

    useEffect(() => {
        const fetchSchool = async () => {
            try {
                setLoading(true);
                const resp = await fetch(`${API_BASE}/api/school/${id}`);
                const data = await resp.json();
                console.log('dt>>',data);
                setSchool(data);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchSchool();
    },[id]);

    const seeMoreHandle = () => {
        amenitiesRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };
    const viewMapHandle = () => {
        mapRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    if (loading) return <div className="loading">Loading...</div>;
    if (!school) return <div>School not found</div>;
    return(
        <div className="cls_cnt_scdt">
            <div className="cls_bg_scdt" style={{
                backgroundImage: `url(${school?.images?.[0]?.url || '/placeholder-school.jpg'})`
            }}>
                <div className="cls_text_smallwhite_scdt"><b><Link to = "/" className="emailLinkWhite">Home</Link> » <Link to = "/school" className="emailLinkWhite">Schools</Link> </b></div>
                <div className="cls_text_large_scdt"><b>{school.Name__c}</b></div>
            </div>
            <div className="cls_dtl_scn_scdt">
                <div className="cls_btn_hdr_scdt">
                    <Button myclass="back-btn" onClick={() => navigate(-1)}>
                        ← Back
                    </Button>
                    <div className="cls_action_btn_hdr_scdt">
                        <Button myclass="cls_hdr_btn primary">📞 Inquire Now</Button>
                        <div className="cls_hdr_btn_group">
                            <Button myclass="cls_hdr_btn secondary" ariaLabel="Write a Review">⭐</Button>
                            <Button myclass="cls_hdr_btn secondary" ariaLabel="Share this School" onClick="">
                                📤 
                            </Button>
                            <Button myclass="cls_hdr_btn secondary" ariaLabel="Add to favourites" onClick="">
                                ❤️ 
                            </Button>
                        </div>
                    </div>
                </div>
                <section className="hero-section">
                    <h1>{school.Name__c}</h1>
                    <div className="hero-content">
                        <div className="cls_left_cnt_scdt">
                            <div className="cls_img_wrap_scdt">
                                <div className="cls_imgHolder_prim_scdt">
                                    <img src={school.images?.[0]?.url || '/placeholder-school.jpg'} alt={school.Name__c} />
                                </div>
                                <div className="cls_img_wrap_right_scdt">
                                    <div className="cls_imgHolder_scdt">
                                        <img src={school.images?.[1]?.url || ic_defaultImg} alt={school.Name__c} />
                                    </div>
                                    <div className="cls_imgHolder_scdt">
                                        <img src={school.images?.[2]?.url || ic_defaultImg} alt={school.Name__c} />
                                    </div> 
                                </div>
                            </div>
                            <div className="cls_desc_cnt_scdt">
                                <h1>About School</h1>
                                <h2>{school.description__c}</h2>
                                <div className="cls_desc_amn_scdt">
                                    <span className="text-med cls_font_700">Amenities</span>
                                    <div className="cls_desc_amn_prev">
                                        {school.facilities__c?.slice(0,3).map((fac,index) => (
                                            <div key={index} className="cls_desc_amn_prev_item">
                                                <img src={facilityIcons[fac]} className="cls_desc_amn_icn" alt="icnn" />
                                                <span className="cls_desc_amn_name">{fac.replace('_',' ')}</span>
                                            </div>
                                        ))}
                                        {school.facilities__c?.length > 3 && 
                                            <span onClick={seeMoreHandle} style={{ cursor: "pointer" }} className="text-small text-label-Blue cls_see_more_btn">+{school.facilities__c?.length - 3} see more</span>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="cls_right_cnt_scdt">
                            <div className="hero-info">
                                <div className="school-code">{school.school_Code__c}</div>
                                <div className="stats-grid_sc">
                                    <div className="stat-item">
                                        <div className="stat-label">Ownership</div>
                                        <div className="stat-value">{stats.ownership}</div>
                                    </div>
                                    <div className="stat-item">
                                        <div className="stat-label">Board</div>
                                        <div className="stat-value">{stats.board}</div>
                                    </div>
                                    <div className="stat-item">
                                        <div className="stat-label">Co-Ed</div>
                                        <div className="stat-value">{stats.coed.replace('_',' ')}</div>
                                    </div>
                                    <div className="stat-item">
                                        <div className="stat-label">Campus</div>
                                        <div className="stat-value">{stats.campusType}</div>
                                    </div>
                                </div>
                                <button className="inquire-btn">Inquire Now</button>
                            </div>
                            <div className="cls_loc_cnt_scdt">
                                <img src={ic_map} alt="map" className="cls_map_icn_scdt" />
                                <div className="cls_center cls_flx_row">
                                    <span className="text-small cls_font_700">{school.location__c?.location_Name__c}</span>,&nbsp;
                                    <span className="text-small cls_font_700">{school.location__c?.state__c}</span>
                                </div>
                                <div className="cls_loc_cnt_viwmap_scdt"> 
                                    <span onClick={viewMapHandle} className="cursor_pointer text-small cls_font_700 text-label-Blue">View on map</span>
                                    <img src={ic_navigation} alt='navigate' className="cls_navigate_sdct" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <HCClassesSection classes={school.classes__c} />
                <div ref={amenitiesRef}><HCAmenitiesSection facilities={school.facilities__c} allAmenities={allAmenities} /></div>
                <div className="cls_map_sctn_scdt" ref={mapRef}>
                    <h3>Location</h3>
                    <h4><b>Address:&nbsp;</b>{school.location__c?.line1__c},&nbsp;
                        {school.location__c?.line2__c && `${school.location__c.line2__c}, `}&nbsp;
                        {school.location__c?.city__c},&nbsp;
                        {school.location__c.state__c},&nbsp;
                        {school.location__c?.pin__c}
                    </h4>
                    <div className="coords-map-wrapper">
                        <HCMapPicker 
                            apiKey={GOOGLE_MAPS_KEY} 
                            value={school.location__c?.coordinates__c?.coordinates ? {lat : school.location__c?.coordinates__c?.coordinates[1], lng : school.location__c?.coordinates__c.coordinates[0]} : null} 
                            zoom={15} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default HCSchoolDetailPage;