import React, { useEffect, useState } from "react";
import '../styles/HCAdminEvent.css';
import Button from '../components/HCButton';
import DataTable from '../components/HCDatatable';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const HCAdminEvent = () => {
    const [events,setEvents] = useState([]);
    const [loading,setLoading] = useState(true);
    const [selectedRows,setSelectedRows] = useState([]);

    const navigate = useNavigate();

    const COLUMNS = [
        {
            name: 'Event Name',
            selector: row => row.Name__c,
            sortable: true,
            width: "25%",
            headerStyle: (selector, id) => {
                return { textAlign: "center" };
            },
        },
        {
            name: 'Event Code',
            selector: row => row.event_Code__c,
            sortable: true,
        },
        {
            name: 'Event Location',
            selector: row => row.location__c?.location_Name__c || '',
            sortable: true,
        },
        {
            name: 'Event Type',
            selector: row => row.event_Type__c,
            sortable: true
        },
        {
            name: 'Activation Status',
            selector: row => row.active__c,
            cell: row => (
                <span className={row.active__c ? 'cls_status_active' : 'cls_status_inactive'}>
                    {row.active__c ? 'Active' : 'Inactive'}
                </span>
            )
        }      
    ];
    const customStyles = {
        headCells: {
          style: {
            fontWeight: 'bold',
            fontSize: '120%',
          },
        },
    };

    useEffect(() => {
        const fetchEvents = async () => {
            try{
                const resp = await fetch('/api/event/', {
                    method: 'GET'
                });
                const data = await resp.json();
                setEvents(data || []);
            }catch(error){
                console.error("Error loading Events", error);
            }finally{
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);
    const handleAdd = () => {
        navigate('/admin-create-event');
    };
    const handleView = (row) => {
        navigate(`/admin-view-event/${row._id}`);
    };
    const handleSelectedRowsChange = ({ selectedRows }) => {
        console.log('check rowww>>');
        setSelectedRows(selectedRows);
    };
    const handleActivate = async () => {
        console.log('rowsselected>',JSON.stringify(selectedRows));
        const inactiveRows = selectedRows.filter(row => !row.active__c || row.active__c === false);
        if(inactiveRows.length === 0){
            console.log("No inactive rows selected");
            toast.warning('Please select inactive events to activate.');
            return;
        }
        const ids = inactiveRows.map(row => row._id);
        try{
            setLoading(true);
            const resp = await fetch('/api/event/bulkActivate',{
                method: 'POST',
                body: JSON.stringify({ ids }),
                headers: {
                    'content-type': 'application/json'
                }
            });
            const json = await resp.json();
            if(!resp.ok){
                console.log('Bulk activation failed.',json);
                setLoading(false);
                return;
            }
            toast.success(`${inactiveRows.length} Event(s) activated!`);
            setEvents(prev => 
                prev.map(event => 
                    ids.includes(event._id) 
                    ? { ...event, active__c: true } 
                    : event
                )
            );
            setSelectedRows([]);
            setLoading(false);
            console.log('Events activated', ids.length, 'Events');
        }catch(error){
            console.log('ERROR in activating Events', error);
        }
    };
    const handleDelete = async () => {
        if(selectedRows.length === 0){
            toast.info('Please select at least one event to delete.');
        }
        const confirmed = window.confirm(`This will permanently delete ${selectedRows.length} event records. Continue?`);
        if(!confirmed){
            toast.info('Delete cancelled.');
            return;
        }
        const ids = selectedRows.map(row => row._id);
        try{
            setLoading(true);
            const resp = await fetch('/api/event/deleteMany', {
                method: 'POST',
                body: JSON.stringify({ ids }),
                headers: {
                    'content-type': 'application/json'
                }
            });
            const json = await resp.json();
            if(!resp.ok){
                console.log('Bulk Delete Events failed.',json);
                setLoading(false);
                return;
            }
            toast.success(`${selectedRows.length} Event(s) deleted!`);
            setEvents(prev => 
                prev.filter(event => 
                    !ids.includes(event._id)
                )
            );
            setSelectedRows([]);
            setLoading(false);
        }catch(error){
            console.log('ERROR in deleting bulk events', error);
        }
    };

    return(
        <div className="cls_header">
            <div className="cls_crd_wrp_adsc">
                <div className="cls_crd_cnt_adsc">
                    <div className="cls_crd_hdr_adsc">
                        <div>
                            <h2>Events</h2>
                            <p>Approve, edit, remove or create new event records.</p>
                        </div>
                        <div className="cls_crd_hdr_btn_wrp_adsc">
                            {selectedRows.length>0 && (
                                    <Button myclass="cls_btn_primary_adm" onClick={handleActivate}>
                                        Activate
                                    </Button>
                                )
                            }
                            {selectedRows.length>0 && (
                                    <Button myclass="cls_btn_primary_adm" onClick={handleDelete}>
                                        Delete
                                    </Button>
                                )
                            }
                            <Button myclass="cls_btn_primary_adm" onClick={handleAdd}>
                                + Add Event
                            </Button>
                        </div>
                    </div>
                    <div className="hc-admin-table-wrapper">
                        {loading ? (
                        <div className="hc-table-empty">Loading Events…</div>
                        ) : events.length === 0 ? (
                        <div className="hc-table-empty">No Events found.</div>
                        ) : (
                        <div>
                            <DataTable 
                                columns={COLUMNS} 
                                data={events}  
                                customStyles={customStyles} 
                                highlightOnHover="true"
                                striped="true"
                                pointerOnHover="true"
                                responsive="true"
                                theme="default"
                                onRowClicked={handleView}
                                selectableRows
                                updateSelectedState={handleSelectedRowsChange}
                            />
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default HCAdminEvent;