import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HCEventDetail from "../common/HCEventDetail";
import HCImageDetail from "../common/HCImageDetail";
import '../styles/HCEventDetailPage.css';
import { Link } from "react-router-dom";
import HCShareIcon from "../components/HCShareIcon";
import ic_map from "../images/map.WebP";
import ic_navigation from "../images/navigation.WebP";
import ic_auditoriumIcon from "../images/auditoriumIcon.WebP";
import ic_transportIcon from "../images/transportIcon.WebP";
import ic_acIcon from "../images/acIcon.WebP";
import ic_outdoorIcon from "../images/outdoorIcon.WebP";
import ic_stageIcon from "../images/stageIcon.WebP";
import ic_sportsGroundIcon from "../images/sportsComplexIcon.WebP";
import ic_refreshmentIcon from "../images/canteenIcon.WebP";
import ic_parkingIcon from "../images/parkingIcon.WebP";
import ic_certificateIcon from "../images/certificateIcon.WebP";
import ic_defaultImg from "../images/defaultImg.WebP";
import HCClassesSection from "../common/HCClassesSection";
import HCAmenitiesSection from "../common/HCAmenitiesSection";
import HCMapPicker from "../components/HCMapPicker";
import Button from "../components/HCButton";
import HCCountDown from "../components/HCCountDown";
import HCRSVPModal from "../common/HCRSVPModal";
import { createWishlist } from "../utils/services";
import { useAuth } from "../auth/useAuth";
import { toast } from "react-toastify";
import { API_BASE } from "../utils/config";

const HCEventDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event,setEvent] = useState(null);
    const [isEventStarted,setIsEventStarted] = useState(false);
    const [loading,setLoading] = useState(true);
    const detailRef = useRef(null);
    const amenitiesRef = useRef(null);
    const mapRef = useRef(null);
    const [activeSection,setActiveSection] = useState('detail');
    const GOOGLE_MAPS_KEY = process.env.REACT_APP_GOOGLE_MAPS_KEY;
    const [showRSVPModal,setShowRSVPModal] = useState(false);
    const { user,contact } = useAuth();
    console.log('user =>', user);
    console.log('contact =>', contact);
    const allAmenities = [ 
        'Auditorium', 'Transport', 'AC_Hall', 'Outdoor_Venue', 'Stage', 'Sports_Ground', 
        'Refreshments', 'Parking', 'Transport', 'Certificates'
    ];
    const amenityIcons = {
        'Auditorium': ic_auditoriumIcon,
        'Transport': ic_transportIcon, 
        'AC_Hall': ic_acIcon,
        'Outdoor_Venue': ic_outdoorIcon,
        'Stage': ic_stageIcon,
        'Sports_Ground': ic_sportsGroundIcon,
        'Refreshments': ic_refreshmentIcon,
        'Parking': ic_parkingIcon,
        'Certificates': ic_certificateIcon,
        default: '🏫'
    };

    const loc = event?.location__c || {};
    const stats = {
        type: event?.event_Type__c || '',
        format: event?.format__c || '',
        duration: event?.duration_Hours__c || 0,
        capacity: event?.capacity__c || 0
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.3, rootMargin: '-20% 0px -40% 0px' }
        );
        detailRef.current && observer.observe(detailRef.current);
        amenitiesRef.current && observer.observe(amenitiesRef.current);
        mapRef.current && observer.observe(mapRef.current);

        return () => observer.disconnect();
    }, []);
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                setLoading(true);
                const resp = await fetch(`${API_BASE}/api/event/${id}`);
                const data = await resp.json();
                console.log('dt>>',data);
                setEvent(data);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchEvent();
    },[id]);
    useEffect(() => {
        if (event && event.event_Date__c && event.event_Start_Time__c) {
            const eventDate = new Date(event.event_Date__c);

            const [hours, minutes] = event.event_Start_Time__c.split(":");

            eventDate.setHours(parseInt(hours, 10));
            eventDate.setMinutes(parseInt(minutes, 10));
            eventDate.setSeconds(0);
            const checkEventStatus = () => {
                setIsEventStarted(new Date() > eventDate);
            };

            checkEventStatus();

            const interval = setInterval(checkEventStatus, 1000);

            return () => clearInterval(interval);
        }
    }, [event]);

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
    const onCloseRSVPModal = () => {
        setShowRSVPModal(false);
    };
    const handleWishlist = async() => {
        try{
            if (!contact?._id) {
                toast.error('Unable to determine contact.');
                return;
            }
            await createWishlist({
                contactId: contact._id,
                relatedId: event._id,
                relatedCode: event.event_Code__c,
                relatedType: 'Event'
            });
        }catch(err){

        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (!event) return <div>Event not found</div>;
    return(
        <div className="cls_cnt_scdt">
            <div className="cls_bg_scdt" style={{
                backgroundImage: `url(${event?.images?.[0]?.url || '/placeholder-event.jpg'})`
            }}>
                <div className="cls_text_smallwhite_scdt"><b><Link to = "/" className="emailLinkWhite">Home</Link> » <Link to = "/event" className="emailLinkWhite">Events</Link> </b></div>
                <div className="cls_text_large_scdt"><b>{event.Name__c}</b></div>
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
                            <Button myclass="cls_hdr_btn secondary" ariaLabel="Share this Event" onClick="">
                                📤 
                            </Button>
                            <Button myclass="cls_hdr_btn secondary" ariaLabel="Add to favourites" onClick={handleWishlist}>
                                ❤️ 
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="cls_flx_row gap_2">
                    <div className="event-sidebar">
                        <div className="cls_sidebar_childcnt1_evdt">
                            <div className="event-meta">
                                <div className="event-date">
                                    📅 {event.event_Date__c 
                                        ? new Date(event.event_Date__c).toLocaleDateString('en-GB') 
                                        : 'TBA'}
                                </div>
                                <div className="event-time">🕒 {event.event_Start_Time__c}</div>
                                <div>
                                    <HCCountDown startDate={event.event_Date__c} startTime={event.event_Start_Time__c} />
                                </div>
                                <div className="capacity-bar">
                                    <div 
                                        className="capacity-fill" 
                                        style={{ 
                                        width: `${(event.registered_Count__c / event.capacity__c) * 100}%` 
                                        }}
                                    />
                                    <span>{event.registered_Count__c}/{event.capacity__c} spots</span>
                                </div>
                                <div className="rsvp-status">{event.registered_Count__c || 0} Registered</div>
                            </div>
                            <Button 
                                myclass={isEventStarted ? "disabled-input" :"rsvp-btn primary"}
                                isDisabled={isEventStarted} 
                                onClick={() => setShowRSVPModal(true)}
                            >
                                RSVP Now
                            </Button>
                        </div>
                        <div className="cls_sidebar_childcnt1_evdt">
                            <div className="cls_sidbr_item_wrap_evdt">
                                {activeSection === 'detail' && <div className="active-line">|</div>}
                                <span 
                                    className={`cls_sidebar_label_evdt ${activeSection === 'detail' ? 'active' : ''}`} 
                                    onClick={() => {
                                        detailRef.current?.scrollIntoView({
                                            behavior: 'smooth',
                                            block: 'start'
                                        });
                                        setActiveSection('detail');
                                    }}
                                >
                                    Event Detail
                                </span>
                            </div>
                            <div className="cls_sidbr_item_wrap_evdt">
                                {activeSection === 'amenities' && <div className="active-line">|</div>}
                                <span 
                                    className={`cls_sidebar_label_evdt ${activeSection === 'amenities' ? 'active' : ''}`} 
                                    onClick={() => {
                                        amenitiesRef.current?.scrollIntoView({
                                            behavior: 'smooth',
                                            block: 'start'
                                        });
                                        setActiveSection('amenities');
                                    }}
                                >
                                    Facilities Available
                                </span>
                            </div>
                            <div className="cls_sidbr_item_wrap_evdt">
                                {activeSection === 'map' && <div className="active-line">|</div>}
                                <span 
                                    className={`cls_sidebar_label_evdt ${activeSection === 'map' ? 'active' : ''}`} 
                                    onClick={() => {
                                        mapRef.current?.scrollIntoView({
                                            behavior: 'smooth',
                                            block: 'start'
                                        });
                                        setActiveSection('map');
                                    }}
                                >
                                    Location
                                </span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <section className="hero-section" ref={detailRef}>
                            <div className="cls_flx_row cls_center gap_2">
                                <h1>{event.Name__c}</h1> 
                                <HCShareIcon imgCls="cls_share_img_evdt" contCls="cls_share_cnt_evdt" />
                            </div>
                            <div className="hero-content">
                                <div className="cls_left_cnt_scdt">
                                    <div className="cls_img_wrap_scdt">
                                        <div className="cls_imgHolder_prim_scdt">
                                            <img src={event.images?.[0]?.url || '/placeholder-Event.jpg'} alt={event.Name__c} />
                                        </div>
                                        <div className="cls_img_wrap_right_scdt">
                                            <div className="cls_imgHolder_scdt">
                                                <img src={event.images?.[1]?.url || ic_defaultImg} alt={event.Name__c} />
                                            </div>
                                            <div className="cls_imgHolder_scdt">
                                                <img src={event.images?.[2]?.url || ic_defaultImg} alt={event.Name__c} />
                                            </div> 
                                        </div>
                                    </div>
                                    <div className="cls_desc_cnt_scdt">
                                        <h1>About Event</h1>
                                        <h2>{event.description__c}</h2>
                                        <div className="cls_desc_amn_scdt">
                                            <span className="text-med cls_font_700">Amenities</span>
                                            <div className="cls_desc_amn_prev">
                                                {event.amenities__c?.slice(0,3).map((amn,index) => (
                                                    <div key={index} className="cls_desc_amn_prev_item">
                                                        <img src={amenityIcons[amn]} className="cls_desc_amn_icn" alt="icnn" />
                                                        <span className="cls_desc_amn_name">{amn.replace('_',' ')}</span>
                                                    </div>
                                                ))}
                                                {event.amenities__c?.length > 3 && 
                                                    <span onClick={seeMoreHandle} style={{ cursor: "pointer" }} className="text-small text-label-Blue cls_see_more_btn">+{event.amenities__c?.length - 3} see more</span>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="cls_right_cnt_scdt">
                                    <div className="hero-info">
                                        <div className="event-code">{event.event_Code__c}</div>
                                        <div className="stats-grid">
                                            <div className="stat-item">
                                                <div className="stat-label">Event Type</div>
                                                <div className="stat-value">{stats.type}</div>
                                            </div>
                                            <div className="stat-item">
                                                <div className="stat-label">Format</div>
                                                <div className="stat-value">{stats.format}</div>
                                            </div>
                                            <div className="stat-item">
                                                <div className="stat-label">Duration (hours)</div>
                                                <div className="stat-value">{stats.duration}</div>
                                            </div>
                                            <div className="stat-item">
                                                <div className="stat-label">Capacity</div>
                                                <div className="stat-value">{stats.capacity}</div>
                                            </div>
                                        </div>
                                        <button className="inquire-btn">Inquire Now</button>
                                    </div>
                                    <div className="cls_loc_cnt_scdt">
                                        <img src={ic_map} alt="map" className="cls_map_icn_scdt" />
                                        <div className="cls_center cls_flx_row">
                                            <span className="text-small">{event.location__c?.location_Name__c}</span>,&nbsp;
                                            <span className="text-small">{event.location__c?.state__c}</span>
                                        </div>
                                        <div className="cls_loc_cnt_viwmap_scdt"> 
                                            <span onClick={viewMapHandle} className="cursor_pointer text-small cls_font_700 text-label-Blue">View on map</span>
                                            <img src={ic_navigation} alt='navigate' className="cls_navigate_sdct" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <div ref={amenitiesRef}><HCAmenitiesSection facilities={event.amenities__c} allAmenities={allAmenities} source="event" /></div>
                        <div className="cls_map_sctn_scdt" ref={mapRef}>
                            <h3>Location</h3>
                            <h4><b>Address:&nbsp;</b>{event.location__c?.line1__c},&nbsp;
                                {event.location__c?.line2__c && `${event.location__c.line2__c}, `}&nbsp;
                                {event.location__c?.city__c},&nbsp;
                                {event.location__c?.state__c},&nbsp;
                                {event.location__c?.pin__c}
                            </h4>
                            <div className="coords-map-wrapper">
                                <HCMapPicker 
                                    apiKey={GOOGLE_MAPS_KEY} 
                                    value={event.location__c?.coordinates__c?.coordinates ? {lat : event.location__c?.coordinates__c?.coordinates[1], lng : event.location__c?.coordinates__c.coordinates[0]} : null} 
                                    zoom={15} 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <HCRSVPModal showRSVPModal={showRSVPModal} onClose={onCloseRSVPModal} event={event} />
        </div>
    );
};
export default HCEventDetailPage;