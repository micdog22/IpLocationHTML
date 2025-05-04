document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("container");
    const initialMessage = document.getElementById("initial-message");
    const ipInfoDiv = document.getElementById("ip-info");
    const ipAddressSpan = document.getElementById("ip-address");
    const countrySpan = document.getElementById("country");
    const regionSpan = document.getElementById("region");
    const citySpan = document.getElementById("city");
    const errorMessageP = document.getElementById("error-message");

    container.addEventListener("click", async () => {
        // Hide initial message and change cursor
        initialMessage.style.display = "none";
        container.style.cursor = "default";

        try {
            // Fetch data from the PHP backend script
            const response = await fetch("get_ip_info.php");
            if (!response.ok) {
                let errorText = `HTTP error! status: ${response.status}`;
                try {
                    // Try to parse error from PHP JSON response
                    const errorData = await response.json();
                    if (errorData && errorData.error) {
                        errorText = errorData.error;
                    }
                } catch (e) {
                    // Ignore if response is not JSON
                }
                throw new Error(errorText);
            }
            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            // Update the spans with the received data
            ipAddressSpan.textContent = data.ip || "N/A";
            countrySpan.textContent = data.country || "N/A";
            regionSpan.textContent = data.region || "N/A";
            citySpan.textContent = data.city || "N/A";

            // Show the IP info div
            ipInfoDiv.style.display = "block";
            errorMessageP.textContent = ""; // Clear any previous error

        } catch (error) {
            console.error("Error fetching IP info:", error);
            errorMessageP.textContent = `Error: ${error.message}`;
            // Show the info div even on error to display the message
            ipInfoDiv.style.display = "block";
            // Optionally hide specific fields if error occurred
            ipAddressSpan.textContent = "Error";
            countrySpan.textContent = "-";
            regionSpan.textContent = "-";
            citySpan.textContent = "-";
        }
    }, { once: true }); // Ensure the event listener runs only once
});

