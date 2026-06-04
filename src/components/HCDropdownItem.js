import React from "react";
import "../styles/HCDropdownItem.css";

const HCDropdownItem = React.forwardRef(({ children, onClick, customCls, selected, showCheckbox }, ref) => {
  return (
    <div className={`${customCls ? customCls : "dropdown-item"} ${selected ? "selected" : ""}`} ref={ref} onClick={onClick}>
      {showCheckbox && (
        <input 
          type="checkbox"
          checked={selected}
          readOnly
          style={{ marginRight: "0.5rem" }}
        />
      )}
      {children}
    </div>
  );
});

export default HCDropdownItem;