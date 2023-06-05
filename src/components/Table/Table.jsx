import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./Table.css";

const Table = ({ data, columns, updateFlag }) => {
  const [rows, setRows] = useState(data);

  useEffect(() => {
    setRows(data);
  }, [data, updateFlag]);

  const renderCell = (params) => {
    const { field, value } = params;

    if (field === "Acciones") {
      return value;
    }

    return String(value);
  };

  const formattedColumns = columns.map((column) => ({
    ...column,
    renderCell: renderCell,
  }));

  return (
    <div className="data-table-container">
      <DataGrid rows={rows} columns={formattedColumns} pageSize={10} />
    </div>
  );
};

export default Table;
