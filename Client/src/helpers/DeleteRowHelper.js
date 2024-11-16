import React from "react";
import { deleteRow } from "../services/api"; // Assume you have a function to delete a row
import "../styles/DeleteRowHelper.css"; // Import the CSS for this component

const DeleteRowHelper = ({ selectedTable, rowId, onDeleteSuccess }) => {
  const handleDelete = async () => {
    try {
      await deleteRow(selectedTable, rowId); // Delete the row from the table
      onDeleteSuccess(); // Callback to parent component on successful deletion
    } catch (error) {
      console.error("Error deleting row:", error);
    }
  };

  return (
    <div className="delete-row">
      <h3>Delete Row from {selectedTable} Table</h3>
      <button onClick={handleDelete}>Delete Row</button>
    </div>
  );
};

export default DeleteRowHelper;
