document.addEventListener('DOMContentLoaded', () => {
    const userInfo = {
        username: 'TesterUser',
        email: 'tester@example.com',
        projects: [
            {
                id: 1,
                name: 'Project A',
                status: 'in-progress',
                bugs: [
                    { id: 'BUG-001', title: 'Login Issue', severity: 'High', description: 'Cannot login with valid credentials.' },
                    { id: 'BUG-002', title: 'UI Bug', severity: 'Low', description: 'Misalignment on the dashboard.' }
                ]
            },
            {
                id: 2,
                name: 'Project B',
                status: 'in-progress',
                bugs: []
            }
        ]
    };

    const userInfoDiv = document.getElementById('userInfo');
    userInfoDiv.innerHTML = `
        <p><strong>Username:</strong> ${userInfo.username}</p>
        <p><strong>Email:</strong> ${userInfo.email}</p>
    `;

    const projectsListDiv = document.getElementById('projectsList');
    const noProjectsMessageDiv = document.getElementById('noProjectsMessage');

    if (userInfo.projects.length === 0) {
        noProjectsMessageDiv.innerHTML = '<p>No projects assigned.</p>';
        projectsListDiv.style.display = 'none';
    } else {
        userInfo.projects.forEach(project => {
            if (project.status === 'in-progress') {
                const projectDiv = document.createElement('div');
                projectDiv.classList.add('project');
                projectDiv.innerHTML = `
                    <h4>${project.name}</h4>
                    ${project.bugs.length > 0 ? '<h5>Bugs:</h5>' : '<p>No bugs reported yet.</p>'}
                `;

                project.bugs.forEach(bug => {
                    const bugDiv = document.createElement('div');
                    bugDiv.classList.add('bug');
                    bugDiv.innerHTML = `
                        <p><strong>ID:</strong> ${bug.id}</p>
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
