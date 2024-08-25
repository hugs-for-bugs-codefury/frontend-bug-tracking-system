// router.js

document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');

    // Function to load content based on the current hash
    function loadContent() {
        const hash = window.location.hash.substring(1);

        let page = 'home.html';
        if (hash === 'register') {
            page = 'registration.html';
        } else if (hash === 'login') {
            page = 'login.html';
        } else if (hash === 'import-users') {
            page = 'import-users.html';
        }

        fetch(page)
            .then(response => response.text())
            .then(data => {
                contentDiv.innerHTML = data;
            });
    }

    // Initial load
    loadContent();

    // Load content when the hash changes
    window.addEventListener('hashchange', loadContent);
});


document.addEventListener("DOMContentLoaded", function() {
    const bugTrackerIcon = document.querySelector("header h1");

    if (bugTrackerIcon) {
        bugTrackerIcon.addEventListener("click", function() {
            window.location.href = "index.html"; // Redirect to the home page
        });
    }
});


// function goToHomePage() {
//     window.location.href = 'index.html';
// }
