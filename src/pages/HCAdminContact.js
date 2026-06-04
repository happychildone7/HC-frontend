import React, { useEffect, useState } from "react";
import '../styles/HCAdminEvent.css';
import Button from '../components/HCButton';
import DataTable from '../components/HCDatatable';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const HCAdminContact = () => {
    const [contacts,setContacts] = useState([]);
    const [loading,setLoading] = useState(true);
    const [selectedRows,setSelectedRows] = useState([]);

    const navigate = useNavigate();

    const COLUMNS = [
        {
            name: 'Name',
            selector: row => row.full_Name__c,
            sortable: true,
            width: "25%",
            headerStyle: (selector, id) => {
                return { textAlign: "center" };
            },
        },
        {
            name: 'Contact Type',
            selector: row => row.contact_Type__c || '',
            sortable: true,
        },
        {
            name: 'Phone Number',
            selector: row => row.phone__c || '',
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email__c || '',
            sortable: true,
        },
        {
            name: 'Contact Type',
            selector: row => row.contact_Type__c || '',
            sortable: true
        },
        {
            name: 'Activation Status',
            selector: row => row.active__c,
            cell: row => (
                <span className={row.active__c ? 'cls_status_active' : 'cls_statusinactive'}>
                    {row.active__c}
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
        const fetchContacts = async () => {
            try{
                const resp = await fetch('/api/contact/', {
                    method: 'GET'
                });
                const data = await resp.json();
                setContacts(data || []);
            }catch(error){
                console.error("Error loading Contacts", error);
            }finally{
                setLoading(false);
            }
        };
        fetchContacts();
    }, []);
    const handleAdd = () => {
        navigate('/admin-create-Contact');
    };
    const handleView = (row) => {
        navigate(`/admin-view-Contact/${row._id}`);
    };
    const handleSelectedRowsChange = ({ selectedRows }) => {
        console.log('check rowww>>');
        setSelectedRows(selectedRows);
    };
    const handleActivate = async () => {
        console.log('rowsselected>',JSON.stringify(selectedRows));
        const draftRows = selectedRows.filter(row => row.active__c);
        if(draftRows.length === 0){
            console.log("No active rows selected");
            toast.warning('Please select inactive contacts to confirm.');
            return;
        }
        const ids = draftRows.map(row => row._id);
        try{
            setLoading(true);
            const resp = await fetch('/api/contact/bulkActivate',{
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
            toast.success(`${draftRows.length} Contact(s) activated!`);
            setContacts(prev => 
                prev.map(contact => 
                    ids.includes(contact._id) 
                    ? { ...contact, active__c: true } 
                    : contact
                )
            );
            setSelectedRows([]);
            setLoading(false);
            console.log('Contacts activated', ids.length, 'Contacts');
        }catch(error){
            console.log('ERROR in activating Contacts', error);
        }
    };
    const handleDelete = async () => {
        if(selectedRows.length === 0){
            toast.info('Please select at least one Contact to delete.');
        }
        const confirmed = window.confirm(`This will permanently delete ${selectedRows.length} Contact records. Continue?`);
        if(!confirmed){
            toast.info('Delete cancelled.');
            return;
        }
        const ids = selectedRows.map(row => row._id);
        try{
            setLoading(true);
            const resp = await fetch('/api/contact/deleteMany', {
                method: 'POST',
                body: JSON.stringify({ ids }),
                headers: {
                    'content-type': 'application/json'
                }
            });
            const json = await resp.json();
            if(!resp.ok){
                console.log('Bulk Delete Contacts failed.',json);
                setLoading(false);
                return;
            }
            toast.success(`${selectedRows.length} Contact(s) deleted!`);
            setContacts(prev => 
                prev.filter(Contact => 
                    !ids.includes(Contact._id)
                )
            );
            setSelectedRows([]);
            setLoading(false);
        }catch(error){
            console.log('ERROR in deleting bulk Contacts', error);
        }
    };

    return(
        <div className="cls_header">
            <div className="cls_crd_wrp_adsc">
                <div className="cls_crd_cnt_adsc">
                    <div className="cls_crd_hdr_adsc">
                        <div>
                            <h2>Contacts</h2>
                            <p>Approve, edit, remove or create new Contact records.</p>
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
                                + Add Contact
                            </Button>
                        </div>
                    </div>
                    <div className="hc-admin-table-wrapper">
                        {loading ? (
                        <div className="hc-table-empty">Loading Contacts…</div>
                        ) : contacts.length === 0 ? (
                        <div className="hc-table-empty">No Contacts found.</div>
                        ) : (
                        <div>
                            <DataTable 
                                columns={COLUMNS} 
                                data={contacts}  
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
export default HCAdminContact;