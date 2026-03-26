# Achiredo - Projects Repository

[![Node.js](https://img.shields.io/badge/Node.js-v18+-informational)](https://nodejs.org/)
[![PHP](https://img.shields.io/badge/PHP-8+-informational)](https://www.php.net/)
[![MySQL](https://img.shields.io/badge/MySQL-8+-informational)](https://www.mysql.com/)

A repository containing two production-ready web applications:

1. **Workshop Digital Twin** - Real-time voltage drop monitoring dashboard for manufacturing lines
2. **Task Manager** - Full-stack CRUD task management application



## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18+)
- **PHP** (8.0+)
- **MySQL** (8.0+)
- **Web server** (Apache/Nginx or PHP built-in server)
- **Git**

### 1. Workshop Digital Twin (Live-Mockup)

#### Backend Setup
\`\`\`bash
cd Live-Mockup/backend
npm install
npm start
\`\`\`
Server runs on \`http://localhost:3000\`

#### Frontend
Open \`Live-Mockup/index.html\` in browser. Auto-connects to backend via Socket.io (real-time) with polling fallback.

**Features:**
- Real-time voltage drop monitoring across 4 lines (LINE-1 to LINE-4)
- Room-wise station data (PROPELLIA/SUBPROPELLIA stations)
- Live total drop calculations
- Responsive grid layout

### 2. Task Manager

#### Database Setup
1. Create MySQL database:
\`\`\`sql
CREATE DATABASE task_manager;
\`\`\`
2. Run schema:
\`\`\`bash
mysql -u root -p task_manager < Task/setup.sql
\`\`\`

#### Environment (.env)
Edit \`Task/.env\`:
\`\`\`
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=task_manager
DB_USER=root
DB_PASSWORD=your_password
\`\`\`

#### API Server
\`\`\`bash
cd Task
php -S localhost:8000 -t .
\`\`\`
API endpoints: \`http://localhost:8000/api/tasks.php\`

#### Frontend
Open \`Task/index.html\` in browser or serve via \`php -S\`.

**Features:**
- Add/Edit tasks
- Status management (Created → WIP → Completed)
- Real-time UI updates via AJAX
- Responsive design
- Secure PDO with prepared statements

## 🛠️ Development

### Workshop Backend
- Edit \`dataGenerator.js\` for custom voltage simulation
- \`npm start\` auto-restarts on changes (add nodemon for dev)

### Task Manager
- PHP API fully handles CORS
- Add validation/auth in \`api/tasks.php\`
- Extend schema in \`setup.sql\`

## 📱 Screenshots

**Workshop Dashboard:**
![Workshop Dashboard](screenshots/workshop-dashboard.png)

**Task Manager:**
![Task Manager](screenshots/task-manager.png)

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| Socket.io fails | Check \`localhost:3000\` backend running |
| CORS errors | PHP API has CORS headers enabled |
| DB connection | Verify \`.env\` credentials & \`setup.sql\` run |
| npm errors | \`rm -rf node_modules package-lock.json && npm install\` |

## 🤝 Contributing

1. Fork & clone
2. Create feature branch (\`git checkout -b feature/amazing\`)
3. Commit changes (\`git commit -am 'Add amazing feature'\`)
4. Push & PR

## 📄 License

MIT License - see [LICENSE](LICENSE) (create if needed)

---

*Built with ❤️ for industrial & productivity applications*

\`\`\`bash
# Run both apps
# Terminal 1: cd Live-Mockup/backend && npm start
# Terminal 2: cd Task && php -S localhost:8000
# Open: Live-Mockup/index.html & Task/index.html
\`\`\`

