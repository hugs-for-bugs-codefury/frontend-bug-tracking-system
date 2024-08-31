if(API.loggedUser!=null){
    API.redirectToUserPage();
}


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
        const user =  API.registerUser(fullName, email, password, role);
        if (user) {
            alert('Registration successful');
            console.log(user);
            // Redirect to the login page
            window.location.href = 'login.html';
        } else {
            alert('An error occurred during registration.');
        }
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

