<?php
/**
 * CSRF Protection Functions
 * 
 * This file contains functions to generate and validate CSRF tokens
 * to protect against Cross-Site Request Forgery attacks.
 */

/**
 * Generate a CSRF token and store it in the session
 * 
 * @return string The generated CSRF token
 */
function generateCSRFToken() {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    
    // Generate a random token
    $token = bin2hex(random_bytes(32));
    
    // Store the token in session
    $_SESSION['csrf_token'] = $token;
    
    return $token;
}

/**
 * Validate a CSRF token against the one stored in session
 * 
 * @param string $token The token to validate
 * @return bool True if the token is valid, false otherwise
 */
function validateCSRFToken($token) {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    
    // Check if token exists in session
    if (!isset($_SESSION['csrf_token'])) {
        return false;
    }
    
    // Check if provided token matches the one in session
    if (!hash_equals($_SESSION['csrf_token'], $token)) {
        return false;
    }
    
    // Token is valid, remove it to prevent reuse
    unset($_SESSION['csrf_token']);
    
    return true;
}

/**
 * Get the current CSRF token from session or generate a new one
 * 
 * @return string The CSRF token
 */
function getCSRFToken() {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    
    // Return existing token if it exists
    if (isset($_SESSION['csrf_token'])) {
        return $_SESSION['csrf_token'];
    }
    
    // Generate a new token if none exists
    return generateCSRFToken();
}
?>