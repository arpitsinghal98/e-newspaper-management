import React, { useState, useEffect } from "react";
import { getColumns, updateRow } from "../services/api"; // Assume you have API functions for columns and updating rows
import "../styles/UpdateTableHelper.css"; // Import the CSS for this component

const UpdateTableHelper = ({ selectedTable, rowId, onUpdateSuccess }) => {
  const [columns, setColumns] = useState([]);
  const [rowData, setRowData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchColumns = async () => {
      try {
        setLoading(true);
        const columnResponse = await getColumns(selectedTable);
        setColumns(columnResponse.data.columns); // Set the column names for the selected table
        // Fetch the row data for the specific rowId if needed
        // Assuming an API method to get the row data by ID
        const rowResponse = await getTableData(selectedTable, rowId); // Or use a different API to get a specific row
        setRowData(rowResponse.data);
      } catch (error) {
        console.error("Error fetching columns or row data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedTable && rowId) {
      fetchColumns();
    }
  }, [selectedTable, rowId]);

  const handleInputChange = (e, columnName) => {
    setRowData({
      ...rowData,
      [columnName]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateRow(selectedTable, rowId, rowData); // Update the row in the selected table
      onUpdateSuccess(); // Callback to parent component on successful update
    } catch (error) {
      console.error("Error updating row:", error);
    }
  };

  return (
    <div className="update-table">
      <h3>Update Row in {selectedTable} Table</h3>
      {loading ? <p>Loading...</p> : (
        <form onSubmit={handleSubmit}>
          {columns.map((column) => (
            <div key={column.column_name} className="form-group">
              <label htmlFor={column.column_name}>{column.column_name}</label>
              <input
                type="text"
                id={column.column_name}
                value={rowData[column.column_name] || ""}
                onChange={(e) => handleInputChange(e, column.column_name)}
                required
              />
            </div>
          ))}
          <button type="submit">Update Row</button>
        </form>
      )}
    </div>
  );
};

export default UpdateTableHelper;
