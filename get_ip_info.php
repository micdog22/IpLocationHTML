<?php

header("Content-Type: application/json");

// Function to get the client IP address, considering proxies
function get_client_ip() {
    $ipaddress = 
    getenv("HTTP_CLIENT_IP") ?: 
    getenv("HTTP_X_FORWARDED_FOR") ?: 
    getenv("HTTP_X_FORWARDED") ?: 
    getenv("HTTP_FORWARDED_FOR") ?: 
    getenv("HTTP_FORWARDED") ?: 
    getenv("REMOTE_ADDR");

    // Handle comma-separated IPs in X-Forwarded-For
    if (strpos($ipaddress, ",") !== false) {
        $ips = explode(",", $ipaddress);
        $ipaddress = trim($ips[0]);
    }

    return $ipaddress;
}

$ip_address = get_client_ip();

// Fallback for local testing if IP is loopback or private
if (filter_var($ip_address, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) === false) {
    // Attempt to get public IP using an external service (if running locally)
    // Note: This might fail depending on server configuration (allow_url_fopen)
    $external_ip_content = @file_get_contents("https://api.ipify.org?format=json");
    if ($external_ip_content !== false) {
        $external_ip_data = json_decode($external_ip_content, true);
        if (isset($external_ip_data["ip"])) {
            $ip_address = $external_ip_data["ip"];
        }
    }
    // If still local/private after trying external service, return dummy data
    if (filter_var($ip_address, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) === false) {
        echo json_encode([
            "ip" => $ip_address, // Show the local/private IP found
            "country" => "Local/Private",
            "region" => "N/A",
            "city" => "N/A",
            "error" => "Detected local or private IP address."
        ]);
        exit;
    }
}

// Use ipinfo.io for geolocation
$api_url = "https://ipinfo.io/{$ip_address}/json";
$options = [
    "http" => [
        "header" => "User-Agent: PHP-IP-Locator/1.0\r\n",
        "timeout" => 5 // 5 seconds timeout
    ]
];
$context = stream_context_create($options);

// Use @ to suppress warnings on failure, we handle errors below
$response = @file_get_contents($api_url, false, $context);

if ($response === false) {
    // Handle errors during the API call
    $error_info = error_get_last();
    http_response_code(500);
    echo json_encode(["error" => "Could not retrieve geolocation data. " . ($error_info["message"] ?? "Network error or timeout.")]);
    exit;
}

$data = json_decode($response, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(500);
    echo json_encode(["error" => "Failed to parse geolocation data."]);
    exit;
}

// Prepare the final output
$info = [
    "ip" => $data["ip"] ?? $ip_address, // Use IP from API if available
    "country" => $data["country"] ?? "N/A",
    "region" => $data["region"] ?? "N/A",
    "city" => $data["city"] ?? "N/A"
];

echo json_encode($info);

?>

