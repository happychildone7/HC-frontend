import React, { useState, useRef, useEffect } from "react";
import '../styles/HCFileUpload.css';
import ic_upload from '../images/upload.WebP';
import Button from "../components/HCButton";

import DustbinIcon from "../svgIcons/dustbinIcon";
import HCImageCropper from "./HCImageCropper";

const HCFileUpload = ({ savedImages,onUploadComplete, maxFiles, cls_upload_cnt="cls_upload_cnt", profileMode = false, onShowCropper, saving=false }) => {
    const [images,setImages] = useState(savedImages || []);
    const [uploading,setUploading] = useState(false);
    const [uploadError,setUploadError] = useState('');
    const fileInputRef = useRef(null);
    const [showCropper, setShowCropper] = useState(false);
    const [cropImage, setCropImage] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    const handleFileChange = async (e) => {
        const files = Array.from(e.target.files);
        if(!files) return;
        if(images.length + files.length > maxFiles){
            setUploadError(`Maximum ${maxFiles} images allowed.`);
            return;
        }
        const validFiles = files.filter(file => {
            if(!file.type.startsWith('image/')){
                setUploadError('Only image files are allowed.');
                return false;
            }
            if(file.size > 2 * 1024 * 1024) {
                setUploadError('Each image must be less than 2 MB.');
                return false;
            }
            return true;
        });
        if(validFiles.length === 0) return;
        setUploading(true);
        setUploadError('');
        try{
            const formData = new FormData();
            validFiles.forEach(file => {
                formData.append('images', file);
            });

            const resp = await fetch('/api/fileUpload/upload', {
                method: 'POST',
                body: formData,
                header: {
                    'content-type' : 'multipart/form-data'
                }
            });
            const json = await resp.json();
            if(!resp.ok){
                setUploadError('Error occured while uploading images.');
            }
            if(resp.ok){
                const uploadedImages = json.imageUrls.map((url,i) => ({
                    id: json.publicIds[i],
                    url: url,
                    previewUrl: url,
                    primary: images.length === 0 && i === 0
                }));
                if(profileMode){
                    setCropImage(uploadedImages[0].url);
                    setShowCropper(true);
                    setImages(uploadedImages);
                    if(onShowCropper) onShowCropper();
                }else{
                    setImages([...images,...uploadedImages]);
                    onUploadComplete([...images,...uploadedImages]);
                }
                setUploadError('');
            }
        }catch(error){
            setUploadError(error.response?.data?.error || 'Upload failed.');
        }finally{
            setUploading(false);
        }
    }
    const removeImage = async (index) => {
        const imageToDelete = images[index];
        if(!imageToDelete) return;
        const updatedImages = images.filter((_,i) => i!==index);
        setImages(updatedImages);
        onUploadComplete(updatedImages);
        console.log('checkkimg123>>'+JSON.stringify({ publicIds: [imageToDelete.id] }));
        try{
            await fetch('/api/fileUpload/cleanUp', {
                method: 'POST',
                body: JSON.stringify({ publicIds: [imageToDelete.id] }),
                headers: {
                    'content-type' : 'application/json'
                }
            });
        }catch(error){
            console.log('cleanup remove failed.', error);
        }
    };
    const handleBrowseClick = (e) => {
        e.preventDefault();
        fileInputRef.current?.click();
    };
    const setPrimaryImage = (index) => {
        setImages((prev) => {
            const updated = prev.map((img,i) => ({
                ...img,
                primary: i===index
            }));
            onUploadComplete(updated);
            return updated;
        });
    };
    const handleCropCancel = () => {
        removeImage(0);
        setShowCropper(false);
        setCropImage(null);
        setImages([]);
    };

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if(!images.length) return;
            const payload = JSON.stringify({
                    publicIds: images.map(img => img.id)
                });
            navigator.sendBeacon('/api/fileUpload/cleanUp', new Blob([payload], { type: 'application/json' }));
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            /* if(images.length){
                console.log('checkkimg>>'+JSON.stringify({ publicIds: images.map(img => img.id) }));
                const payload = JSON.stringify({
                    publicIds: images.map(img => img.id)
                });
                navigator.sendBeacon('/api/fileUpload/cleanUp', new Blob([payload], { type: 'application/json' }));
            } */
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [images]);

    return(
        <div className={cls_upload_cnt}>
            {(!profileMode || !showCropper) &&
                <div className="cls_upload_left">
                    <label htmlFor="imageInput" className="cls_upload_inp_wrap">
                        <img src={ic_upload} alt='upload_img' className="cls_upld_icn"></img>
                        <span className="cls_upload_label">
                            {uploading ? 'Uploading..' : (
                                <div className="cls_upld_lbl_hdr">
                                    <span>Drag and drop files here</span>
                                    <span>- OR -</span>
                                    <Button myclass="cls_btn_browse" 
                                            onClick={handleBrowseClick}>
                                        Browse
                                    </Button>
                                </div>
                            )}
                        </span>
                        <span className="cls_upload_hint">
                            Up to {maxFiles} images (JPG/PNG max 2MB each)
                        </span>
                        <input 
                            type="file" 
                            accept="image/*" 
                            multiple onChange={handleFileChange} 
                            disabled={uploading || images.length>=maxFiles} 
                            className="cls_upload_input" 
                            id="imageInput" 
                            ref={fileInputRef}
                        />
                    </label>
                    {uploadError && 
                        <div className="cls_upload_error">
                            {uploadError}
                        </div>
                    }
                </div>
            }
            {images.length>0 && !profileMode && (
                <div className="cls_upload_right">
                    <div className="cls_upload_thumbnails">
                        {images.map((img,i) => (
                            <div key={i} className={`cls_upload_thumb ${img.primary ? "is-primary" : ""}`}>
                                <img src={img.previewUrl} alt={`Upload ${i+1}`} className="cls_thumb_img"></img>
                                {img.primary && 
                                    <div className="cls_primary_badge">Primary</div>
                                }
                                {!img.primary &&
                                    <div className="cls_thumb_actions">
                                        <button type="button" className="cls_make_primary" onClick={() => setPrimaryImage(i)}>
                                            Make Primary
                                        </button>
                                    </div>
                                }
                                <button type="button" onClick={() => removeImage(i)} className="cls_upload_remove">
                                    <DustbinIcon size={12} color="white" />
                                </button>
                            </div>
                        ))}
                    </div>
                    {images.length > 2 && (
                        <div className="cls_images_overflow">
                            +{images.length - maxFiles} more images
                        </div>
                    )}
                </div>
            )}
            {profileMode && showCropper && cropImage && (
                <HCImageCropper 
                    cropImage={cropImage} 
                    crop={crop} 
                    zoom={zoom} 
                    setCrop={setCrop} 
                    setZoom={setZoom} 
                    onCropCancel={handleCropCancel} 
                    onUploadComplete={onUploadComplete} 
                    images={images} 
                    saving={saving}
                />
            )}
        </div>
    );
};
export default HCFileUpload;