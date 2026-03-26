
<?php
/**
 * Database Configuration
 * In a production environment, these should be managed via Environment Variables.
 */

define('DB_HOST', getenv('DB_HOST') ?: 'sql212.infinityfree.com');
define('DB_PORT', getenv('DB_PORT') ?: '3306');
define('DB_NAME', getenv('DB_NAME') ?: 'if0_41480613_task_manager
');
define('DB_USER', getenv('DB_USER') ?: 'if0_41480613');
define('DB_PASS', getenv('DB_PASSWORD') ?: 'erlrqrmjiXa3uyE');

/**
 * Display errors during development. 
 * Set to 0 in production.
 */
ini_set('display_errors', 1);
error_reporting(E_ALL);
