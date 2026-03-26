# Task Manager - Professional CRUD Application

A robust task management system featuring a secure PHP backend and a dynamic AJAX frontend.

## ✨ Features
- **Full CRUD:** Create, Read, Update, and Delete tasks seamlessly.
- **Status Workflow:** Track tasks through 'Created', 'WIP', and 'Completed' states.
- **Security:** Uses PHP PDO with prepared statements to prevent SQL injection.
- **Modern UI:** Clean, responsive interface built with vanilla CSS.

<a name="setup"></a>
## 🚀 Setup & Execution

### Database Configuration
1. Create a MySQL database named `task_manager`.
2. Import the schema:
   ```bash
   mysql -u [username] -p task_manager < setup.sql
   ```
3. Configure your credentials in `.env`.

### Web Server
1. Serve the `Task` directory using your preferred web server (Apache, Nginx, or PHP CLI).
   ```bash
   php -S localhost:8000
   ```
2. Access the app at `http://localhost:8000`.

## 📁 Key Components
- `api/tasks.php`: RESTful endpoints for task operations.
- `assets/script.js`: Frontend controller managing API interactions.
- `setup.sql`: Database schema definition.
