<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP IP Locator [H4CK3R_3D1T10N]</title>
    <link rel="stylesheet" href="static/style.css">
</head>
<body>
    <div id="container">
        <div id="initial-message">
            &gt; ACCESS GRANTED :: CLICK TO REVEAL TARGET INFO...
        </div>
        <div id="info-terminal" style="display: none;">
            <!-- IP Info -->
            <div class="info-line" data-label="IP Address"></div>
            <div class="info-line" data-label="Hostname"></div>
            <div class="info-line" data-label="Location"></div>
            <div class="info-line" data-label="Coordinates"></div>
            <div class="info-line" data-label="Organization"></div>
            <div class="info-line" data-label="Postal Code"></div>
            <div class="info-line" data-label="Timezone"></div>
            
            <!-- Browser Info -->
            <div class="info-line" data-label="User Agent"></div>
            <div class="info-line" data-label="Screen Resolution"></div>
            <div class="info-line" data-label="Browser Language"></div>
            
            <!-- Status/Error -->
            <div id="error-message" class="info-line" data-label="Status"></div>
            <div id="readme-link" class="info-line" data-label="Readme" style="display: none;"></div>
            
            <div class="info-line final-prompt">&gt; DATA ACQUISITION COMPLETE :: STANDING BY...</div>
        </div>
    </div>

    <!-- Audio Player (Source needs to be a direct link to an audio file) -->
    <audio id="background-music" loop>
        <source src="" type="audio/mpeg"> <!-- Leave src empty or replace with a direct MP3/OGG link -->
        Your browser does not support the audio element.
    </audio>

    <script src="static/script.js"></script>
</body>
</html>

