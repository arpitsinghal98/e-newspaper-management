import React, { useState, useEffect } from "react";
import {
  getRecordByPrimaryKey,
  updateRecord,
  getPrimaryKeyField,
} from "../services/api"; // Assuming you have this API function
import "../styles/UpdateTableHelper.css";

const UpdateTableHelper = ({ selectedTable }) => {
  const [primaryKeyField, setPrimaryKeyField] = useState("");
  const [primaryKey, setPrimaryKey] = useState("");
  const [record, setRecord] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedTable) {
      fetchPrimaryKeyField();
    }
  }, [selectedTable]);

  // Function to fetch the primary key field name for the selected table
  const fetchPrimaryKeyField = async () => {
    try {
      const response = await getPrimaryKeyField(selectedTable);
      setPrimaryKeyField(response.data.primaryKeyField);
    } catch (error) {
      console.error("Error fetching primary key field:", error);
      setError("Error fetching primary key field");
    }
  };

  // Fetch record by primary key
  const handleFetchRecord = async () => {
    setLoading(true);
    try {
      const fetchedRecord = await getRecordByPrimaryKey(
        selectedTable,
        primaryKeyField,
        primaryKey
      );
      console.log("Arpit: ", fetchedRecord.data);
      setRecord(fetchedRecord.data);
      setUpdatedData(fetchedRecord.data);
      setError(null);
    } catch (error) {
      setError("Error fetching record. Please check the primary key.");
    } finally {
      setLoading(false);
    }
  };

  // Handle updating the record
  const handleUpdateRecord = async () => {
    setLoading(true);
    try {
      const updatedRecord = await updateRecord(
        selectedTable,
        primaryKeyField,
        primaryKey,
        updatedData
      );
      setRecord(updatedRecord);
      alert("Record updated successfully!");
      setError(null);

      // Clear the primary key field, record, and updated data after update
      setPrimaryKey("");
      setRecord(null);
      setUpdatedData({});
    } catch (error) {
      setError("Error updating record. Please try again.");
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
            {loading ? "Loading..." : "Fetch Record"}
          </button>
        </div>
      )}

      {error && <div className="error">{error}</div>}

      {/* Record Details Form */}
      {record && (
        <div>
          <h4>Record Details</h4>
          <form>
            {Object.keys(record).map(
              (key) =>
                key !== primaryKeyField && (
                  <div key={key}>
                    <label>{key}:</label>
                    <input
                      type="text"
                      name={key}
                      value={updatedData[key] || ""}
                      onChange={handleChange}
                    />
                  </div>
                )
            )}
            <button
              type="button"
              onClick={handleUpdateRecord}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Record"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateTableHelper;
