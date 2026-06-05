import React, { useEffect, useState } from "react";
import '../styles/HCAdminEvent.css';
import Button from '../components/HCButton';
import DataTable from '../components/HCDatatable';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { API_BASE } from "../utils/config";

const HCAdminRegistration = () => {
    const [registrations,setRegistrations] = useState([]);
    const [loading,setLoading] = useState(true);
    const [selectedRows,setSelectedRows] = useState([]);

    const navigate = useNavigate();

    const COLUMNS = [
        {
            name: 'Event',
            selector: row => row.event__c?.Name__c,
            sortable: true,
            width: "25%",
            headerStyle: (selector, id) => {
                return { textAlign: "center" };
            },
        },
        {
            name: 'Registration Number',
            selector: row => row.registration_Number__c,
            sortable: true,
        },
        {
            name: 'Contact',
            selector: row => row.contact__c?.email__c || '',
            sortable: true,
        },
        {
            name: 'Payment Status',
            selector: row => row.payment_Status__c,
            sortable: true
        },
        {
            name: 'Status',
            selector: row => row.status__c,
            cell: row => (
                <span className={row.status__c==='Draft' ? 'cls_status_inactive' : 'cls_status_active'}>
                    {row.status__c}
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
        const fetchRegistrations = async () => {
            try{
                const resp = await fetch(`${API_BASE}/api/registration/`, {
                    method: 'GET'
                });
                const data = await resp.json();
                setRegistrations(data || []);
            }catch(error){
                console.error("Error loading Registrations", error);
            }finally{
                setLoading(false);
            }
        };
        fetchRegistrations();
    }, []);
    const handleAdd = () => {
        navigate('/admin-create-registration');
    };
    const handleView = (row) => {
        navigate(`/admin-view-registration/${row._id}`);
    };
    const handleSelectedRowsChange = ({ selectedRows }) => {
        console.log('check rowww>>');
        setSelectedRows(selectedRows);
    };
    const handleConfirm = async () => {
        console.log('rowsselected>',JSON.stringify(selectedRows));
        const draftRows = selectedRows.filter(row => row.status__c==='Draft');
        if(draftRows.length === 0){
            console.log("No draft rows selected");
            toast.warning('Please select registrations in draft status to confirm.');
            return;
        }
        const ids = draftRows.map(row => row._id);
        try{
            setLoading(true);
            const resp = await fetch(`${API_BASE}/api/registration/bulkActivate`,{
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
            toast.success(`${draftRows.length} Registration(s) activated!`);
            setRegistrations(prev => 
                prev.map(registration => 
                    ids.includes(registration._id) 
                    ? { ...registration, status__c: 'Registered' } 
                    : registration
                )
            );
            setSelectedRows([]);
            setLoading(false);
            console.log('Registrations activated', ids.length, 'Registrations');
        }catch(error){
            console.log('ERROR in activating Registrations', error);
        }
    };
    const handleDelete = async () => {
        if(selectedRows.length === 0){
            toast.info('Please select at least one Registration to delete.');
        }
        const confirmed = window.confirm(`This will permanently delete ${selectedRows.length} Registration records. Continue?`);
        if(!confirmed){
            toast.info('Delete cancelled.');
            return;
        }
        const ids = selectedRows.map(row => row._id);
        try{
            setLoading(true);
            const resp = await fetch(`${API_BASE}/api/registration/deleteMany`, {
                method: 'POST',
                body: JSON.stringify({ ids }),
                headers: {
                    'content-type': 'application/json'
                }
            });
            const json = await resp.json();
            if(!resp.ok){
                console.log('Bulk Delete Registrations failed.',json);
                setLoading(false);
                return;
            }
            toast.success(`${selectedRows.length} Registration(s) deleted!`);
            setRegistrations(prev => 
                prev.filter(Registration => 
                    !ids.includes(Registration._id)
                )
            );
            setSelectedRows([]);
            setLoading(false);
        }catch(error){
            console.log('ERROR in deleting bulk Registrations', error);
        }
    };

    return(
        <div className="cls_header">
            <div className="cls_crd_wrp_adsc">
                <div className="cls_crd_cnt_adsc">
                    <div className="cls_crd_hdr_adsc">
                        <div>
                            <h2>Registrations</h2>
                            <p>Approve, edit, remove or create new Registration records.</p>
                        </div>
                        <div className="cls_crd_hdr_btn_wrp_adsc">
                            {selectedRows.length>0 && (
                                    <Button myclass="cls_btn_primary_adm" onClick={handleConfirm}>
                                        Confirm
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
                                + Add Registration
                            </Button>
                        </div>
                    </div>
                    <div className="hc-admin-table-wrapper">
                        {loading ? (
                        <div className="hc-table-empty">Loading Registrations…</div>
                        ) : registrations.length === 0 ? (
                        <div className="hc-table-empty">No Registrations found.</div>
                        ) : (
                        <div>
                            <DataTable 
                                columns={COLUMNS} 
                                data={registrations}  
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
export default HCAdminRegistration;