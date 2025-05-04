<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP IP Locator</title>
    <link rel="stylesheet" href="static/style.css">
</head>
<body>
    <div id="container">
        <div id="initial-message">
            CLICK TO ENTER...
        </div>
        <div id="ip-info" style="display: none;">
            <p>IP Address: <span id="ip-address"></span></p>
            <p>Country: <span id="country"></span></p>
            <p>Region: <span id="region"></span></p>
            <p>City: <span id="city"></span></p>
            <p id="error-message" style="color: red;"></p>
        </div>
    </div>
    <script src="static/script.js"></script>
</body>
</html>

