document.addEventListener('DOMContentLoaded', () => {

    const tester = API.getTester(API.loggedUser.user_id);
    const projects = API.getTesterProjects(tester.tester_id);

    console.log(tester);
    console.log(projects);
   


    const userInfo = {
        name: API.loggedUser.name,
        email: API.loggedUser.email,
        projects: projects
    };

    const userInfoDiv = document.getElementById('userInfo');
    userInfoDiv.innerHTML = `
        <p><strong>Name:</strong> ${userInfo.name}</p>
        <p><strong>Email:</strong> ${userInfo.email}</p>
    `;

    const projectsListDiv = document.getElementById('projectsList');
    const noProjectsMessageDiv = document.getElementById('noProjectsMessage');

    if (userInfo.projects.length === 0) {
        noProjectsMessageDiv.innerHTML = '<p>No projects assigned.</p>';
        projectsListDiv.style.display = 'none';
    } else {
        userInfo.projects.forEach(project => {
            if (project.status === 'in_progress') {
                const projectDiv = document.createElement('div');
                projectDiv.classList.add('project');
                projectDiv.innerHTML = `
                    <h4>${project.project_name}</h4>
                    ${project.bugs.length > 0 ? '<h5>Bugs:</h5>' : '<p>No bugs reported yet.</p>'}
                `;

                project.bugs.forEach(bug => {
                    const bugDiv = document.createElement('div');
                    bugDiv.classList.add('bug');
                    bugDiv.innerHTML = `
                        <p><strong>ID:</strong> ${bug.bug_id}</p>
                        <p><strong>Title:</strong> ${bug.title}</p>
                        <p><strong>Severity:</strong> ${bug.severity}</p>
                        <p><strong>Description:</strong> ${bug.description}</p>
                    `;
                    projectDiv.appendChild(bugDiv);
                });

                projectsListDiv.appendChild(projectDiv);
            }
        });
    }
});
