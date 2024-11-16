import React, { useState } from "react";
import "../styles/Query.css"; // Import your CSS file
import Navbar from "../components/Navbar";
import { renderInputFields } from "../helpers/CreateRowHelper";

function QueryPage() {
  const [selectedTable, setSelectedTable] = useState("article"); // Default table
  const [showCreateRow, setShowCreateRow] = useState(false);
  const [newRowData, setNewRowData] = useState({});

  const handleTableChange = (event) => {
    setSelectedTable(event.target.value);
    setShowCreateRow(false); // Hide create row form when table changes
    setNewRowData({}); // Reset form data
  };

  const handleCreateRowClick = () => {
    setShowCreateRow(true);
  };

  const handleInputChange = (event, columnName) => {
    setNewRowData({
      ...newRowData,
      [columnName]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Here you would typically make an API call to submit the new row data
    // For this example, we'll just log the data to the console
    console.log("New row data:", newRowData);

    // Reset form and hide the create row section
    setNewRowData({});
    setShowCreateRow(false);
  };

  return (
    <div className="query-page">
      <Navbar/>
      <h2>Query Page</h2>

      {/* Table Selection */}
      <div className="table-selection">
        <label htmlFor="tableSelect">Select Table:</label>
        <select
          id="tableSelect"
          value={selectedTable}
          onChange={handleTableChange}
        >
          <option value="article">article</option>
          <option value="category">category</option>
          <option value="comments">comments</option>
          <option value="editor">editor</option>
          <option value="journalist">journalist</option>
          <option value="subscription plans">subscription plans</option>
          <option value="user">user</option>
        </select>
      </div>

      {/* Operations */}
      <div className="operations">
        <h3>Operations:</h3>
        <button onClick={handleCreateRowClick}>Create Row</button>
        <button>Read Table</button>
        <button>Update Table</button>
        <button>Delete Row</button>
        <button>Advanced Ops</button>
      </div>

     

      {/* OLAP Queries */}
      <div className="olap-queries">
        <h3>OLAP Queries:</h3>
        <button>Rollup</button>
        <button>Cube</button>
        <button>Rank</button>
        <button>Dense Rank</button>
        <button>Ntile</button>
        <button>First Value</button>
        <button>Unbounded Preceding</button>
        <button>Recursive</button>
        <button>View</button>
      </div>

      {/* Placeholder for Query Display */}
      <div className="query-results">
        {/* You can add a table or other elements here to display the query results */}
        <p>Selected Table: {selectedTable}</p>
         {/* Create Row Form */}
      {showCreateRow && (
        <div>
        <h3>Create New Row in {selectedTable} Table</h3>
        {/* ... */}
        <form onSubmit={handleSubmit}>
          {renderInputFields(selectedTable, handleInputChange)} {/* Call the helper function */}
          <button type="submit">Submit</button>
        </form>
      </div>
      )}
      </div>
    </div>
  );
}

export default QueryPage;