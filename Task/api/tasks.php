<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

// Handle preflight requests
if ($method === 'OPTIONS') {
    exit;
}

try {
    if ($method === 'GET') {
        // Fetch All Tasks
        $stmt = $pdo->query("SELECT * FROM tasks ORDER BY id DESC");
        $tasks = $stmt->fetchAll();
        echo json_encode($tasks);
    } elseif ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);

        if (!$input) {
            throw new Exception("Invalid JSON input");
        }

        $action = $input['action'] ?? '';

        if ($action === 'create') {
            $taskName = trim($input['task_name'] ?? '');

            if (empty($taskName)) {
                throw new Exception("Task name cannot be empty");
            }

$stmt = $pdo->prepare("INSERT INTO tasks (task_name) VALUES (:name)");
            $stmt->execute([':name' => $taskName]);
            $newId = $pdo->lastInsertId();
            $stmt = $pdo->prepare("SELECT * FROM tasks WHERE id = :id");
            $stmt->execute([':id' => $newId]);
            echo json_encode($stmt->fetch());
        } elseif ($action === 'update_status') {
            $id = filter_var($input['id'], FILTER_VALIDATE_INT);
            $status = $input['status'] ?? '';

            $validStatuses = ['Created', 'WIP', 'Completed'];
            if (!in_array($status, $validStatuses)) {
                throw new Exception("Invalid status provided");
            }

            if (!$id) {
                throw new Exception("Valid Task ID is required");
            }

            $stmt = $pdo->prepare("UPDATE tasks SET status = :status WHERE id = :id");
            $result = $stmt->execute([
                ':status' => $status,
                ':id' => $id
            ]);
            if (!$result || $stmt->rowCount() === 0) {
                throw new Exception("No task updated");
            }

            $stmt = $pdo->prepare("SELECT * FROM tasks WHERE id = :id");
            $stmt->execute([':id' => $id]);
            $updatedTask = $stmt->fetch();
            if (!$updatedTask) {
                throw new Exception("Task not found");
            }

            echo json_encode($updatedTask);
        } else {
            throw new Exception("Invalid action");
        }
    } else {
        http_response_code(405);
        echo json_encode(["error" => "Method Not Allowed"]);
    }
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(["error" => $e->getMessage()]);
}
