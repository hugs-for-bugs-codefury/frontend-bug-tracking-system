document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const bug_id = parseInt(urlParams.get("bug_id"));
  const project_id = parseInt(urlParams.get("project_id"));
  let bug_details = API.getBug(bug_id);

  if (!API.getBugs(project_id).some((bug) => bug.bug_id === bug_id)) {
    showToast(
      "Invalid Bug ID and/or Project ID",
      "Redirecting to project details page...",
      "danger"
    );
    window.location.href =
      "/manager/project-details.html?project_id=" + project_id;
  }

  const assignableBugs = API.getBugs(project_id);

  // const bug_details = API.getBug(bug_id);
  const project_details = API.getProjectById(project_id);
  const developers = API.getDevelopersByProject(project_details.project_id);

  const bug_severity_text = {
    low: "Low",
    medium: "Medium",
    high: "High",
    critical: "Critical",
  };
  assignableBugs.forEach((bug) => {
    const option = document.createElement("option");
    option.value = bug.bug_id;
    option.text = `${bug.title} - ${bug_severity_text[bug.severity]}`;
    document.getElementById("bug-to-assign").appendChild(option);
  });

  developers.forEach((developer) => {
    const option = document.createElement("option");
    option.value = developer.developer_id;
    option.text = developer.name;
    document.getElementById("developer-to-assign").appendChild(option);
  });

  document
    .getElementById("bug-to-assign")
    .addEventListener("change", function () {
      bug_details = API.getBug(parseInt(this.value));
      document.getElementById("reporter").innerText = API.getTesterByTesterId(
        bug_details.created_by
      ).name;
      document.getElementById("description").innerText =
        bug_details.description;
      document.getElementById("severity").innerText =
        bug_severity_text[bug_details.severity];
      window.history.replaceState(
        null,
        null,
        `/manager/assign-bug.html?project_id=${project_id}&bug_id=${bug_details.bug_id}`
      );
      if (bug_details.assigned_to !== null) {
        document.getElementById("developer-to-assign").value =
          bug_details.assigned_to;
        const developer_id = parseInt(
          document.getElementById("developer-to-assign").value
        );
        const num_projects = API.getDeveloperProjects(developer_id).length;
        const open_bugs = API.getAssignedBugs(developer_id).filter(
          (bug) => bug.status === "open"
        ).length;
        document.getElementById(
          "num-assigned-projects"
        ).innerText = `Working on ${num_projects} projects`;
        document.getElementById(
          "num-open-bugs"
        ).innerText = `Has ${open_bugs} open bugs`;
      }
    });

  document
    .getElementById("developer-to-assign")
    .addEventListener("change", function () {
      const developer_id = parseInt(this.value);
      const num_projects = API.getDeveloperProjects(developer_id).length;
      const open_bugs = API.getAssignedBugs(developer_id).filter(
        (bug) => bug.status === "open"
      ).length;
      document.getElementById(
        "num-assigned-projects"
      ).innerText = `Working on ${num_projects} projects`;
      document.getElementById(
        "num-open-bugs"
      ).innerText = `Has ${open_bugs} open bugs`;
    });

  // Set default bug values
  document.getElementById("bug-to-assign").value = bug_id;
  document.getElementById("reporter").innerText = API.getTesterByTesterId(
    bug_details.created_by
  ).name;
  document.getElementById("description").innerText = bug_details.description;
  document.getElementById("severity").innerText =
    bug_severity_text[bug_details.severity];

  // Set default dev values
  if (bug_details.assigned_to !== null) {
    document.getElementById("developer-to-assign").value =
      bug_details.assigned_to;
    const developer_id = parseInt(
      document.getElementById("developer-to-assign").value
    );
    const num_projects = API.getDeveloperProjects(developer_id).length;
    const open_bugs = API.getAssignedBugs(developer_id).filter(
      (bug) => bug.status === "open"
    ).length;
    document.getElementById(
      "num-assigned-projects"
    ).innerText = `Working on ${num_projects} projects`;
    document.getElementById(
      "num-open-bugs"
    ).innerText = `Has ${open_bugs} open bugs`;
  }

  document.getElementById("projectName").innerText =
    project_details.project_name;
  document.getElementById("projectDescription").innerText =
    project_details.description;

  document
    .getElementById("assignBugForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(this);
      const developer_id = parseInt(formData.get("developerToAssign"));
      console.log(developer_id, bug_id);
      const assigned_bug = API.assignBugToDeveloper(bug_id, developer_id);
      console.log(assigned_bug);
      if (!assigned_bug) {
       
        showToast("Failed to Assign Bug", "Failed to assign bug to developer. Try again later", "danger");
        return;
      }
      showToast(
        "Bug Assigned",
        `Bug ID ${assigned_bug.bug_id} assigned to ${
          API.getDeveloperByDeveloperId(developer_id).name
        } successfully. Redirecting...`,
        "success"
      );
      window.location.href = `/manager/project-details.html?project_id=${project_id}`;
    });
});
