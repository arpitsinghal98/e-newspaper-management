import React, { useState, useEffect } from "react";
import { getColumns, getTableData } from "../services/api"; // Import API functions
import "../styles/ReadTableHelper.css"; // Import the CSS styling

const ReadTableHelper = ({ selectedTable }) => {
  const [columns, setColumns] = useState([]); // Store table columns
  const [rows, setRows] = useState([]); // Store table rows
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state
  const [page, setPage] = useState(1); // Current page
  const [totalRows, setTotalRows] = useState(0); // Total rows in the table (for pagination)
  const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page, default to 10

  // Fetch columns and rows for the selected table when the component mounts or when the table changes
  useEffect(() => {
    const fetchTableData = async () => {
      if (selectedTable) {
        setLoading(true);
        setError(""); // Reset any previous errors

        try {
          // Fetch columns for the selected table
          const columnResponse = await getColumns(selectedTable);
          setColumns(columnResponse.data.columns);

          // Fetch data (rows) for the selected table with pagination
          const dataResponse = await getTableData(selectedTable, page, rowsPerPage);

          // Safely handle the response, focusing on `results` for rows, and `total` for total rows
          const rowsData = dataResponse?.data?.results || []; // Use `results` instead of `rows`
          setRows(rowsData);

          const totalRowsData = dataResponse?.data?.total || 0; // `total` gives the total number of rows
          setTotalRows(totalRowsData);

        } catch (error) {
          console.error("Error fetching table data:", error);
          setError("Failed to load table data. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTableData();
  }, [selectedTable, page, rowsPerPage]); // Re-fetch data when table, page, or rowsPerPage changes

  // Pagination Handlers
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1); // Go to previous page
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    if (page < totalPages) {
      setPage(page + 1); // Go to next page
    }
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value)); // Update rowsPerPage state
    setPage(1); // Reset to page 1 when rows per page change
  };

  return (
    <div className="read-table-container">
      <h3>Data from {selectedTable} Table</h3>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : rows.length === 0 ? (
        <p>No data available</p>
      ) : (
        <>
          {/* Rows per page dropdown */}
          <div className="rows-per-page">
            <label htmlFor="rowsPerPage">Rows per page:</label>
            <select
              id="rowsPerPage"
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>

          {/* Table with Scrollable Container */}
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column.column_name}>{column.column_name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {columns.map((column) => (
                      <td key={column.column_name}>{row[column.column_name]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={page === 1}>
              Previous
            </button>
            <span>
              Page {page} of {Math.ceil(totalRows / rowsPerPage)}
            </span>
            <button
              onClick={handleNextPage}
              disabled={page * rowsPerPage >= totalRows}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ReadTableHelper;
