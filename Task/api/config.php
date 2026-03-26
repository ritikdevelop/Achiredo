
<?php
/**
 * Database Configuration
 * In a production environment, these should be managed via Environment Variables.
 */

define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_PORT', getenv('DB_PORT') ?: '3306');
define('DB_NAME', getenv('DB_NAME') ?: 'task_manager');
define('DB_USER', getenv('DB_USER') ?: 'root');
define('DB_PASS', getenv('DB_PASSWORD') ?: '');

/**
 * Display errors during development. 
 * Set to 0 in production.
 */
ini_set('display_errors', 1);
error_reporting(E_ALL);
