import React, { useEffect, useState } from "react";
import "../styles/HCLocationSearchModal.css";
import HCModal from "../components/HCModal";
import ic_radar from "../images/radar.WebP";
import ic_kolkata from "../images/kolkata.WebP";
import ic_chennai from "../images/chennai.WebP";
import ic_delhi from "../images/delhi.WebP";
import ic_mumbai from "../images/mumbai.WebP";
import ic_hyderabad from "../images/hyderabad.WebP";
import ic_bengaluru from "../images/bengaluru.WebP";

const HCLocationSearchModal = ({ showLocModal, onClose, onCitySelect }) => {
    const [viewAll,setViewAll] = useState(false);
    const [allCities,setAllCities] = useState([]);
    const [isDetecting,setIsDetecting] = useState(false);
    const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_KEY;
    const CITIES = [
        { label: "Kolkata", img: ic_kolkata },
        { label: "Chennai", img: ic_chennai },
        { label: "Delhi", img: ic_delhi },
        { label: "Mumbai", img: ic_mumbai },
        { label: "Hyderabad", img: ic_hyderabad },
        { label: "Bengaluru", img: ic_bengaluru }
    ];

    useEffect(() => {
        const fetchCities = async () => {
            try{
                const resp = await fetch('/api/city/', {
                    method: 'GET',
                    headers: {
                        'content-type' : 'application/json'
                    }
                });
                const json = await resp.json();
                if(!resp.ok){
                    console.log('ERROR in fetch all cities>',json);
                }
                else{
                    setAllCities(json);
                }
            }catch(error){
                console.log('ERROR in fetch all cities for a state>',JSON.stringify(error));
            }
        };
        fetchCities();
    },[]);

    const handleDetectGeoLoc = async () => {
        try{
            if(!navigator.geolocation){
                alert('Geolocation not supported by this browser');
                return;
            }
            setIsDetecting(true);
            const position = await new Promise((resolve,reject) => {
                navigator.geolocation.getCurrentPosition(resolve,reject, {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 60000
                });
            });
            const { latitude, longitude } = position.coords;
            const city = await reverseGeocode(latitude, longitude);
            onCitySelect(city);
            onClose();
        }catch(error){
            console.error('Geolocation error:', error);
            if (error.code === 1) {
                alert('Location access denied. Please enable location permissions.');
            } else {
                alert('Unable to detect location. Please search manually.');
            }
        }finally{
            setIsDetecting(false);
        }
    };
    const reverseGeocode = async (lat, lng) => {
        //const resp = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`);
        const resp = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
        const data = await resp.json();
        console.log('resp>>>',JSON.stringify(data));
        /* const city = data.results[0]?.address_components
                     ?.find(comp => comp.types.includes('locality'))?.long_name || 
                     data.results[0]?.address_components
                     ?.find(comp => comp.types.includes('administrative_area_level_2'))?.long_name
                     || 'Unknown City';
        return city; */
        return data.address?.city || 
                data.address?.town || 
                data.address?.village || 
                data.address?.["state_district"] || 
                data.display_name.split(',')[0] || 
                'Unknown City';
    };

    return(
        <HCModal isOpen={showLocModal} onClose={onClose} clsModalContent="cls_modal_content_locmod">
            <div className="cls_prnt_locmod">
                <div className="search-container_locmod">
                    <span className="search-icon_locmod">🔍</span>
                    <input
                        type="text"
                        placeholder="Find your city…"
                        className="search-input_locmod"
                    />
                </div>
                <div className="cls_dtct_locmod" onClick={handleDetectGeoLoc}>
                    <img src={ic_radar} alt="detect" className="cls_radaricon_locmod" />
                    {isDetecting ? 'Detecting...' : 'Detect my Location'}
                </div>
                <div className="cls_fullWidth_locmod"></div>
                {/* <hr className="cls_fullwidth_locmod"/> */}
                <div className="cls_cities_cnt_locmod">
                    <span className="cls_center cls_justify_center text-label_small">Popular cities</span>
                    <div className="cls_city_prnt_locmod">
                        {CITIES.map((city,index) => (
                            <div key={index}
                                className="cls_city_cnt" 
                                onClick={() => {
                                        onCitySelect(city.label);
                                        onClose();
                                    }}>
                                    <img key={index} src={city.img} alt={city.label} className="cls_cityIcon_locmod" />
                                    <span className="text-label_small">{city.label}</span>
                            </div>
                        ))}
                    </div>
                    <span className="cls_viewall_locmod cls_center cls_justify_center text-label_small" onClick={() => setViewAll(true)}>View All cities</span>
                    {viewAll &&
                        <div>
                            {allCities.map((city,index) => (
                                <div key={index} 
                                    className="cls_allcity_cnt" 
                                    onClick={() => {
                                        onCitySelect(city.name__c);
                                        onClose();
                                    }}>
                                    <span key={index} className="cls_txthover">{city.name__c}</span>
                                </div>
                            ))}
                            <span className="cls_txthover" 
                                onClick={() => {
                                    onCitySelect('All');
                                    onClose();
                                }}>
                                    All Cities
                            </span>
                        </div>
                    }
                </div>
            </div>
        </HCModal>
    );
};
export default HCLocationSearchModal;