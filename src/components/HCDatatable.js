import React from "react";
import DataTable from "react-data-table-component";

const HCDatatable = (props) => {
    const { columns,data,customStyles,highlightOnHover,striped,pointerOnHover,responsive,theme,onRowClicked,updateSelectedState } = props;
    return(
        <DataTable
			columns={columns}
			data={data}
            customStyles={customStyles}
            highlightOnHover={highlightOnHover}
            striped={striped}
            pointerOnHover={pointerOnHover}
            responsive={responsive}
            theme={theme}
            selectableRows
            selectableRowsVisibleOnly="true"
            selectableRowsHighlight="true"
            onRowClicked={onRowClicked}
            onSelectedRowsChange={updateSelectedState}
		/>
    );
};
export default HCDatatable;