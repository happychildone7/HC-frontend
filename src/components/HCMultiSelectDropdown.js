import { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "../styles/HCDropdown.css"; // reuse same styles

const HCMultiSelectDropdown = ({ buttonLabel, buttonText, isRequired, content, customCls, hoverable = false }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!hoverable && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (!hoverable) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      if (!hoverable) {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    };
  }, [hoverable]);

  const handleMouseEnter = () => {
    if (hoverable) setOpen(true);
  };

  const handleMouseLeave = () => {
    if (hoverable) setOpen(false);
  };

  const handleClick = () => {
    if (!hoverable) setOpen(prev => !prev);
  };

  return (
    <div className="dropdown-wrapper" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} ref={dropdownRef}>
      <span className={`custom-combobox-label ${isRequired === "true" ? "required" : ""}`}>
        {buttonLabel}
      </span>

      <div className={`${customCls ? customCls : "dropdown-btn"} ${open ? "button-open" : ""}`} onClick={handleClick}>
        {buttonText}
        <span className="toggle-icon">
          {open ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </div>

      <div className={`dropdown-content ${open ? "show" : "hide"}`}>
        {content}
      </div>
    </div>
  );
};

export default HCMultiSelectDropdown;
