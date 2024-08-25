document.addEventListener("DOMContentLoaded", function() {
    // Example data
    const developerData = {
        username: "Manager@example.com",
        role: "Manager",
        lastLogin: "8/22/2024, 10:00 AM",
        assignedProjects: [
            {
                projectName: "Project Alpha",
                manager: "John Doe",
                startDate: "8/1/2024",
                teamMembers: ["Alice", "Bob", "Charlie"],
                bugs: [
                    { id: 1, title: "Bug 1", status: "Open" },
                    { id: 2, title: "Bug 2", status: "In Progress" }
                ]
            }
        ]
    };

    // Display user information
    document.getElementById("username").textContent = `Username: ${developerData.username}`;
    document.getElementById("role").textContent = `Role: ${developerData.role}`;
    document.getElementById("last-login").textContent = `Last Login: ${developerData.lastLogin}`;

    const projectInfoDiv = document.getElementById("project-info");

    if (developerData.assignedProjects.length > 0) {
        developerData.assignedProjects.forEach(project => {
            const projectDetails = `
                <h3 style="padding-bottom:1rem">Project: ${project.projectName}</h3>
                <p>Manager: ${project.manager}</p>
                <p>Start Date: ${project.startDate}</p>
                <p>Team Members: ${project.teamMembers.join(", ")}</p>
            `;
            projectInfoDiv.innerHTML += projectDetails;

            const bugListDiv = document.getElementById("bug-list");
            let bugListHtml = `<h4 style="padding-bottom:1rem">Bugs in ${project.projectName}</h4><ul>`;
            project.bugs.forEach(bug => {
                bugListHtml += `<li style="margin-bottom:10px ;">
                
                    <span>${bug.title} - ${bug.status}</span>
                    <button onclick="markBugForClosing(${bug.id})" type="button" class="btn btn-primary btn-sm"">Mark for Closing</button>
                </li>`;
            });
            bugListHtml += "</ul>";
            bugListDiv.innerHTML += bugListHtml;
        });
    } else {
        projectInfoDiv.innerHTML = "<p>No projects assigned yet.</p>";
    }
});

function markBugForClosing(bugId) {
    alert(`Bug with ID ${bugId} marked for closing.`);
    // Add the logic to update the bug status in your system
}




