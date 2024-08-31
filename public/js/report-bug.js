document.addEventListener('DOMContentLoaded', () => {
    const reportBugForm = document.getElementById('reportBugForm');
    
    // Example project data - this would typically come from your server
    const projects = [
        { id: 1, name: 'Project A', status: 'in-progress' },
        { id: 2, name: 'Project B', status: 'in-progress' },
        { id: 3, name: 'Project C', status: 'completed' },
    ];

    // Populate the project name dropdown with in-progress projects
    const projectNameSelect = document.getElementById('projectName');
    projects.filter(project => project.status === 'in-progress').forEach(project => {
        const option = document.createElement('option');
        option.value = project.id;
        option.text = project.name;
        projectNameSelect.appendChild(option);
    });

    reportBugForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Form validation
        const formData = new FormData(reportBugForm);
        const projectName = formData.get('projectName');
        const bugTitle = formData.get('bugTitle');
        const bugDescription = formData.get('bugDescription');
        const severityLevel = formData.get('severityLevel');

        if (!projectName || !bugTitle || !bugDescription || !severityLevel) {
            alert('Please fill out all fields.');
            return;
        }

        // Generate a unique bug ID
        const bugId = `BUG-${Date.now()}`;

        // Capture tester's name and current date/time
        const createdBy = 'Tester Name';  // Replace with actual tester name from your authentication system
        const createdOn = new Date().toLocaleString();

        // Create bug report object
        const bugReport = {
            id: bugId,
            projectName,
            bugTitle,
            bugDescription,
            severityLevel,
            createdBy,
            createdOn
        };

        // Save the bug report - typically, you'd send this to your server
        console.log('Bug Report:', bugReport);
        alert('Bug report submitted successfully!');

        // Reset the form
        reportBugForm.reset();
    });
});
