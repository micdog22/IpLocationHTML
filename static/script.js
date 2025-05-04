document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("container");
    const initialMessage = document.getElementById("initial-message");
    const infoTerminal = document.getElementById("info-terminal");
    const infoLines = infoTerminal.querySelectorAll(".info-line:not(.final-prompt)");
    const finalPrompt = infoTerminal.querySelector(".final-prompt");
    const errorMessageLine = document.getElementById("error-message");
    const readmeLinkLine = document.getElementById("readme-link");
    const backgroundMusic = document.getElementById("background-music");

    // --- Configuration ---
    const typingDelay = 50; // Milliseconds between characters
    const lineDelay = 150; // Milliseconds between lines appearing
    // --- End Configuration ---

    let lineIndex = 0;

    // Function to simulate typing effect
    async function typeLine(element, text) {
        element.style.opacity = 1; // Make line visible before typing
        const label = element.getAttribute("data-label") + ": ";
        element.textContent = ""; // Clear existing text
        
        // Type label (white)
        const labelSpan = document.createElement("span");
        labelSpan.style.color = "#FFFFFF";
        labelSpan.style.fontWeight = "bold";
        element.appendChild(labelSpan);
        for (let i = 0; i < label.length; i++) {
            labelSpan.textContent += label[i];
            await new Promise(resolve => setTimeout(resolve, typingDelay / 2)); // Faster label typing
        }

        // Type value (green)
        const valueSpan = document.createElement("span");
        valueSpan.style.color = "#00FF00";
        element.appendChild(valueSpan);
        for (let i = 0; i < text.length; i++) {
            valueSpan.textContent += text[i];
            if (text[i] !== " ") { // Only delay for non-space characters
                 await new Promise(resolve => setTimeout(resolve, typingDelay));
            }
        }
    }

    // Function to display lines sequentially
    async function displayInfo(data) {
        const linesToDisplay = [
            { label: "IP Address", value: data.ip },
            { label: "Hostname", value: data.hostname },
            { label: "Location", value: `${data.city}, ${data.region}, ${data.country}` },
            { label: "Coordinates", value: data.loc },
            { label: "Organization", value: data.org },
            { label: "Postal Code", value: data.postal },
            { label: "Timezone", value: data.timezone },
            { label: "User Agent", value: navigator.userAgent },
            { label: "Screen Resolution", value: `${screen.width}x${screen.height}` },
            { label: "Browser Language", value: navigator.language }
        ];

        for (const lineData of linesToDisplay) {
            const lineElement = infoTerminal.querySelector(`.info-line[data-label="${lineData.label}"]`);
            if (lineElement && lineData.value && lineData.value !== "N/A") {
                await typeLine(lineElement, lineData.value);
                await new Promise(resolve => setTimeout(resolve, lineDelay));
            }
        }
        
        // Handle Readme link if present
        if (data.readme) {
            const readmeElement = readmeLinkLine;
            const link = document.createElement("a");
            link.href = data.readme;
            link.target = "_blank";
            link.textContent = data.readme;
            readmeElement.innerHTML = ""; // Clear potential previous content
            readmeElement.appendChild(link);
            readmeElement.style.display = "block";
            await typeLine(readmeElement, ""); // Type label only
            await new Promise(resolve => setTimeout(resolve, lineDelay));
        }

        // Show final prompt
        finalPrompt.style.opacity = 1;
    }

    container.addEventListener("click", async () => {
        // Hide initial message and change cursor
        initialMessage.style.display = "none";
        container.style.cursor = "default";
        infoTerminal.style.display = "block";

        // Attempt to play music
        try {
            if (backgroundMusic.querySelector("source")?.getAttribute("src")) {
                 await backgroundMusic.play();
            }
        } catch (err) {
            console.warn("Could not play background music:", err);
            // Optionally display a message about music not playing
        }

        try {
            // Fetch data from the PHP backend script
            const response = await fetch("get_ip_info.php");
            if (!response.ok) {
                let errorText = `CONNECTION ERROR :: STATUS ${response.status}`;
                try {
                    const errorData = await response.json();
                    if (errorData && errorData.error) {
                        errorText = `ERROR :: ${errorData.error}`;
                    }
                } catch (e) { /* Ignore if response is not JSON */ }
                throw new Error(errorText);
            }
            const data = await response.json();

            if (data.error && !data.ip) { // Check if it's a fatal error from PHP
                 throw new Error(`ERROR :: ${data.error}`);
            }

            // Start displaying info
            await displayInfo(data);
            if (data.error) { // Display non-fatal errors (like local IP detection)
                 await typeLine(errorMessageLine, data.error);
            }

        } catch (error) {
            console.error("Error fetching or displaying IP info:", error);
            await typeLine(errorMessageLine, error.message || "UNKNOWN SYSTEM ERROR");
            finalPrompt.style.opacity = 1; // Show final prompt even on error
        }
    }, { once: true }); // Ensure the event listener runs only once
});

