import React from 'react';

const HCButton = (props) => {
    const { children,myclass,onClick,ariaLabel,isDisabled } = props
    return(
        <button 
            className={myclass} 
            onClick={onClick} 
            aria-label={ariaLabel} 
            title={ariaLabel}
            disabled={isDisabled}
        >
            {children}
        </button>
    )
}
export default HCButton;