import React, { useState, useEffect } from "react";
import { getColumns, createRow } from "../services/api"; // Import the createRow API function
import "../styles/CreateRowHelper.css"; // Import the CSS

const CreateRowHelper = ({ selectedTable, onSubmit }) => {
  const [columns, setColumns] = useState([]); // Store columns of the selected table
  const [newRowData, setNewRowData] = useState({}); // Store form data for new row
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state

  // Fetch columns when selectedTable changes
  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const response = await getColumns(selectedTable);
        setColumns(response.data.columns);
      } catch (error) {
        console.error("Error fetching columns:", error);
      }
    };

    if (selectedTable) {
      fetchColumns();
    }
  }, [selectedTable]);

  // Handle input changes
  const handleInputChange = (event, columnName) => {
    setNewRowData({
      ...newRowData,
      [columnName]: event.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true during API call
    setError(""); // Reset error

    try {
      // Call the API to create the row
      await createRow(selectedTable, newRowData);
      alert("Row created successfully!"); // You can show a success message or redirect
      setNewRowData({}); // Reset the form after submission
    } catch (err) {
      console.error("Error creating row:", err);
      setError("Failed to create row. Please try again later."); // Set error message
    } finally {
      setLoading(false); // Set loading to false after API call
    }
  };

  // Render input fields for each column
  const renderInputField = (column) => {
    const { column_name, data_type } = column;

    let inputType = "text"; // Default to text
    if (data_type.includes("int") || data_type.includes("integer")) {
      inputType = "number";
    } else if (data_type.includes("date") || data_type.includes("timestamp")) {
      inputType = "date";
    } else if (data_type.includes("boolean")) {
      inputType = "checkbox";
    }

    return (
      <div key={column_name} className="form-group">
        <label htmlFor={column_name}>{column_name}</label>
        <input
          type={inputType}
          id={column_name}
          name={column_name}
          value={newRowData[column_name] || ""}
          onChange={(event) => handleInputChange(event, column_name)}
          required
        />
      </div>
    );
  };

  return (
    <div className="create-row-form">
      <h3>Create New Row in {selectedTable} Table</h3>
      <form onSubmit={handleSubmit}>
        {columns.map((column) => renderInputField(column))}
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
        {error && <p className="error-message">{error}</p>} {/* Display error message */}
      </form>
    </div>
  );
};

export default CreateRowHelper;