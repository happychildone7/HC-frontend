import React from "react";
import Cropper from "react-easy-crop";
import "../styles/HCImageCropper.css";
import HCButton from "./HCButton";

const HCImageCropper = ({ cropImage, crop, zoom, setCrop, setZoom, onCropCancel, onUploadComplete, images, saving }) => {
    return (
        <div className="cls_crop_wrapper">
            <div className="cls_crop_container">
                <Cropper
                    image={cropImage}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    cropShape="round"
                    showGrid={true}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                />
            </div>
            <div className="cls_crop_controls">
                <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.1}
                    value={zoom}
                    onChange={(e) => setZoom(e.target.value)}
                />
            </div>
            <div className="cls_crop_actions">
                <HCButton
                    myclass="buttonWhite"
                    onClick={onCropCancel}
                >
                    Cancel
                </HCButton>
                <HCButton
                    myclass="buttonBlue"
                    onClick={() => {
                        onUploadComplete(images);
                    }}
                    disabled={saving}
                >
                    {saving ? "Saving..." : "Save"}
                    {saving &&
                        <span className="loader"></span>
                    }
                </HCButton>
            </div>
        </div>
    );
};
export default HCImageCropper;