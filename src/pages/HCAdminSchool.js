import React, { useEffect, useState } from "react";
import '../styles/HCAdminSchool.css';
import Button from '../components/HCButton';
import DataTable from '../components/HCDatatable';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const HCAdminSchool = () => {
    const [schools,setSchools] = useState([]);
    const [loading,setLoading] = useState(true);
    const [selectedRows,setSelectedRows] = useState([]);

    const navigate = useNavigate();

    const COLUMNS = [
        {
            name: 'School Name',
            selector: row => row.Name__c,
            sortable: true,
            width: "25%",
            headerStyle: (selector, id) => {
                return { textAlign: "center" };
            },
        },
        {
            name: 'School Code',
            selector: row => row.school_Code__c,
            sortable: true,
        },
        {
            name: 'School Location',
            selector: row => row.location__c?.location_Name__c || '',
            sortable: true,
        },
        {
            name: 'Board',
            selector: row => row.board__c,
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
        const fetchSchools = async () => {
            try{
                const resp = await fetch('/api/school/', {
                    method: 'GET'
                });
                const data = await resp.json();
                setSchools(data || []);
            }catch(error){
                console.error("Error loading schools", error);
            }finally{
                setLoading(false);
            }
        };
        fetchSchools();
    }, []);
    const handleAdd = () => {
        navigate('/admin-create-school');
    };
    const handleView = (row) => {
        navigate(`/admin-view-school/${row._id}`);
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
            toast.warning('Please select inactive schools to activate.');
            return;
        }
        const ids = inactiveRows.map(row => row._id);
        try{
            setLoading(true);
            const resp = await fetch('/api/school/bulkActivate',{
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
            toast.success(`${inactiveRows.length} school(s) activated!`);
            setSchools(prev => 
                prev.map(school => 
                    ids.includes(school._id) 
                    ? { ...school, active__c: true } 
                    : school
                )
            );
            setSelectedRows([]);
            setLoading(false);
            console.log('Schools activated', ids.length, 'schools');
        }catch(error){
            console.log('ERROR in activating schools', error);
        }
    };
    const handleDelete = async () => {
        if(selectedRows.length === 0){
            toast.info('Please select at least one school to delete.');
        }
        const confirmed = window.confirm(`This will permanently delete ${selectedRows.length} school records. Continue?`);
        if(!confirmed){
            toast.info('Delete cancelled.');
            return;
        }
        const ids = selectedRows.map(row => row._id);
        try{
            setLoading(true);
            const resp = await fetch('/api/school/deleteMany', {
                method: 'POST',
                body: JSON.stringify({ ids }),
                headers: {
                    'content-type': 'application/json'
                }
            });
            const json = await resp.json();
            if(!resp.ok){
                console.log('Bulk Delete schools failed.',json);
                setLoading(false);
                return;
            }
            toast.success(`${selectedRows.length} school(s) deleted!`);
            setSchools(prev => 
                prev.filter(school => 
                    !ids.includes(school._id)
                )
            );
            setSelectedRows([]);
            setLoading(false);
        }catch(error){
            console.log('ERROR in deleting bulk schools', error);
        }
    };

    return(
        <div className="cls_header">
            <div className="cls_crd_wrp_adsc">
                <div className="cls_crd_cnt_adsc">
                    <div className="cls_crd_hdr_adsc">
                        <div>
                            <h2>Schools</h2>
                            <p>Approve, edit, remove or create new school records.</p>
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
                                + Add School
                            </Button>
                        </div>
                    </div>
                    <div className="hc-admin-table-wrapper">
                        {loading ? (
                        <div className="hc-table-empty">Loading schools…</div>
                        ) : schools.length === 0 ? (
                        <div className="hc-table-empty">No schools found.</div>
                        ) : (
                        <div>
                            <DataTable 
                                columns={COLUMNS} 
                                data={schools}  
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
export default HCAdminSchool;