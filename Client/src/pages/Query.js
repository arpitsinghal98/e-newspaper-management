import React, { useState, useEffect } from "react";
import "../styles/Query.css"; // Import your CSS file
import Navbar from "../components/Navbar";
import CreateRowHelper from "../helpers/CreateRowHelper"; // Import the CreateRowHelper component
import ReadTableHelper from "../helpers/ReadTableHelper"; // Import the ReadTableHelper component
import UpdateTableHelper from "../helpers/UpdateTableHelper"; // Import the UpdateTableHelper component
import DeleteRowHelper from "../helpers/DeleteRowHelper"; // Import DeleteRowHelper component
import { getTables } from "../services/api"; // Import the getTables function from api.js

function QueryPage() {
  const [selectedTable, setSelectedTable] = useState(""); // Default is empty until tables are loaded
  const [tableNames, setTableNames] = useState([]); // State to store table names
  const [activeOperation, setActiveOperation] = useState(""); // State to control active operation (which component to display)

  // Fetch table names when the component mounts
  useEffect(() => {
    const fetchTableNames = async () => {
      try {
        const response = await getTables(); // Use the getTables API function
        setTableNames(response.data.tables); // Set table names from the backend
        if (response.data.tables.length > 0) {
          setSelectedTable(response.data.tables[0]); // Set default table to the first one
        }
      } catch (error) {
        console.error("Error fetching table names:", error);
      }
    };
    fetchTableNames();
  }, []);

  // Handle table selection change
  const handleTableChange = (event) => {
    setSelectedTable(event.target.value);
    setActiveOperation(""); // Reset active operation when table changes
  };

  // Handle the creation of a new row (form submission)
  const handleCreateRowSubmit = (newRowData) => {
    console.log("New Row Data:", newRowData);
    // Here you would typically call an API to create the new row in the database
    // For now, let's just log it
  };

  return (
    <div className="query-page">
      <Navbar />
      <h2>Query Page</h2>

      {/* Table Selection */}
      <div className="table-selection">
        <label htmlFor="tableSelect">Select Table:</label>
        <select
          id="tableSelect"
          value={selectedTable}
          onChange={handleTableChange}
        >
          {tableNames.length === 0 ? (
            <option>Loading tables...</option> // Show loading while fetching tables
          ) : (
            tableNames.map((table) => (
              <option key={table} value={table}>
                {table}
              </option>
            ))
          )}
        </select>
      </div>

      {/* Operations */}
      <div className="operations">
        <h3>Operations:</h3>
        <button onClick={() => setActiveOperation("create")}>Create Row</button>
        <button onClick={() => setActiveOperation("read")}>Read Table</button>
        <button onClick={() => setActiveOperation("update")}>Update Table</button>
        <button onClick={() => setActiveOperation("delete")}>Delete Row</button>
        <button onClick={() => setActiveOperation("advanced")}>Advanced Ops</button>
      </div>

      {/* OLAP Queries */}
      <div className="olap-queries">
        <h3>OLAP Queries:</h3>
        <button onClick={() => setActiveOperation("rollup")}>Rollup</button>
        <button onClick={() => setActiveOperation("cube")}>Cube</button>
        <button onClick={() => setActiveOperation("rank")}>Rank</button>
        <button onClick={() => setActiveOperation("denseRank")}>Dense Rank</button>
        <button onClick={() => setActiveOperation("ntile")}>Ntile</button>
        <button onClick={() => setActiveOperation("firstValue")}>First Value</button>
        <button onClick={() => setActiveOperation("unboundedPreceding")}>Unbounded Preceding</button>
        <button onClick={() => setActiveOperation("recursive")}>Recursive</button>
        <button onClick={() => setActiveOperation("view")}>View</button>
      </div>

      {/* Conditional Rendering Based on Active Operation */}
      {activeOperation === "create" && selectedTable && (
        <CreateRowHelper
          selectedTable={selectedTable} // Pass selected table name to CreateRowHelper
          onSubmit={handleCreateRowSubmit} // Pass submit handler to handle form submission
        />
      )}

      {activeOperation === "read" && selectedTable && (
        <ReadTableHelper selectedTable={selectedTable} />
      )}

      {/* Update Table Component */}
      {activeOperation === "update" && selectedTable && (
        <UpdateTableHelper selectedTable={selectedTable} />
      )}

      {/* Delete Row Component */}
      {activeOperation === "delete" && selectedTable && (
        <DeleteRowHelper selectedTable={selectedTable} />
      )}

      {/* Other Operations */}
      {activeOperation === "advanced" && <div>Advanced Operations Component (Coming Soon)</div>}

      {/* Add more components for OLAP queries if needed */}
      {activeOperation === "rollup" && <div>Rollup Component (Coming Soon)</div>}
      {activeOperation === "cube" && <div>Cube Component (Coming Soon)</div>}
      {activeOperation === "rank" && <div>Rank Component (Coming Soon)</div>}
      {activeOperation === "denseRank" && <div>Dense Rank Component (Coming Soon)</div>}
      {activeOperation === "ntile" && <div>Ntile Component (Coming Soon)</div>}
      {activeOperation === "firstValue" && <div>First Value Component (Coming Soon)</div>}
      {activeOperation === "unboundedPreceding" && <div>Unbounded Preceding Component (Coming Soon)</div>}
      {activeOperation === "recursive" && <div>Recursive Component (Coming Soon)</div>}
      {activeOperation === "view" && <div>View Component (Coming Soon)</div>}
    </div>
  );
}

export default QueryPage;