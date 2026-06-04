import React, { useEffect, useState, useCallback } from "react";
import HCFileUpload from "../components/HCFileUpload";
import ic_edit from '../images/edit.WebP';
import '../styles/HCImageDetail.css';

const HCImageDetail = ({ 
  images = [],  
  mode = 'view', 
  onUploadComplete, 
  maxFiles = 10,
  label,
  onEditClick 
}) => {
  
  return (
    <div className="cls_adm_form-row_hcpas">
      {mode === 'edit' && (
        <div className="col-md-12 my-3 displayFlexColumn">
          <label>{label}</label>
          <HCFileUpload 
            savedImages={images}  
            onUploadComplete={onUploadComplete}
            maxFiles={maxFiles}
            profileMode={false}
          />
        </div>
      )}
      {mode === 'view' && (
        <div className="cls_adm_rec_page_body_col col-md-12">
          <div className="cls_adm_rec_page_body_col_cnt"> 
            <div className="cls_adm_rec_page_body_col_lbl">Images</div>
            <div className="cls_adm_rec_page_body_col_val gap_2" onDoubleClick={() => {}}>
              <div className="cls_images_grid_id">
                {images.length > 0 ? (
                  images.map((img, idx) => (
                    <div key={img.id || img.publicId || idx} className="cls_image_thumb_id">
                      <img 
                        src={img.url || img.previewUrl}
                        alt={`School image ${idx + 1}`}
                        className="cls_thumb_img_id"
                      />
                      {img.primary && (
                        <span className="cls_primary_badge_id">Primary</span>
                      )}
                    </div>
                  ))
                ) : (
                  <span className="cls_no_images_id">No Images</span>
                )}
              </div>
              <img 
                src={ic_edit} 
                className="edit_img" 
                alt="edit" 
                onClick={onEditClick} 
              />
            </div>
            <hr className="line_SN width_100" />
          </div>
        </div>
      )}
    </div>
  );
};

export default HCImageDetail;
