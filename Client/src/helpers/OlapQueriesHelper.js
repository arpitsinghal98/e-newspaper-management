// OlapQueriesHelper.jsx

import React, { useState, useEffect } from "react";
import { executeSqlQuery } from "../services/api";
import "../styles/OlapQueriesHelper.css";

const OlapQueriesHelper = ({ selectedTable, activeOperation }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const olapQueries = {
    rollup: `
    SELECT category_id, published_date, SUM(likes)
    FROM Article
    GROUP BY ROLLUP(category_id, published_date);
  `,
    cube: `
    SELECT category_id, published_date, SUM(number_of_views)
    FROM Article
    GROUP BY CUBE(category_id, published_date);
  `,
    rank: `
    SELECT title, likes, RANK() OVER (ORDER BY likes DESC) AS rank_value
    FROM Article;
  `,
    denseRank: `
    SELECT title, likes, DENSE_RANK() OVER (ORDER BY likes DESC) AS dense_rank_value
    FROM Article;
  `,
    ntile: `
    SELECT title, likes, NTILE(4) OVER (ORDER BY likes DESC) AS quartile
    FROM Article;
  `,
    firstValue: `
    SELECT title, likes, FIRST_VALUE(title) OVER (ORDER BY likes DESC) AS first_title
    FROM Article;
  `,
    unboundedPreceding: `
    SELECT title, likes, SUM(likes) OVER (ORDER BY likes ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cumulative_likes
    FROM Article;
  `,
    recursive: `
    WITH RECURSIVE category_hierarchy AS (
      SELECT category_id, category_name
      FROM Category
      WHERE category_id = 1
      UNION ALL
      SELECT c.category_id, c.category_name
      FROM Category c
      JOIN category_hierarchy ch ON c.category_id = ch.category_id + 1
    )
    SELECT * FROM category_hierarchy;
  `,
    view: `
    CREATE VIEW Article_view AS
    SELECT article_id, title, likes, number_of_comments
    FROM Article;
  `,
  };

  // Use effect to trigger query when activeOperation changes
  useEffect(() => {
    if (activeOperation && olapQueries[activeOperation]) {
      setQuery(olapQueries[activeOperation]);
    }
  }, [activeOperation, selectedTable]);

  // Execute SQL query
  const handleExecuteQuery = async () => {
    if (!query.trim()) {
      setError("Please select a valid OLAP operation.");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await executeSqlQuery(query);
      setResults(response.data.results || []);
    } catch (err) {
      setError(err.response.data.message);
      console.error(err); // Log detailed error for debugging
    }
    setIsLoading(false);
  };

  return (
    <div className="olap-queries-container">
      <h3>OLAP Query Results</h3>

      {/* Display selected SQL query */}
      <div className="sql-input-container">
        <textarea className="sql-input" value={query} readOnly rows="5" />
      </div>

      {/* Execute query button */}
      <button
        onClick={handleExecuteQuery}
        className="execute-button"
        disabled={isLoading}
      >
        {isLoading ? "Executing..." : "Execute Query"}
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
