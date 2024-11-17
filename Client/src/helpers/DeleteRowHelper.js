import React, { useState } from 'react';
import { deleteRecord, getPrimaryKeyField } from '../services/api';
import "../styles/DeleteRowHelper.css";

const DeleteRowHelper = ({ selectedTable }) => {
  const [primaryKeyField, setPrimaryKeyField] = useState("");
  const [primaryKey, setPrimaryKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Function to fetch the primary key field name for the selected table
  const fetchPrimaryKeyField = async () => {
    try {
      const response = await getPrimaryKeyField(selectedTable); 
      setPrimaryKeyField(response.data.primaryKeyField);
    } catch (error) {
      console.error('Error fetching primary key field:', error);
      setError('Error fetching primary key field');
    }
  };

  // Call fetchPrimaryKeyField when selectedTable changes
  React.useEffect(() => {
    if (selectedTable) {
      fetchPrimaryKeyField();
    }
  }, [selectedTable]);

  // Handle delete operation
  const handleDeleteRecord = async () => {
    if (!primaryKey) {
      setError('Please enter a primary key');
      return;
    }

    setLoading(true);
    try {
      // Call the delete API function with the table, primary key field, and the primary key value
      await deleteRecord(selectedTable, primaryKeyField, primaryKey);
      setSuccessMessage('Record deleted successfully!');
      setError(null);
      setPrimaryKey("");
    } catch (error) {
      setError('Error deleting record. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="delete-row-helper">
      <h3>Delete Record for Table: {selectedTable}</h3>

      {/* Primary Key Field */}
      {primaryKeyField && (
        <div>
          <label>{primaryKeyField}:</label>
          <input
            type="text"
            value={primaryKey}
            onChange={(e) => setPrimaryKey(e.target.value)}
            placeholder={`Enter ${primaryKeyField}`}
          />
          <button onClick={handleDeleteRecord} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete Record'}
          </button>
        </div>
      )}

      {/* Display success or error messages */}
      {error && <div className="error">{error}</div>}
      {successMessage && <div className="success">{successMessage}</div>}
    </div>
  );
};

export default DeleteRowHelper;
