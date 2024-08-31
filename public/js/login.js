if(API.loggedUser!=null){
    API.redirectToUserPage();
}
async function handleLogin() {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!validateForm(email, password)) {
        return;
    }

    try {
        // Fetch existing users
      
       const user =  API.login(email, password);
        if (user) {
            alert('Login successful');
            API.redirectToUserPage();

        } else {
            alert('Wrong email or password. Please try again.');
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

  


