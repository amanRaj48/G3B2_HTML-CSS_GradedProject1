// scriptboth.js

document.addEventListener('DOMContentLoaded', function () {
    // Get references to form elements
    const labTestForm = document.getElementById('labTestForm');
    if (labTestForm) {
        labTestForm.addEventListener('submit', handleSubmit);
    }
    const fullNameInput = document.getElementById('fullName');
    const contactNumberInput = document.getElementById('contactNumber');
    const emailInput = document.getElementById('email');
    const addressForm = document.getElementById('addressForm');
    const testTypes = document.querySelectorAll('input[name="testType"]');
    const hardCopyInput = document.querySelector('input[name="hardCopy"]');
    const dateInput = document.getElementById('appointmentDate');
    const timeInput = document.getElementById('appointmentTime');
    const resetButton = document.getElementById('reset');
    const submitButton = document.getElementById('submit');

    // Form validation function
    function validateForm() {
        // can add custom validation logic here
        // Example: Check if fullName, contactNumber, email, and at least one test type are filled out
        if (
            fullNameInput.value.trim() === '' ||
            contactNumberInput.value.trim() === '' ||
            emailInput.value.trim() === '' ||
            getSelectedTestTypes().length === 0
        ) {
            alert('Please fill out all required fields and select at least one test type.');
            return false; // Validation failed
        }

        // Additional validation logic can be added here

        return true; // Validation passed
    }

    // Helper function to get selected test types
    function getSelectedTestTypes() {
        const selectedTypes = [];
        testTypes.forEach((type) => {
            if (type.checked) {
                selectedTypes.push(type.value);
            }
        });
        return selectedTypes;
    }

    // Function to handle form submission
    function handleSubmit(event) {
        console.log('Form submission detected.');
        event.preventDefault(); // Prevent the default form submission

        // Get form elements by their IDs
        const fullNameInput = document.getElementById('fullName');
        const patientIdInput = document.getElementById('patientId');
        const contactNumberInput = document.getElementById('contactNumber');
        const emailInput = document.getElementById('email');
        const houseNumberInput = document.getElementById('houseNumber');
        const streetInput = document.getElementById('street');
        const areaInput = document.getElementById('area');
        const districtInput = document.getElementById('district');
        const testTypesInputs = document.querySelectorAll('input[name="testType"]:checked'); // Updated to match the form field name
        const hardCopyInput = document.querySelector('input[name="hardCopy"]:checked'); // Updated to match the form field name
        const dateInput = document.getElementById('appointmentDate'); // Updated to match the form field ID
        const timeInput = document.getElementById('appointmentTime'); // Updated to match the form field ID

        // Create formData object to store form data
        const formData = {
            fullName: fullNameInput.value,
            patientId: patientIdInput.value,
            contactNumber: contactNumberInput.value,
            email: emailInput.value,
            address: {
                houseNumber: houseNumberInput.value,
                street: streetInput.value,
                area: areaInput.value,
                district: districtInput.value,
            },
            testTypes: Array.from(testTypesInputs, (input) => input.value),
            hardCopy: hardCopyInput ? hardCopyInput.value : 'No',
            date: dateInput.value,
            time: timeInput.value,
        };

        // Perform form validation (add validation logic here)

        // Check if at least one test type is selected
        if (formData.testTypes.length === 0) {
            alert('Please select at least one test type.');
            return;
        }

        // Example: Check if the date is not empty
        if (!formData.date) {
            alert('Please select a date for the appointment.');
            return;
        }

        // Example: Check if the time is not empty
        if (!formData.time) {
            alert('Please select a time for the appointment.');
            return;
        }

        // Display the full address in the alert message
        const fullAddress = `${formData.address.houseNumber}, ${formData.address.street}, ${formData.address.area}, ${formData.address.district}`;
        // alert(`Full Address: ${fullAddress}`);

        console.log('formData.js Console log Form data:', formData);

        console.log('Before redirection');
        // If validation passes, redirect to formdata.html with URL parameters
        // Construct the query parameters
        const queryString = new URLSearchParams(formData).toString();

        // Flatten the address object and include its properties in the query parameters
        const addressParams = new URLSearchParams(formData.address).toString();

        // Combine the query parameters, including the flattened address properties
        const fullQueryString = `${queryString}&${addressParams}`;

        // Redirect to formdata.html with the updated query parameters
        const newTab = window.open(`formdata.html?${fullQueryString}`, '_blank');

        if (newTab !== null) {
            newTab.focus(); // Optional: Focus on the new tab
        } else {
            alert('The pop-up window was blocked by the browser. Please allow pop-ups for this website to view the form data.');
        }

        console.log('After redirection');
        console.log('formData.js Console log Form data:', formData);
    }
});
