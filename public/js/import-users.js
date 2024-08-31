document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("importForm");

  form.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form submission

    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
    if (!file) {
      alert("Please select a file.");
      return;
    }

    // load the file content as json
    try {
      const content = await file.text();
      const data = JSON.parse(content);
      API.load(data);
      alert("Users imported successfully.");
      window.location.href = "/login.html";
    } catch (error) {
      alert("Invalid file format. Please upload a valid JSON file.");
      return;
    }
  });
});
