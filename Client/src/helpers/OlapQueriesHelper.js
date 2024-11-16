import React, { useState } from 'react';
import { executeSqlQuery } from '../services/api'; // Assuming this API function is already set up

const OlapQueriesHelper = ({ selectedTable }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // OLAP Queries for different operations
  const olapQueries = {
    rollup: `
      SELECT year, quarter, SUM(sales) 
      FROM ${selectedTable} 
      GROUP BY ROLLUP(year, quarter);
    `,
    cube: `
      SELECT region, year, SUM(sales) 
      FROM ${selectedTable} 
      GROUP BY CUBE(region, year);
    `,
    rank: `
      SELECT product, sales, RANK() OVER (ORDER BY sales DESC) 
      FROM ${selectedTable};
    `,
    denseRank: `
      SELECT product, sales, DENSE_RANK() OVER (ORDER BY sales DESC) 
      FROM ${selectedTable};
    `,
    ntile: `
      SELECT product, sales, NTILE(4) OVER (ORDER BY sales DESC) 
      FROM ${selectedTable};
    `,
    firstValue: `
      SELECT product, sales, FIRST_VALUE(sales) OVER (ORDER BY sales DESC) 
      FROM ${selectedTable};
    `,
    unboundedPreceding: `
      SELECT product, sales, SUM(sales) OVER (ORDER BY sales ROWS UNBOUNDED PRECEDING) 
      FROM ${selectedTable};
    `,
    recursive: `
      WITH RECURSIVE category_hierarchy AS (
        SELECT category_id, parent_category_id, category_name
        FROM ${selectedTable}
        WHERE parent_category_id IS NULL
        UNION ALL
        SELECT c.category_id, c.parent_category_id, c.category_name
        FROM ${selectedTable} c
        JOIN category_hierarchy ch ON c.parent_category_id = ch.category_id
      )
      SELECT * FROM category_hierarchy;
    `,
    view: `
      CREATE VIEW ${selectedTable}_view AS
      SELECT * FROM ${selectedTable};
    `,
  };

  // Handle click on OLAP button
  const handleOlapQueryClick = (operation) => {
    setQuery(olapQueries[operation]);
  };

  // Execute SQL query
  const handleExecuteQuery = async () => {
    if (!query.trim()) {
      setError('Please select a valid OLAP operation.');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await executeSqlQuery(query);
      setResults(response.data.results || []);
    } catch (err) {
      setError('Error executing query.');
      console.error(err); // Log detailed error for debugging
    }
    setIsLoading(false);
  };

  return (
    <div className="olap-queries-container">
      <h3>OLAP Queries</h3>
      
      {/* Buttons to trigger OLAP operations */}
      <div className="olap-query-buttons">
        {Object.keys(olapQueries).map((operation) => (
          <button key={operation} onClick={() => handleOlapQueryClick(operation)}>
            {operation.charAt(0).toUpperCase() + operation.slice(1)}
          </button>
        ))}
      </div>

      {/* Display selected SQL query */}
      <div className="sql-input-container">
        <textarea
          className="sql-input"
          value={query}
          readOnly
          rows="5"
        />
      </div>

      {/* Execute query button */}
      <button
        onClick={handleExecuteQuery}
        className="execute-button"
        disabled={isLoading}
      >
        {isLoading ? 'Executing...' : 'Execute Query'}
      </button>

      {/* Display errors */}
      {error && <div className="query-error">{error}</div>}

      {/* Display query result */}
      {results.length > 0 && (
        <div className="query-result">
          <h4>Query Results</h4>
          <table className="query-results-table">
            <thead>
              <tr>
                {Object.keys(results[0]).map((col, index) => (
                  <th key={index}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.keys(row).map((col, colIndex) => (
                    <td key={colIndex}>{row[col]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OlapQueriesHelper;