import React, { useState } from "react";
import { executeSqlQuery } from "../services/api";
import "../styles/AdvancedOps.css";

const AdvancedOps = () => {
  const [sqlQuery, setSqlQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle SQL query execution
  const handleExecuteQuery = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await executeSqlQuery(sqlQuery); // Call the API function
      console.log("Response Data:", response.data); // Debug: log the response

      // Check if the response contains an array of objects
      setResults(response.data.results); // Set the results from the query
      
    } catch (err) {
      console.error("Error executing query:", err);
      setError("Error executing query. Please check your syntax or query.");
      setResults([]); // Clear results on error
    } finally {
      setLoading(false);
    }
  };

  // Render the results as a table
  const renderTable = () => {
    if (!results || results.length === 0) {
      return <p>No results to display.</p>;
    }

    // Ensure we are dealing with an array of objects
    if (results[0] && typeof results[0] === "object") {
      const columns = Object.keys(results[0]); 
      return (
        <div className="table-container">
          <table className="query-results-table">
            <thead>
              <tr>
                {columns.map((col, index) => (
                  <th key={index}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((row, index) => (
                <tr key={index}>
                  {columns.map((col, colIndex) => (
                    <td key={colIndex}>{row[col]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <p>Invalid result format. Please check your query or try again.</p>;
    }
  };

  return (
    <div className="advanced-ops-container">
      <h3>Advanced Operations</h3>

      {/* Input Area for SQL Query */}
      <textarea
        className="sql-input"
        value={sqlQuery}
        onChange={(e) => setSqlQuery(e.target.value)}
        rows="6"
        placeholder="Enter your SQL query here..."
      ></textarea>

      {/* Execute Button */}
      <button
        className="execute-button"
        onClick={handleExecuteQuery}
        disabled={loading}
      >
        {loading ? "Executing..." : "Execute Query"}
      </button>

      {/* Error Message */}
      {error && <div className="query-error">{error}</div>}

      {/* Display Query Results */}
      {renderTable()}
    </div>
  );
};

export default AdvancedOps;
