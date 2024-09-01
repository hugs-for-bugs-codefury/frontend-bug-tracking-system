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
            showToast('Success', `${email} registered as ${role}`, 'success');
            console.log(user);
            // Redirect to the login page
            window.location.href = 'login.html';
        } else {
            showToast('Error', 'Failed to register user.', 'danger');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error', 'Failed to register user.', 'danger');
    }
}

function validateForm(fullName, email, password, role) {
    if (!fullName) {
        showToast('Error', 'Full Name is required.', 'danger');
        return false;
    }

    if (!email || !validateEmail(email)) {
        showToast('Error', 'Invalid email address.', 'danger');
        return false;
    }

    if (!password || password.length < 6) {
        showToast('Error', 'Password must be at least 6 characters.', 'danger');
        return false;
    }

    if (!role) {
        showToast('Error', 'Role is required.', 'danger');
        return false;
    }

    return true;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

