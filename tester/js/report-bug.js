document.addEventListener('DOMContentLoaded', () => {

    const tester = API.getTester(API.loggedUser.user_id);


    const urlParams = new URLSearchParams(window.location.search);
    const projectId = parseInt(urlParams.get('project_id'));
    const project = API.getProjectById(projectId);
    const assignedProjects = API.getTesterProjects(tester.tester_id);
    
    
    const reportBugForm = document.getElementById('reportBugForm');

    // Populate the project name dropdown with in-progress projects
    const projectNameSelect = document.getElementById('projectName');
    assignedProjects.filter(project => project.status === 'in_progress').forEach(project => {
        const option = document.createElement('option');
        option.value = project.project_id;
        option.text = project.project_name;
        projectNameSelect.appendChild(option);
    });

    // by default, select the project that the tester is currently viewing
    projectNameSelect.value = project.project_id;


    reportBugForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Form validation
        const formData = new FormData(reportBugForm);
        const projectId = parseInt(formData.get('projectName'));
        const bugTitle = formData.get('bugTitle');
        const bugDescription = formData.get('bugDescription');
        const severityLevel = formData.get('severityLevel');

        if (!projectId || !bugTitle || !bugDescription || !severityLevel) {
           showToast('Please fill in all fields.',`Project, Bug Title, Description and Severity are required.`, 'error');
            return;
        }

        

        const createdBug = API.createBug(projectId, bugTitle, bugDescription, severityLevel, tester.tester_id);
  
        if(!createdBug){
            showToast('Error reporting bug.', 'Please try again.', 'error');
            return;
        }
        showToast('Bug reported successfully.', `Bug ID: ${createdBug.bug_id}`, 'success');
        window.location.href = `/tester/project-details.html?project_id=${projectId}`;
    });
});
