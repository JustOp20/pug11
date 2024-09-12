document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting immediately

        // Call validation function
        if (validateForm()) {
            alert('Form submitted successfully!');
            form.submit(); // Proceed with form submission if valid
        }
    });

    function validateForm() {
        let isValid = true;
        let firstInvalidElement = null; // To focus on the first invalid field

        // Clear previous error styles
        clearErrors();

        // Validate fields
        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        const course = document.getElementById('course');
        const entryScheme = document.getElementById('entryScheme');
        const intake = document.getElementById('intake');
        const sponsorship = document.getElementById('sponsorship');
        const gender = document.querySelector('input[name="gender"]:checked');
        const dob = document.getElementById('dob');
        const residence = document.getElementById('residence');

        if (!firstName.value.trim()) {
            showError(firstName, 'First Name is required.');
            isValid = false;
            firstInvalidElement = firstInvalidElement || firstName;
        }

        if (!lastName.value.trim()) {
            showError(lastName, 'Last Name is required.');
            isValid = false;
            firstInvalidElement = firstInvalidElement || lastName;
        }

        if (!course.value) {
            showError(course, 'Please select a course.');
            isValid = false;
            firstInvalidElement = firstInvalidElement || course;
        }

        if (!entryScheme.value) {
            showError(entryScheme, 'Please select an entry scheme.');
            isValid = false;
            firstInvalidElement = firstInvalidElement || entryScheme;
        }

        if (!intake.value) {
            showError(intake, 'Please select an intake.');
            isValid = false;
            firstInvalidElement = firstInvalidElement || intake;
        }

        if (!sponsorship.value) {
            showError(sponsorship, 'Please select a sponsorship option.');
            isValid = false;
            firstInvalidElement = firstInvalidElement || sponsorship;
        }

        if (!gender) {
            showError(document.getElementById('genderError'), 'Please select your gender.');
            isValid = false;
            firstInvalidElement = firstInvalidElement || document.getElementById('genderError');
        }

        if (!dob.value) {
            showError(dob, 'Please provide your date of birth.');
            isValid = false;
            firstInvalidElement = firstInvalidElement || dob;
        }

        if (!residence.value.trim()) {
            showError(residence, 'Residence is required.');
            isValid = false;
            firstInvalidElement = firstInvalidElement || residence;
        }

        // Focus on the first invalid element
        if (firstInvalidElement) {
            firstInvalidElement.focus();
        }

        return isValid; // Return the form validity status
    }

    // Function to show error messages and apply styles
    function showError(element, message) {
        const errorElement = document.createElement('span');
        errorElement.classList.add('error-message');
        errorElement.innerText = message;
        element.classList.add('error-border');
        element.parentElement.appendChild(errorElement);
    }

    // Function to clear previous error messages and styles
    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.remove());

        const errorBorders = document.querySelectorAll('.error-border');
        errorBorders.forEach(field => field.classList.remove('error-border'));
    }
});