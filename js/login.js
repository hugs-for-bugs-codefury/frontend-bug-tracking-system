document.getElementById("login-form").addEventListener('submit', (e)=>{
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!validateForm(email, password)) {
        return;
    }

    try {
        // Fetch existing users
      
       const user =  API.login(email, password);
        if (user) {
            showToast('Success', 'Login successful.', 'success');
            API.redirectToUserPage();

        } else {
            showToast('Error', 'Invalid email or password.', 'danger');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error', 'Failed to login.', 'danger');
    }
});


function validateForm(email, password) {
    if (!email || !validateEmail(email)) {
       showToast('Error', 'Invalid email address.', 'danger');
        return false;
    }

    if (!password || password.length < 6) {
        showToast('Error', 'Password must be at least 6 characters.', 'danger');
        return false;
    }

    return true;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

  


