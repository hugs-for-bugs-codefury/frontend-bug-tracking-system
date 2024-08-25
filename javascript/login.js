document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Simple validation (You can expand this for more complex validations)
    if (email === "" || password === "") {
        alert("Please fill in both fields.");
        return;
    }

    // Dummy check for email and password (You would normally do this on the server-side)
    if (email === "admin@example.com" && password === "password") {
        alert("Login successful!");
        // Redirect to the dashboard or other page
        window.location.href = "pm-dashboard.html";
    } else {
        alert("Invalid email or password. Please try again.");
    }
});
