/*
Name: Kate Zeumer
Course: CPST 342
Term: Fall 2026

Booking form validation for MPLS Dog Boarding
*/

// Get the form and status message
const form = document.getElementById("bookingForm");
const statusMessage = document.getElementById("formStatus");

// Form fields and their error messages
const fields = [
    ["ownerName", "ownerError"],
    ["email", "emailError"],
    ["dogName", "dogError"],
    ["dropOff", "dropError"],
    ["pickUp", "pickError"]
];

// Display an error beside the field
function showError(fieldId, errorId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);

    error.textContent = "Error: " + message;
    field.setAttribute("aria-invalid", "true");
}

// Clear previous error messages
function clearErrors() {
    fields.forEach(([fieldId, errorId]) => {
        document.getElementById(errorId).textContent = "";

        document.getElementById(fieldId)
            .removeAttribute("aria-invalid");
    });
}

// Get today's date in local time
function localDateString() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

// Prevent past dates from being selected
const dropOffInput = document.getElementById("dropOff");
const pickUpInput = document.getElementById("pickUp");

function updateDateLimits() {
    // Manual date entry is validated on submission.
}

// Update date limits when drop off changes
dropOffInput.addEventListener("change", updateDateLimits);

// Set date limits when page loads
updateDateLimits();

// Validate form when submitted
form.addEventListener("submit", function(event) {
    event.preventDefault();

    // Clear previous errors and status messages
    clearErrors();
    statusMessage.textContent = "";

    let valid = true;

    // Get input values
    const owner = document.getElementById("ownerName")
        .value.trim();

    const email = document.getElementById("email")
        .value.trim();

    const dog = document.getElementById("dogName")
        .value.trim();

    const drop = dropOffInput.value;
    const pick = pickUpInput.value;

    // Validate owner name
    if (!owner) {
        showError(
            "ownerName",
            "ownerError",
            "Enter your name."
        );
        valid = false;
    }

    // Validate email
    const emailInput = document.getElementById("email");

    if (!email) {
        showError(
            "email",
            "emailError",
            "Enter your email address."
        );
        valid = false;
    } else if (!emailInput.validity.valid) {
        showError(
            "email",
            "emailError",
            "Enter an email like name@example.com."
        );
        valid = false;
    }

    // Validate dog name
    if (!dog) {
        showError(
            "dogName",
            "dogError",
            "Enter your dog's name."
        );
        valid = false;
    }

    // Validate drop off date
    const today = localDateString();

    if (!drop) {
        showError(
            "dropOff",
            "dropError",
            "Choose a drop off date."
        );
        valid = false;
    } else if (drop < today) {
        showError(
            "dropOff",
            "dropError",
            "Drop off date cannot be in the past."
        );
        valid = false;
    }

    // Validate pick up date
    if (!pick) {
        showError(
            "pickUp",
            "pickError",
            "Choose a pick up date."
        );
        valid = false;
    } else if (pick < today) {
        showError(
            "pickUp",
            "pickError",
            "Pick up date cannot be in the past."
        );
        valid = false;
    } else if (drop && pick < drop) {
        showError(
            "pickUp",
            "pickError",
            "Pick up date cannot be before drop off date."
        );
        valid = false;
    }

    // Move focus to first invalid field
    if (!valid) {
        const firstInvalid = form.querySelector(
            '[aria-invalid="true"]'
        );

        if (firstInvalid) {
            firstInvalid.focus();
        }

        return;
    }

    // Future Node.js integration:
    // Send validated booking information to the
    // server using fetch() when the backend is ready.
    // For now, simulate a successful submission.

    // Display success message
    statusMessage.textContent =
        "Request received. We will reply within one business day.";

    // Clear form after successful submission
    form.reset();

    // Reset date restrictions
    updateDateLimits();
});
