async function handleLogin() {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!validateForm(email, password)) {
        return;
    }

    try {
        // Fetch existing users
        const response = await fetch('data/users.json'); // Replace with the actual path
        const users = await response.json();

        // Check if user exists and credentials are valid
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            alert("Login successful!");

            // Redirect based on user role
            if (user.role === "project-manager") {
                window.location.href = "pm-dashboard.html";
            } else if (user.role === "developer") {
                window.location.href = "developer-dashboard.html";
            } else if (user.role === "tester") {
                window.location.href = "tester-dashboard.html";
            }
        } else {
            alert("Invalid email or password. Please try again.");
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during login.');
    }
}

function validateForm(email, password) {
    if (!email || !validateEmail(email)) {
        alert("A valid Email is required.");
        return false;
    }

    if (!password || password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return false;
    }

    return true;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

  


