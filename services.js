/*
Name: Kate Zeumer
Course: CPST 342
Term: Fall 2026

MPLS Dog Boarding - Services Page
Accessible service selection and estimate calculator
*/

// Service names
const names = {
    boarding: "Boarding",
    daycare: "Daycare",
    grooming: "Grooming",
    training: "Training",
    webcam: "Webcam Access",
    taxi: "Pet Taxi",
    gift: "Gift Cards",
    member: "Memberships"
};

// Service prices from the original code
const prices = {
    boarding: 75,
    daycare: 45,
    grooming: 60,
    training: 50,
    webcam: 10,
    taxi: 25,
    gift: 50,
    member: 30
};

// Dog size price adjustments
const factor = {
    S1: 1,
    M2: 1,
    L3: 1.1,
    XL4: 1.2
};

// Selected services
let chosen = [];

// Get page elements
const list = document.getElementById("list");
const total = document.getElementById("total");
const sizeSelect = document.getElementById("size");
const spinner = document.getElementById("spinner");

const dropOff = document.getElementById("d1");
const pickUp = document.getElementById("d2");

const dateError = document.getElementById("date-error");
const statusMessage = document.getElementById("estimate-status");

const resetButton = document.getElementById("reset");
const calculateButton = document.getElementById("go");
const sendButton = document.getElementById("send");

const serviceButtons = document.querySelectorAll(".svc");

// Get today's date in local time
function localDateString() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


// Display a clear error message
function showDateError(field, message) {
    dateError.textContent = "Error: " + message;

    field.setAttribute("aria-invalid", "true");

    // Move keyboard focus to the problem field
    field.focus();
}

// Clear previous date errors
function clearDateErrors() {
    dateError.textContent = "";

    dropOff.removeAttribute("aria-invalid");
    pickUp.removeAttribute("aria-invalid");
}


// Text fields do not support min date restrictions.
// Validation will happen when calculating the estimate.
function updateDateLimits() {
    // No date-picker restrictions needed.
}

// Convert MM/DD/YYYY into a valid calendar date.
function parseDate(value) {
    const match = value.trim().match(
        /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/
    );

    if (!match) {
        return null;
    }

    const month = Number(match[1]);
    const day = Number(match[2]);
    const year = Number(match[3]);

    const date = new Date(year, month - 1, day);

    if (
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day
    ) {
        return null;
    }

    return date;
}

function validateDates() {
    clearDateErrors();

    const firstDate = parseDate(dropOff.value);
    const secondDate = parseDate(pickUp.value);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!firstDate) {
        showDateError(
            dropOff,
            "Enter a valid drop off date in MM/DD/YYYY format."
        );
        return false;
    }

    if (firstDate < today) {
        showDateError(
            dropOff,
            "Drop off date cannot be in the past."
        );
        return false;
    }

    if (!secondDate) {
        showDateError(
            pickUp,
            "Enter a valid pick up date in MM/DD/YYYY format."
        );
        return false;
    }

    if (secondDate < firstDate) {
        showDateError(
            pickUp,
            "Pick up date cannot be before the drop off date."
        );
        return false;
    }

    return true;
}


    if (firstDate < today) {
        showDateError(
            dropOff,
            "Drop off date cannot be in the past."
        );
        return false;
    }

    if (!secondDate) {
        showDateError(
            pickUp,
            "Choose a pick up date."
        );
        return false;
    }

    if (secondDate < firstDate) {
        showDateError(
            pickUp,
            "Pick up date cannot be before the drop off date."
        );
        return false;
    }

    return true;
}

// Update selected services and estimated total

function render() {
    list.innerHTML = "";

    let sum = 0;

    chosen.forEach(function(key) {
        const item = document.createElement("li");

        // Display service name and price
        const serviceText = document.createElement("span");
        serviceText.textContent =
            names[key] + ": $" + prices[key].toFixed(2) + " ";

        // Create an individual Remove button
        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.className = "remove-btn";
        removeButton.textContent = "Remove " + names[key];

        // Remove only the selected service
        removeButton.addEventListener("click", function() {
            chosen = chosen.filter(function(service) {
                return service !== key;
            });

            render();

            statusMessage.textContent =
                names[key] + " removed from your estimate.";

            // Return focus to the service selection button
            const serviceButton = document.querySelector(
                '.svc[data-key="' + key + '"]'
            );

            if (serviceButton) {
                serviceButton.focus();
            }
        });

        item.appendChild(serviceText);
        item.appendChild(removeButton);
        list.appendChild(item);

        sum += prices[key];
    });

    // Calculate updated total
    const multiplier = factor[sizeSelect.value] || 1;
    const estimatedTotal = sum * multiplier;

    total.textContent = "$" + estimatedTotal.toFixed(2);

    // Update selected button states
    serviceButtons.forEach(function(button) {
        const key = button.getAttribute("data-key");
        const selected = chosen.includes(key);

        button.setAttribute("aria-pressed", String(selected));
    });
}

// Select or deselect a service
serviceButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const key = button.getAttribute("data-key");

        if (chosen.includes(key)) {
            chosen = chosen.filter(function(item) {
                return item !== key;
            });
        } else {
            chosen.push(key);
        }

        render();

        statusMessage.textContent =
            names[key] +
            (chosen.includes(key)
                ? " added to your estimate."
                : " removed from your estimate.");
    });
});

// Update total when dog size changes
sizeSelect.addEventListener("change", function() {
    render();

    statusMessage.textContent =
        "Dog size updated. Estimated total recalculated.";
});

// Update date restrictions when dates change
dropOff.addEventListener("change", function() {
    updateDateLimits();
    clearDateErrors();
});

pickUp.addEventListener("change", clearDateErrors);

// Clear all selections
resetButton.addEventListener("click", function() {
    chosen = [];

    sizeSelect.selectedIndex = 0;

    dropOff.value = "";
    pickUp.value = "";

    clearDateErrors();
    updateDateLimits();
    render();

    statusMessage.textContent =
        "Selections cleared. You can start a new estimate.";
});

// Calculate estimate
calculateButton.addEventListener("click", function() {
    statusMessage.textContent = "";

    if (chosen.length === 0) {
        statusMessage.textContent =
            "Error: Choose at least one service before calculating an estimate.";

        serviceButtons[0].focus();
        return;
    }

    if (!validateDates()) {
        return;
    }

    // Show loading indicator
    spinner.hidden = false;

    statusMessage.textContent =
        "Calculating your estimate. Please wait.";

    calculateButton.disabled = true;

    // Simulate calculation
    setTimeout(function() {
        spinner.hidden = true;

        render();

        statusMessage.textContent =
            "Estimate ready. Your estimated total is " +
            total.textContent +
            ". Review the results below.";

        calculateButton.disabled = false;
    }, 1000);
});

// Open booking form
sendButton.addEventListener("click", function() {
    window.location.href = "book.html";
});

// Set date restrictions when page loads
updateDateLimits();

// Set initial button states and total
render();
