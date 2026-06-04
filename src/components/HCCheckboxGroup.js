import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import '../styles/HCCheckboxGroup.css';

const HCCheckboxGroup = ({ filterLabel, filterOptions, selectedFilters, handleFilterChange }) => {
    const [isFilterOpen,setIsFilterOpen] = useState(true);
    const [showMore,setShowMore] = useState(true);
    return(
        <div className="hc-filter-option collapsible-header">
            <div onClick={() => setIsFilterOpen(!isFilterOpen)} className="hc-filter-label">
                <span>{filterLabel}</span>
                {isFilterOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {isFilterOpen && (
                <div className="hc-filter-val-sctn">
                    {filterOptions.length <= 3 && 
                        <div className="hc-filter-options-list">
                            {filterOptions.slice(0, 3).map((opt, index) => (
                                <label key={index} className="hc-checkbox-label">
                                    <input 
                                        type="checkbox" 
                                        value={opt}
                                        checked={selectedFilters.includes(opt)}
                                        onChange={() => handleFilterChange(opt)}
                                    />
                                    {opt}
                                </label>
                            ))}
                        </div>
                    }
                    {(filterOptions.length > 3) && showMore && 
                        <>
                            <div className="hc-filter-options-list">
                                {filterOptions.slice(0, 3).map((opt, index) => (
                                    <label key={index} className="hc-checkbox-label">
                                        <input 
                                            type="checkbox" 
                                            value={opt}
                                            checked={selectedFilters.includes(opt)}
                                            onChange={() => handleFilterChange(opt)}
                                        />
                                        {opt}
                                    </label>
                                ))}
                            </div>
                            <div className="hc-showmore" onClick={() => setShowMore(!showMore)}>+show more</div>
                        </>
                    }
                    {(filterOptions.length > 3) && !showMore && 
                        <>
                            <div className="hc-filter-options-list">
                                {filterOptions.map((opt, index) => (
                                    <label key={index} className="hc-checkbox-label">
                                        <input 
                                            type="checkbox" 
                                            value={opt}
                                            checked={selectedFilters.includes(opt)}
                                            onChange={() => handleFilterChange(opt)}
                                        />
                                        {opt}
                                    </label>
                                ))}
                            </div>
                            <div className="hc-showmore" onClick={() => setShowMore(!showMore)}>+show less</div>
                        </>
                    }
                </div>
            )}
        </div>
    );
};
export default HCCheckboxGroup;