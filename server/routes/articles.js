// server/routes/index.js
const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ---------------------- Get All Table Routes ----------------------
router.get("/tables", (req, res) => {
  // SQL query to get all table names
  const query = "SHOW TABLES";

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to retrieve tables" });
    }

    // Extract table names from the result
    const tableNames = results.map((row) => Object.values(row)[0]);
    res.json({ tables: tableNames });
  });
});

// ---------------------- Get All Table Columns Routes ----------------------
router.get("/columns/:tableName", (req, res) => {
  const tableName = req.params.tableName;
  db.query(`DESCRIBE ${tableName}`, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching columns");
    }
    const columns = results.map((column) => ({
      column_name: column.Field,
      data_type: column.Type,
    }));
    res.json({ columns });
  });
});

// ---------------------- Create a New Row Routes ----------------------
router.post("/create-row/:tableName", (req, res) => {
  const { tableName } = req.params; // Table name from the URL
  const newRow = req.body; // New row data from the request body

  // Dynamically build the query
  const columns = Object.keys(newRow).join(", ");
  const values = Object.values(newRow)
    .map((value) => (typeof value === "string" ? `'${value}'` : value))
    .join(", ");

  const query = `INSERT INTO ${tableName} (${columns}) VALUES (${values})`;

  // Execute the query
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error inserting row:", err);
      return res.status(500).json({ error: "Failed to insert row" });
    }

    res
      .status(201)
      .json({ message: "Row created successfully", insertId: result.insertId });
  });
});

// ---------------------- Fetch Data Routes ----------------------
router.get("/tables/:tableName", (req, res) => {
  const { tableName } = req.params; // Get table name from the URL
  const { page = 1, limit = 10 } = req.query; // Get page and limit from query params, defaulting to 1 and 10

  // Validate that page and limit are positive integers
  const pageNumber = parseInt(page, 10);
  const pageLimit = parseInt(limit, 10);

  if (
    isNaN(pageNumber) ||
    pageNumber < 1 ||
    isNaN(pageLimit) ||
    pageLimit < 1
  ) {
    return res
      .status(400)
      .json({ error: "Page and limit must be positive integers" });
  }

  // Calculate the offset for pagination
  const offset = (pageNumber - 1) * pageLimit;

  // Sanitize the table name to prevent SQL injection (only allow alphanumeric characters and underscores)
  const sanitizedTableName = tableName.replace(/[^a-zA-Z0-9_]/g, "");

  // Count the total number of rows in the table
  const countQuery = `SELECT COUNT(*) AS total FROM ${sanitizedTableName}`;

  db.query(countQuery, (err, countResult) => {
    if (err) {
      console.error("Error counting rows:", err);
      return res
        .status(500)
        .json({ error: `Failed to count rows in ${sanitizedTableName} table` });
    }
    const totalRows = countResult[0].total;
    const totalPages = Math.ceil(totalRows / pageLimit);

    // If there are no rows in the table, return empty results
    if (totalRows === 0) {
      return res.json({
        page: pageNumber,
        limit: pageLimit,
        total: totalRows,
        totalPages,
        results: [],
      });
    }

    // Fetch the paginated data from the selected table
    const dataQuery = `SELECT * FROM ${sanitizedTableName} LIMIT ? OFFSET ?`;

    db.query(dataQuery, [pageLimit, offset], (err, dataResult) => {
      if (err) {
        console.error("Error fetching data:", err);
        return res
          .status(500)
          .json({
            error: `Failed to retrieve data from ${sanitizedTableName}`,
          });
      }

      // Return the paginated results along with total count and total pages
      res.json({
        page: pageNumber,
        limit: pageLimit,
        total: totalRows,
        totalPages,
        results: dataResult,
      });
    });
  });
});

router.get("/primaryKey/:tableName", (req, res) => {
  const { tableName } = req.params;

  // Query to get the primary key from the table
  db.query(
    `SHOW KEYS FROM ?? WHERE Key_name = 'PRIMARY'`,
    [tableName],
    (err, results) => {
      if (err) {
        console.error("Error fetching primary key:", err);
        return res.status(500).send("Error fetching primary key");
      }

      // If primary key exists, send it as response
      if (results.length > 0) {
        // The primary key column name is in the 'Column_name' field of the result
        const primaryKeyField = results[0].Column_name;
        res.json({ primaryKeyField });
      } else {
        // No primary key found for the table
        res.status(404).json({ error: "Primary key not found" });
      }
    }
  );
});

router.get("/:table/:primaryKeyField/:primaryKeyValue", (req, res) => {
  const { table, primaryKeyField, primaryKeyValue } = req.params;

  // Query the database to fetch the record based on the dynamic primary key field and value
  db.query(
    `SELECT * FROM ?? WHERE ?? = ?`,
    [table, primaryKeyField, primaryKeyValue], // Table name, dynamic primary key field and value
    (err, results) => {
      if (err) {
        console.error("Error fetching record:", err);
        return res.status(500).send("Error fetching record");
      }

      // If a record is found, return it
      if (results.length > 0) {
        return res.json(results[0]); // Send the first matching record
      } else {
        // No matching record found
        return res.status(404).json({ error: "Record not found" });
      }
    }
  );
});

// router.put('/:table/:primaryKeyField/:primaryKeyValue', (req, res) => {
//   const { table, primaryKeyField, primaryKeyValue } = req.params; // Extract params
//   const updatedData = req.body; // Extract the updated data from the request body

//   console.log('Arpit: ', updatedData);

//   // Constructing the SQL query dynamically based on updatedData fields
//   const fields = Object.keys(updatedData);
//   const values = Object.values(updatedData);

//   // Build the update query
//   let updateQuery = `UPDATE ${table} SET `;
//   fields.forEach((field, index) => {
//       updateQuery += `${field} = ?${index < fields.length - 1 ? "," : ""} `;
//   });
//   updateQuery += `WHERE ${primaryKeyField} = ?`;

//   console.log('Arpit updatequery: ', updateQuery);

//   // Execute the query
//   db.query(updateQuery, [...values, primaryKeyValue], (err, results) => {
//     if (err) {
//       console.error('Error updating record:', err);
//       return res.status(500).json({ error: 'Server error' });
//     }

//     if (results.affectedRows === 0) {
//       return res.status(404).json({ error: 'Record not found' });
//     }

//     return res.json({ message: 'Record updated successfully' });
//   });
// });

router.put("/:table/:primaryKeyField/:primaryKeyValue", (req, res) => {
  const { table, primaryKeyField, primaryKeyValue } = req.params; // Extract params
  const updatedData = req.body; // Extract the updated data from the request body

  // Preprocess updatedData to format date fields
  const formattedData = {};
  Object.keys(updatedData).forEach((field) => {
    if (
      typeof updatedData[field] === "string" &&
      updatedData[field].includes("T")
    ) {
      // Check if the field contains a date-time string and reformat it
      formattedData[field] = updatedData[field].split("T")[0]; // Extract only the date part
    } else {
      formattedData[field] = updatedData[field]; // Leave other fields as is
    }
  });

  console.log("Formatted Data: ", formattedData);

  // Constructing the SQL query dynamically based on formattedData fields
  const fields = Object.keys(formattedData);
  const values = Object.values(formattedData);

  // Build the update query
  let updateQuery = `UPDATE ${table} SET `;
  fields.forEach((field, index) => {
    updateQuery += `${field} = ?${index < fields.length - 1 ? "," : ""} `;
  });
  updateQuery += `WHERE ${primaryKeyField} = ?`;

  console.log("Update Query: ", updateQuery);

  // Execute the query
  db.query(updateQuery, [...values, primaryKeyValue], (err, results) => {
    if (err) {
      console.error("Error updating record:", err);
      return res.status(500).json({ error: "Server error" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Record not found" });
    }

    return res.json({ message: "Record updated successfully" });
  });
});

router.delete("/:table/:primaryKeyField/:primaryKeyValue", async (req, res) => {
  const { table, primaryKeyField, primaryKeyValue } = req.params;

  try {
    // Dynamically build the SQL query to delete the row
    const query = `DELETE FROM ${table} WHERE ${primaryKeyField} = ?`;

    // Execute the query
    db.query(query, [primaryKeyValue], (err, results) => {
      if (err) {
        console.error("Error deleting record:", err);
        return res.status(500).json({ error: "Error deleting record" });
      }

      if (results.affectedRows > 0) {
        return res.json({ message: "Record deleted successfully" });
      } else {
        return res.status(404).json({ error: "Record not found" });
      }
    });
  } catch (error) {
    console.error("Error deleting record:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

router.post("/execute-query", (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res
        .status(500)
        .json({ error: "Error executing query", message: err.message });
    }
    res.json({ results });
  });
});

module.exports = router;
