document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("importForm");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission

        const fileInput = document.getElementById("fileInput");
        const file = fileInput.files[0];

        if (!file) {
            alert("Please choose a file to import.");
            return;
        }

        // Perform further file validation or processing here
        alert(`File "${file.name}" imported successfully!`);
        form.reset(); // Reset the form
    });
});
