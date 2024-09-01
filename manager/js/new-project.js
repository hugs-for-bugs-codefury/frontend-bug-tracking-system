document.addEventListener("DOMContentLoaded", function () {


  const developers = API.getAllDevelopers();
  const testers = API.getAllTesters();

  const testersCheckList = document.getElementById("testers");
  const developersCheckList = document.getElementById("developers");
  console.log(developers);
  console.log(testers);

  developers.forEach((developer) => {
    developersCheckList.innerHTML += `
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="${developer.developer_id}" id="dev-${developer.developer_id}"/>
                <label class="form-check-label" for="dev-${developer.developer_id}">
                    ${developer.name}
                </label>
            </div>
        `;
  });

  testers.forEach((tester) => {
    testersCheckList.innerHTML += `
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="${tester.tester_id}" id="tester-${tester.tester_id}"/>
                <label class="form-check-label" for="tester-${tester.tester_id}">
                    ${tester.name}
                </label>
            </div>
        `;
  });
});

document
  .getElementById("createProjectForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const currentManager = API.getManagerById(API.loggedUser.user_id);

    const projectName = document.getElementById("projectName").value;
    const projectDescription =
      document.getElementById("projectDescription").value;
    const startDate = new Date(document.getElementById("startDate").value);
    const developersCheckList = Array.from(
      document.getElementById("developers").getElementsByTagName("input")
    )
      .filter((input) => input.checked)
      .map((input) => parseInt(input.value));
    const testersCheckList = Array.from(
      document.getElementById("testers").getElementsByTagName("input")
    )
      .filter((input) => input.checked)
      .map((input) => parseInt(input.value));
    console.log(developersCheckList);
    console.log(testersCheckList);
 
    try {
      const project = API.createProject(
        projectName,
        projectDescription,
        startDate,
        currentManager.manager_id
      );
      developersCheckList.forEach((developer_id) => {
        API.assignProjectToDeveloper(project.project_id, developer_id);
      });
      testersCheckList.forEach((tester_id) => {
        API.assignProjectToTester(project.project_id, tester_id);
      });
      showToast("Project created successfully.", `Project ID: ${project.project_id}`, "success");
      window.location.href = "/manager/dashboard.html";
    } catch (error) {
      console.error("Error:", error);
      showToast("Failed to create project.", "An error occurred. Try again later.", "danger");
    }
  });
