async function registerUser() {
    event.preventDefault(); // Prevent default form submission

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;

    if (!validateForm(fullName, email, password, role)) {
        return;
    }

    try {
        // Fetch existing users
        const response = await fetch('data/users.json');
        const users = await response.json();

        // Check if user already exists
        if (users.some(user => user.email === email)) {
            alert("User with this email already exists.");
            return;
        }

        // Add new user
        const newUser = { fullName, email, password, role };
        users.push(newUser);

        // Update users.json (This would normally be done server-side)
        await saveUsers(users);

        alert("Registration successful!");
        document.getElementById("registerForm").reset();
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during registration.');
    }
}

function validateForm(fullName, email, password, role) {
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

async function saveUsers(users) {
    // Assuming you have an API to save users (this is a placeholder)
    // This function should send the updated user list back to the server to be saved.
    await fetch('path/to/saveUsersAPI', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(users),
    });
}

