import React, { useState, useEffect } from "react";
import "../styles/Query.css"; // Import your CSS file
import Navbar from "../components/Navbar";
import CreateRowHelper from "../helpers/CreateRowHelper"; 
import ReadTableHelper from "../helpers/ReadTableHelper"; 
import UpdateTableHelper from "../helpers/UpdateTableHelper"; 
import DeleteRowHelper from "../helpers/DeleteRowHelper"; 
import { getTables } from "../services/api"; 
import AdvancedOps from "../helpers/AdvancedOps"; 
import OlapQueriesHelper from "../helpers/OlapQueriesHelper";

function QueryPage() {
  const [selectedTable, setSelectedTable] = useState(""); 
  const [tableNames, setTableNames] = useState([]); 
  const [activeOperation, setActiveOperation] = useState(""); 

  useEffect(() => {
    const fetchTableNames = async () => {
      try {
        const response = await getTables();
        setTableNames(response.data.tables);
        if (response.data.tables.length > 0) {
          setSelectedTable(response.data.tables[0]);
        }
      } catch (error) {
        console.error("Error fetching table names:", error);
      }
    };
    fetchTableNames();
  }, []);

  const handleTableChange = (event) => {
    setSelectedTable(event.target.value);
    setActiveOperation(""); 
  };

  const handleCrudOperationClick = (operation) => {
    if (["create", "read", "update", "delete", "advanced"].includes(operation)) {
      setActiveOperation(operation);
    }
  };

  const handleOlapOperationClick = (operation) => {
    if (["rollup", "cube", "rank", "denseRank", "ntile", "firstValue", "unboundedPreceding", "recursive", "view"].includes(operation)) {
      setActiveOperation(operation);
    }
  };

  return (
    <div className="query-page">
      <Navbar />
      <h1>Query Page</h1>

      {/* Hero Section for Background Image */}
      <section className="hero-section">
        <img src="9.jpg" alt="Hero Image" />
      </section>

      {/* Table Selection */}
      <div className="table-selection">
        <label htmlFor="tableSelect">Select Table:</label>
        <select
          id="tableSelect"
          value={selectedTable}
          onChange={handleTableChange}
        >
          {tableNames.length === 0 ? (
            <option>Loading tables...</option>
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
        <h3>CRUD Operations:</h3>
        <button onClick={() => handleCrudOperationClick("create")}>Create Row</button>
        <button onClick={() => handleCrudOperationClick("read")}>Read Table</button>
        <button onClick={() => handleCrudOperationClick("update")}>Update Table</button>
        <button onClick={() => handleCrudOperationClick("delete")}>Delete Row</button>
        <button onClick={() => handleCrudOperationClick("advanced")}>Advanced Ops</button>
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

      {/* Query Results */}
      <div className="query-results">
        {activeOperation === "create" && <CreateRowHelper />}
        {activeOperation === "read" && <ReadTableHelper tableName={selectedTable} />}
        {activeOperation === "update" && <UpdateTableHelper tableName={selectedTable} />}
        {activeOperation === "delete" && <DeleteRowHelper tableName={selectedTable} />}
        {activeOperation === "advanced" && <AdvancedOps />}
        {activeOperation === "rollup" && <OlapQueriesHelper operation="rollup" />}
        {activeOperation === "cube" && <OlapQueriesHelper operation="cube" />}
        {activeOperation === "rank" && <OlapQueriesHelper operation="rank" />}
        {activeOperation === "denseRank" && <OlapQueriesHelper operation="denseRank" />}
        {activeOperation === "ntile" && <OlapQueriesHelper operation="ntile" />}
        {activeOperation === "firstValue" && <OlapQueriesHelper operation="firstValue" />}
        {activeOperation === "unboundedPreceding" && <OlapQueriesHelper operation="unboundedPreceding" />}
        {activeOperation === "recursive" && <OlapQueriesHelper operation="recursive" />}
        {activeOperation === "view" && <OlapQueriesHelper operation="view" />}
      </div>
    </div>
  );
}

export default QueryPage;
