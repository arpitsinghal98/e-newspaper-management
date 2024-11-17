import React, { useState, useEffect } from "react";
import "../styles/Query.css"; // Import your CSS file
import Navbar from "../components/Navbar";
import CreateRowHelper from "../helpers/CreateRowHelper"; // Import the CreateRowHelper component
import ReadTableHelper from "../helpers/ReadTableHelper"; // Import the ReadTableHelper component
import UpdateTableHelper from "../helpers/UpdateTableHelper"; // Import the UpdateTableHelper component
import DeleteRowHelper from "../helpers/DeleteRowHelper"; // Import DeleteRowHelper component
import { getTables } from "../services/api"; // Import the getTables function from api.js
import AdvancedOps from "../helpers/AdvancedOps"; // Import the AdvancedOps component
import OlapQueriesHelper from "../helpers/OlapQueriesHelper"; // Import OlapQueriesHelper
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTable, faPen, faTrash, faTasks } from '@fortawesome/free-solid-svg-icons';

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

  // Handle CRUD operation button clicks
  const handleCrudOperationClick = (operation) => {
    // Reset activeOperation if switching between CRUD and OLAP operations
    if (["create", "read", "update", "delete", "advanced"].includes(operation)) {
      setActiveOperation(operation);
    }
  };

  // Handle OLAP operation button clicks
  const handleOlapOperationClick = (operation) => {
    // Reset activeOperation if switching between CRUD and OLAP operations
    if (["rollup", "cube", "rank", "denseRank", "ntile", "firstValue", "unboundedPreceding", "recursive", "view"].includes(operation)) {
      setActiveOperation(operation);
    }
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

      {/* CRUD Operations */}
      <div className="operations">
        <h3>CRUD Operations:</h3>
        <button onClick={() => handleCrudOperationClick("create")}>
          <FontAwesomeIcon icon={faPlus} /> Create Row
        </button>
        <button onClick={() => handleCrudOperationClick("read")}>
          <FontAwesomeIcon icon={faTable} /> Read Table
        </button>
        <button onClick={() => handleCrudOperationClick("update")}>
          <FontAwesomeIcon icon={faPen} /> Update Table
        </button>
        <button onClick={() => handleCrudOperationClick("delete")}>
          <FontAwesomeIcon icon={faTrash} /> Delete Row
        </button>
        <button onClick={() => handleCrudOperationClick("advanced")}>
          <FontAwesomeIcon icon={faTasks} /> Advanced Ops
        </button>
      </div>

      {/* OLAP Queries */}
      <div className="olap-queries">
        <h3>OLAP Queries:</h3>
        <button onClick={() => handleOlapOperationClick("rollup")}>Rollup</button>
        <button onClick={() => handleOlapOperationClick("cube")}>Cube</button>
        <button onClick={() => handleOlapOperationClick("rank")}>Rank</button>
        <button onClick={() => handleOlapOperationClick("denseRank")}>Dense Rank</button>
        <button onClick={() => handleOlapOperationClick("ntile")}>Ntile</button>
        <button onClick={() => handleOlapOperationClick("firstValue")}>First Value</button>
        <button onClick={() => handleOlapOperationClick("unboundedPreceding")}>Unbounded Preceding</button>
        <button onClick={() => handleOlapOperationClick("recursive")}>Recursive</button>
        <button onClick={() => handleOlapOperationClick("view")}>View</button>
      </div>

      {/* Conditional Rendering Based on Active Operation */}
      {selectedTable && activeOperation && activeOperation !== "rollup" && activeOperation !== "cube" && activeOperation !== "rank" && activeOperation !== "denseRank" && activeOperation !== "ntile" && activeOperation !== "firstValue" && activeOperation !== "unboundedPreceding" && activeOperation !== "recursive" && activeOperation !== "view" && (
        <>
          {activeOperation === "create" && <CreateRowHelper selectedTable={selectedTable} />}
          {activeOperation === "read" && <ReadTableHelper selectedTable={selectedTable} />}
          {activeOperation === "update" && <UpdateTableHelper selectedTable={selectedTable} />}
          {activeOperation === "delete" && <DeleteRowHelper selectedTable={selectedTable} />}
          {activeOperation === "advanced" && <AdvancedOps />}
        </>
      )}

      {/* OLAP Queries Helper (Triggered directly by QueryPage buttons) */}
      {selectedTable && activeOperation && (
        activeOperation === "rollup" || activeOperation === "cube" || activeOperation === "rank" || activeOperation === "denseRank" || activeOperation === "ntile" || activeOperation === "firstValue" || activeOperation === "unboundedPreceding" || activeOperation === "recursive" || activeOperation === "view" ? (
          <OlapQueriesHelper selectedTable={selectedTable} activeOperation={activeOperation} />
        ) : null
      )}
    </div>
  );
}

export default QueryPage;