import React, { useState, useEffect } from 'react';
import { getRecordByPrimaryKey, updateRecord, getPrimaryKeyField } from '../services/api'; // Assuming you have this API function
import "../styles/UpdateTableHelper.css";

const UpdateTableHelper = ({ selectedTable }) => {
  const [primaryKeyField, setPrimaryKeyField] = useState(""); // Store the primary key field name
  const [primaryKey, setPrimaryKey] = useState(""); // Store the entered primary key
  const [record, setRecord] = useState(null); // Store the fetched record
  const [updatedData, setUpdatedData] = useState({}); // Store the updated data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error handling state

  useEffect(() => {
    if (selectedTable) {
      fetchPrimaryKeyField();
    }
  }, [selectedTable]);

  // Function to fetch the primary key field name for the selected table
  const fetchPrimaryKeyField = async () => {
    try {
      const response = await getPrimaryKeyField(selectedTable); // API call to fetch the primary key field name
      setPrimaryKeyField(response.data.primaryKeyField);
    } catch (error) {
      console.error('Error fetching primary key field:', error);
      setError('Error fetching primary key field');
    }
  };

  // Fetch record by primary key
  const handleFetchRecord = async () => {
    setLoading(true);
    try {
      const fetchedRecord = await getRecordByPrimaryKey(selectedTable, primaryKeyField, primaryKey);
      console.log('Arpit: ', fetchedRecord.data);
      setRecord(fetchedRecord.data);
      setUpdatedData(fetchedRecord.data); // Pre-populate the form with fetched record data
      setError(null);
    } catch (error) {
      setError('Error fetching record. Please check the primary key.');
    } finally {
      setLoading(false);
    }
  };

  // Handle updating the record
  const handleUpdateRecord = async () => {
    setLoading(true);
    try {
      const updatedRecord = await updateRecord(selectedTable, primaryKeyField, primaryKey, updatedData);
      setRecord(updatedRecord); // Optionally update the local state with the updated record
      alert('Record updated successfully!');
      setError(null);
      
      // Clear the primary key field, record, and updated data after update
      setPrimaryKey("");         // Clear the primary key field
      setRecord(null);           // Clear the record data
      setUpdatedData({});        // Clear the updated data
  
    } catch (error) {
      setError('Error updating record. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle input change for updated data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="update-table-helper">
      <h3>Update Record for Table: {selectedTable}</h3>

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
          <button onClick={handleFetchRecord} disabled={loading}>
            {loading ? 'Loading...' : 'Fetch Record'}
          </button>
        </div>
      )}

      {error && <div className="error">{error}</div>}

      {/* Record Details Form */}
      {record && (
        <div>
          <h4>Record Details</h4>
          <form>
            {Object.keys(record).map((key) => (
              key !== primaryKeyField && ( // Don't show the primary key field here
                <div key={key}>
                  <label>{key}:</label>
                  <input
                    type="text"
                    name={key}
                    value={updatedData[key] || ''}
                    onChange={handleChange}
                  />
                </div>
              )
            ))}
            <button type="button" onClick={handleUpdateRecord} disabled={loading}>
              {loading ? 'Updating...' : 'Update Record'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateTableHelper;
