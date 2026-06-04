import React, { useCallback, useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "100%"
};
const defaultCenter = { lat: 28.49, lng: 77.52 };

const HCMapPicker = ({ apiKey, value, onChange, zoom = 15 }) => {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: apiKey
    });
    const [map,setMap] = useState(null);
    const [markerPos,setMarkerPos] = useState(value || defaultCenter);

    useEffect(() => {
        if (map && value) {
            map.setCenter(value);
            map.setZoom(zoom);
        }
    }, [map, value, zoom]);

    const onLoad = useCallback((mapInstance) => {
        setMap(mapInstance);
        if (value) {
            mapInstance.setZoom(zoom);
            mapInstance.setCenter(value);
        }
    }, [value, zoom]);

    const onUnmount = useCallback(() => {
        setMap(null);
    }, []);

    const handleClick = useCallback((e) => {
        const newPos = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        };
        setMarkerPos(newPos);
        onChange?.(newPos);
    }, [onChange]);

    const handleMarkerDragEnd = useCallback((e) => {
        const newPos = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        };
        setMarkerPos(newPos);
        onChange?.(newPos);
    }, [onChange]);

    if(!isLoaded) return <div>Loading map...</div>;
    return(
        <GoogleMap mapContainerStyle={containerStyle} center={markerPos} zoom={zoom || 10} onLoad={onLoad} onUnmount={onUnmount} onClick={handleClick}>
            <Marker 
                position={markerPos} 
                draggable 
                onDragEnd={handleMarkerDragEnd}
            />
        </GoogleMap>
    );
};

export default HCMapPicker;