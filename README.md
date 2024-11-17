# E-Newspaper Management System

This repository contains the codebase for the **E-Newspaper Management System**, developed as part of the coursework for **CS425: Database Organization**. This project aims to create a comprehensive online newspaper management platform, incorporating advanced database features, complex SQL queries, and analytics, while showcasing a modern full-stack development approach.

## Project Structure

The project is divided into two main components:

1. **Client**: A web interface built using [React](https://reactjs.org/).
2. **Server**: A backend API implemented with [Node.js](https://nodejs.org/) that connects with a [MySQL](https://www.mysql.com/) database.

### Folder Structure

- **`client/`**: This folder contains the front-end code for the E-Newspaper Management System. The user interface enables interactions such as creating, updating, reading and deleting the tables. It also allows to write customized advanced SQL queries and get the results on the UI. This UI also gives the response of **OLAP queries** and **windows functions**
- **`server/`**: This folder contains the back-end code that handles requests from the client and interacts with the MySQL database. It implements all the complex logic and SQL queries, providing a seamless interface for data management ensuring proper and graceful **Error Handling**.

## Key Features

- **Full CRUD Operations**: Users can create, read, update, and delete articles, authors, categories and many other tables.
- **Complex SQL Queries**: This project uses sophisticated SQL queries, including:
  - **OLAP (Online Analytical Processing)**: To provide deeper insights into newspaper readership and content performance.
  - **Joins, Subqueries, and Indexes**: To efficiently manage data relationships and optimize performance.
- **Data Analytics**: Utilizes the MySQL database to generate reports for content insights, popularity, and other metrics, making use of OLAP queries to gain business insights.

## Technologies Used

- **Front-end**: React.js (JavaScript, HTML, CSS)
- **Back-end**: Node.js (Express.js)
- **Database**: MySQL (with complex SQL queries, OLAP functionality)

## Installation

To run this project locally, clone the repository and follow the steps below:

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [MySQL](https://www.mysql.com/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/arpitsinghal98/e-newspaper-management.git
   cd e-newspaper-management
   ```

2. **Server Setup**

   - Navigate to the `server` folder:
     ```bash
     cd server
     ```
   - Install server dependencies:
     ```bash
     npm install
     ```
   - Rename the `.env-example` to `.env` in the `server` directory and update the MySQL connection details as per your configurations:
     ```env
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=yourpassword
     DB_NAME=e_newspaper_db
     ```
   - Start the server:
     ```bash
     npm start
     ```

3. **Client Setup**

   - Navigate to the `client` folder:
     ```bash
     cd ../client
     ```
   - Install client dependencies:
     ```bash
     npm install
     ```
   - Start the client:
     ```bash
     npm start
     ```

4. **Access the Application**
   - The client application will be available at `http://localhost:3000`
   - The server runs on `http://localhost:9000`

## Database Details

The MySQL database is designed to store and manage information about articles, authors, readers, and categories. Some highlights include:

- **Authors Table**: Stores author information such as name, bio, and contact details.
- **Articles Table**: Contains article details like title, content, publication date, and category.
- **Categories Table**: Maintains different categories for classifying articles.
- **Readers Table**: Stores reader data, useful for tracking engagement and activity.

### OLAP Features

- Analytical reports are generated using complex OLAP queries to provide insights such as:
  - **Most Popular Articles**: Based on views and user interaction.
  - **Reader Engagement**: Tracking and segmenting readership by categories and time.
  - **Author Contributions**: Analysis of content contributions by authors.

## Group Members and Contributions

- Note: Every team member have contributed equally in this project
  | Group Member | Contribution Description |
  |-------------------|----------------------------------------------------------------|
  | **Arpit Singhal** | Worked on the server-side implementation, including API routes, database integration, and complex SQL queries such as OLAP. Also performed integrations of UI and API|
  | **Ayush Upadhyay**| Developed the client-side using React, implemented UI components, user interactions, and integrated the API endpoints. |
  | **Haard Patel** | Contributed to database design, performing database functionalities including creating the schema, creating SQL queries of CRUD operations and other complex analytics to put in the backend api. |

## Future Improvements

- **Role-based Access Control (RBAC)**: Adding different roles for admins, editors, and readers. and add Authentication
- **Responsive Design**: Enhancing mobile view compatibility.
- **Advanced Analytics**: Leverage the use of ORM (Object-Relaitonal Mapping) to isolate programming logic from the database.

## Contact

For questions or suggestions, feel free to open an issue or reach out:

- **Arpit Singhal**: asinghal4@hawk.iit.edu
- **Ayush Upadhyay**: aupadhyay5@hawk.iit.edu
- **Haard Patel**: hpatel161@hawk.iit.edu

---

Thank you for checking out our **E-Newspaper Management System**. We hope you find it insightful and useful!
