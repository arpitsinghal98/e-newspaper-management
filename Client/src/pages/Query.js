import React, { useState } from 'react';
import '../styles/Query.css';
import Navbar from '../components/Navbar';

function QueryPage() {
  const [selectedTable, setSelectedTable] = useState('aircraft_types'); // Default table

  const handleTableChange = (event) => {
    setSelectedTable(event.target.value);
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
          <option value="aircraft_types">Aircraft Types</option>
          {/* Add more table options as needed */}
        </select>
      </div>

      {/* Operations */}
      <div className="operations">
        <h3>Operations:</h3>
        <button>Create Row</button>
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
      </div>
    </div>
  );
}

export default QueryPage;