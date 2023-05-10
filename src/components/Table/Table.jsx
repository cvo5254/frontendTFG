import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

const Table = () => {
  const data = [
    { name: "John", active: true },
    { name: "Jane", active: false },
    { name: "Bob", active: true },
  ];
  const [rows, setRows] = useState(
    data.map((row, index) => ({ ...row, id: index + 1 }))
  );

  const columns = Object.keys(data[0]).map((key) => ({
    field: key,
    headerName: key.toUpperCase(),
    width: 200,
  }));

  return (
    <div>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
};

export default Table;
