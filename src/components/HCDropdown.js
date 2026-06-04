import { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "../styles/HCDropdown.css";

const HCDropdown = ({ buttonLabel, buttonText, isRequired, content, customCls, hoverable,itemList, itemRefs}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  const typedText = useRef("");

  // Click outside to close (only for click-based dropdown)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (open && /^[a-zA-Z0-9 ]$/.test(e.key)) {
        typedText.current += e.key;
        if(itemList && itemRefs){
          const match = itemList.find((item) =>
            item.name.toLowerCase().startsWith(typedText.current.toLowerCase())
          );
          if (match && itemRefs.current[match.name]) {
            itemRefs.current[match.name].scrollIntoView({ behavior: "smooth", block: "nearest" });
          }
        }
        clearTimeout(typedText.currentTimeout);
        typedText.currentTimeout = setTimeout(() => {
          typedText.current = "";
        }, 1000);
      }
    };
    let handleClickOutside;
    if (!hoverable) {
      handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      if (!hoverable && handleClickOutside) {
        document.removeEventListener("mousedown", handleClickOutside);
      }
      document.removeEventListener("keydown", handleKeyDown);
    };
    
  }, [hoverable, open, itemList, itemRefs]);

  const handleMouseEnter = () => {
    if(hoverable){
      setOpen(true);
    }
  }
  const handleMouseLeave = () => {
    if(hoverable){
      setOpen(false)
    }
  };
  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  
  return (
    <div 
      className="dropdown-wrapper" 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      ref={dropdownRef}
    >
      <span className={`custom-combobox-label ${isRequired === "true" ? "required" : ""}`}>
        {buttonLabel}
      </span>

      <div
        className={`${customCls ? customCls : "dropdown-btn"} ${open ? "button-open" : ""}`}
      >
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

export default HCDropdown;
