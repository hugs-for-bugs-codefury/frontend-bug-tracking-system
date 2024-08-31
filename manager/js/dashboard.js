document.addEventListener("DOMContentLoaded", function() {
    
    const projectManager = API.getManagerById(API.loggedUser.user_id);
    const projects = API.getProjectsByManager(projectManager.manager_id);

    const project_status_text = {
        'in_progress': "In Progress",
        'completed': "Completed"
    }



    console.log(projects)



    const projectInfoDiv = document.getElementById("project-list");


    if (projects.length > 0) {
        projects.forEach(project => {
           
            const projectDetails = `
                <div class="card">
                <h5 style="padding-bottom:1rem"> ${project.project_name}</h5>
                <span>Status: ${project_status_text[project.status]}</span>
                <p>${project.description}</p>
             
                <p>Start Date: ${new Date(project.start_date).toLocaleDateString()}</p>
                <a href="/manager/project-details.html?project_id=${project.project_id}" class="btn btn-primary mt-auto">View Project</a>
              
                </div>
            `;
            projectInfoDiv.innerHTML = projectDetails + projectInfoDiv.innerHTML;

            
        });
    } else {
        projectInfoDiv.innerHTML = "<p>No projects created.</p>";
    }

    if(projects.length >=4){
        document.getElementById("createProjectBtn").style.display = "none";
    }
});

function markBugForClosing(bugId) {
    alert(`Bug with ID ${bugId} marked for closing.`);
    // Add the logic to update the bug status in your system
}




