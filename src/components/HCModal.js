import React from "react";
import '../styles/HCModal.css';


const HCModal = (props) => {
    const { isOpen,onClose,logo,title,children, clsModalContent = "modal-content" } = props;
    if(!isOpen) return null;

    return(
        <div className="modal-overlay">
            <div className={clsModalContent}>
                <div className="cls_mod_head">
                    {logo && 
                        <img src={logo} className="cls_logo"/>
                    }
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>
                {title && 
                    <span className="cls_txt_head padding_btm_5 text-center">{title}</span>
                }
                {children}
            </div>
        </div>
    );
};

export default HCModal;