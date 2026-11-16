
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

// Convert MM/DD/YYYY into a valid date
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

    // Reject impossible dates
    if (
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day
    ) {
        return null;
    }

    date.setHours(0, 0, 0, 0);
    return date;
}

// Get date inputs
const dropOffInput = document.getElementById("dropOff");
const pickUpInput = document.getElementById("pickUp");

// Validate form when submitted
form.addEventListener("submit", function(event) {
    event.preventDefault();

    // Clear previous errors and messages
    clearErrors();
    statusMessage.textContent = "";

    let valid = true;

    // Get input values
    const owner = document.getElementById("ownerName")
        .value.trim();

    const emailInput = document.getElementById("email");
    const email = emailInput.value.trim();

    const dog = document.getElementById("dogName")
        .value.trim();

    const drop = dropOffInput.value.trim();
    const pick = pickUpInput.value.trim();

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

    // Get today's date without the time
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Convert manually entered dates
    const dropDate = parseDate(drop);
    const pickDate = parseDate(pick);

    // Validate drop off date
    if (!drop) {
        showError(
            "dropOff",
            "dropError",
            "Enter a drop off date in MM/DD/YYYY format."
        );
        valid = false;
    } else if (!dropDate) {
        showError(
            "dropOff",
            "dropError",
            "Enter a valid drop off date in MM/DD/YYYY format."
        );
        valid = false;
    } else if (dropDate < today) {
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
            "Enter a pick up date in MM/DD/YYYY format."
        );
        valid = false;
    } else if (!pickDate) {
        showError(
            "pickUp",
            "pickError",
            "Enter a valid pick up date in MM/DD/YYYY format."
        );
        valid = false;
    } else if (pickDate < today) {
        showError(
            "pickUp",
            "pickError",
            "Pick up date cannot be in the past."
        );
        valid = false;
    } else if (dropDate && pickDate < dropDate) {
        showError(
            "pickUp",
            "pickError",
            "Pick up date cannot be before the drop off date."
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
});
