import React, { useEffect, useRef, useState } from "react";
import '../styles/HCLookup.css';
import ic_search from '../images/search.WebP';

const HCLookup = ({ className, placeholder, endpoint, initialValue, onRecordSelect, fieldName, refreshKey }) => {
    const [searchText,setSearchText] = useState();
    const [searchResult,setSearchResult] = useState([]);
    const [selectedRecord,setSelectedRecord] = useState(null);
    const wrapperRef = useRef(null);

    // Set initial value on load
    useEffect(() => {
        if (initialValue) {
            setSelectedRecord(initialValue);
            setSearchText(initialValue[fieldName] || '');
        }
    }, [initialValue]);
    useEffect(() => {
        if(refreshKey !== undefined){
            setSearchText('');
        }
    }, [refreshKey]);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setSearchResult([]);
                //setSearchText('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const fetchResults = async() => {
            const resp = await fetch(`${endpoint}${searchText}`,{
                method: 'GET'
            });
            const data = await resp.json();
            if(!resp.ok){
                console.log('no data');
                setSearchResult([]);
            }
            if(resp.ok){
                console.log('data<><',data);
                setSearchResult(data);
            }
        }
        if(searchText !== undefined && !selectedRecord && searchText.length > 1){
            console.log('SELREC><>',selectedRecord);
            fetchResults();
        }
    },[searchText]);
    const handleInputChange = (e) => {
        if(selectedRecord){
            setSelectedRecord(null);
        }
        setSearchText(e.target.value);
    }
    const handleRecordSelect = (record) => {
        setSelectedRecord(record);
        setSearchResult([]);
        setSearchText(record[fieldName]);

        if (onRecordSelect) {
            onRecordSelect(record); // Send selected record to parent
        }
    };

    return(
        <div ref={wrapperRef}>
            <div className="cls_searchBox">
                <input className={className}
                    type="text"
                    placeholder={placeholder}
                    onChange={handleInputChange}
                    value={searchText}
                />
                <img src={ic_search} className="cls_search_icn" />
            </div>
            {searchResult.length>0 && !selectedRecord && (
                <ul className="lookup-results">
                    {searchResult.map((record) => (
                        <li 
                            key={record[fieldName]}
                            onClick={() => {
                                handleRecordSelect(record);
                            }}>
                            {record[fieldName]}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
export default HCLookup;