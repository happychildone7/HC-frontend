import React from "react";
import "../styles/HCAmemitiesSection.css";
import ic_computer from "../images/computer.WebP";
import ic_playground from "../images/ground.WebP";
import ic_library from "../images/library.WebP";
import ic_canteen from "../images/canteen.WebP";
import ic_pool from "../images/pool.WebP";
import ic_sportscomplex from "../images/sportscomplex.WebP";
import ic_horse from "../images/horse.WebP";
import ic_auditoriumIcon from "../images/auditoriumIcon.WebP";
import ic_transportIcon from "../images/transportIcon.WebP";
import ic_acIcon from "../images/acIcon.WebP";
import ic_outdoorIcon from "../images/outdoorIcon.WebP";
import ic_stageIcon from "../images/stageIcon.WebP";
import ic_sportsGroundIcon from "../images/sportsComplexIcon.WebP";
import ic_refreshmentIcon from "../images/canteenIcon.WebP";
import ic_parkingIcon from "../images/parkingIcon.WebP";
import ic_certificateIcon from "../images/certificateIcon.WebP";
import ic_right from "../images/right.WebP";
import ic_wrong from "../images/wrong.WebP";

const HCAmenitiesSection = ({ facilities = [], allAmenities = [], source = 'school' }) => {
    const amenitiesIcons = source === 'school' ? 
        {
            'Playground' : ic_playground,
            'Library' : ic_library,
            'Computer_Lab' : ic_computer,
            'Swimming_Pool' : ic_pool,
            'Canteen' : ic_canteen,
            'Sports_Complex' : ic_sportscomplex,
            'Horse_Riding' : ic_horse
        } 
        : source === 'event' ? 
        {
            'Auditorium': ic_auditoriumIcon,
            'Transport': ic_transportIcon, 
            'AC_Hall': ic_acIcon,
            'Outdoor_Venue': ic_outdoorIcon,
            'Stage': ic_stageIcon,
            'Sports_Ground': ic_sportsGroundIcon,
            'Refreshments': ic_refreshmentIcon,
            'Parking': ic_parkingIcon,
            'Certificates': ic_certificateIcon,
        }
        : 
        {};
    return(
        <section className="cls_amenities_sctn">
            <h3>Facilities Available</h3>
            <div className="cls_amenities_stats">
                <div className="cls_stat_card">
                    <div className="cls_stat_number">
                        {Math.round((facilities.length / allAmenities.length) * 100)}%
                    </div>
                    <div className="cls_stat_label">
                        {facilities.length}/{allAmenities.length} Facilities
                    </div>
                </div>
            </div>
            <div className="cls_amenities_grid">
                {allAmenities.map((amenity,index) => {
                    const icon = amenitiesIcons[amenity] || '●';
                    const isAvailable = facilities.includes(amenity);

                    return (
                        <div key={index} className="cls_amenity_item">
                            <div className="cls_amenity_icon">
                                <img src={icon} alt="icn"></img>
                            </div>
                            <div className="cls_amenity_name">
                                {amenity.replace('_', ' ')}
                            </div>
                            <div className="cls_amenity_status">
                                {isAvailable ? 
                                    (<img src={ic_right} alt="check" className="cls_icn_asc" />) 
                                    : 
                                    (<img src={ic_wrong} alt="uncheck" className="cls_icn_asc" />)
                                }
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};  
export default HCAmenitiesSection;