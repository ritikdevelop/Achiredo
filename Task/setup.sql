CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task_name VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT 'Created' CHECK (status IN ('Created', 'WIP', 'Completed')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);