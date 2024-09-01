document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("importForm");

  form.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form submission

    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
    if (!file) {
      showToast("Error", "Please select a file to upload.", "danger");
      return;
    }

    // load the file content as json
    try {
      const content = await file.text();
      const data = JSON.parse(content);
      API.loadFromJson(data);
      showToast("Success", "Data imported successfully.", "success");
      window.location.href = "/login.html";
    } catch (error) {
      showToast("Error", "Failed to import data.", "danger");
      return;
    }
  });
});
