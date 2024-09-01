document
  .getElementById("importForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

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
      showToast("Success", 
      `${data.users.length} users and ${data.projects.length} projects imported successfully.`
        , "success");

      API.logout();
      
    } catch (error) {
      console.log(error);
      showToast("Error", "Failed to import data.", "danger");
      return;
    }
  });
