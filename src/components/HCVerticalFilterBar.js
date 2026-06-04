import React from "react";
import '../styles/HCVerticalFilterBar.css';
import HCCheckboxGroup from "./HCCheckboxGroup";

const HCVerticalFilterBar = ({ filterConfig=[], onFilterChange }) => {
    
    const handleFilterChange = (key, val) => {
        if(onFilterChange)onFilterChange(key,val);
    };
    
    return(
        <div className="hc-filter-bar">
            <div className="hc-filter-header">
               🎯 Filters
            </div>
            <div className="">
                {filterConfig.map(({ key, label, options, selectedValues }) => (
                    <HCCheckboxGroup 
                        key={key}
                        filterLabel={label} 
                        filterOptions={options} 
                        selectedFilters={selectedValues} 
                        handleFilterChange={(val) => handleFilterChange(key,val)} 
                    /> 
                ))}
            </div>
            <div className="hc-filter-option">
                Monthly Fees
            </div>
        </div>
    );
};
export default HCVerticalFilterBar;