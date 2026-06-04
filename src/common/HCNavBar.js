import { useEffect, useState } from "react";
import "../styles/HCNavBar.css";
import Dropdown from '../components/HCDropdown.js';
import DropdownItem from '../components/HCDropdownItem.js';
import ic_loc from "../images/gps.WebP";
import ic_gps from '../images/gpscolor.WebP';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import HCLocationSearchModal from "./HCLocationSearchModal.js";

const HCNavBar = ({ onChange }) => {
  const [selectedCity,setSelectedCity] = useState("All");
  const [showLocModal,setShowLocModal] = useState(false);
  const CITY = [
    {
      label: "All",
      value: "All"
    },
    {
      label: "Noida",
      value: "Noida"
    },
    {
      label: "Delhi",
      value: "Delhi"
    },
    {
      label: "Gurgaon",
      value: "Gurgaon"
    },
    {
      label: "Durgapur",
      value: "Durgapur"
    },
    {
      label: "Kolkata",
      value: "Kolkata"
    },
  ];

  useEffect(() => {
    if(onChange) onChange(selectedCity);
  },[selectedCity]);

  const onCloseLocModal = () => {
    setShowLocModal(false);
  };
  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  return (
    <div className="secondary-navbar">
      <div className="secondary-navbar__inner">
        <div className="cls_center gap_2 buttonWhiteSmoke" onClick={() => setShowLocModal(true)}>
          {!selectedCity && 
            <img src={ic_loc} alt="loc" className="cls_locicon_naba" />  
          }
          {selectedCity && 
            selectedCity
          }
          <div style={{marginLeft: ".5rem"}}>
            <FaChevronDown />
          </div>
        </div>
        <HCLocationSearchModal showLocModal={showLocModal} onClose={onCloseLocModal} onCitySelect={handleCitySelect}/>
        {/* Search Bar */}
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Find schools…"
            className="search-input"
          />
        </div>
      </div>
    </div>
  );
};
export default HCNavBar;