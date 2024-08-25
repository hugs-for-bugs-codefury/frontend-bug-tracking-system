document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("registerForm");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission

        // Perform validation
        if (validateForm()) {
            alert("Registration successful!");
            form.reset(); // Reset the form
        }
    });

    function validateForm() {
        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const role = document.getElementById("role").value;

        if (!fullName) {
            alert("Full Name is required.");
            return false;
        }

        if (!email || !validateEmail(email)) {
            alert("A valid Email is required.");
            return false;
        }

        if (!password || password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return false;
        }

        if (!role) {
            alert("Please select a Role.");
            return false;
        }

        return true;
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});
