document.addEventListener('DOMContentLoaded', () => {
    const projectInfo = document.getElementById('project-info');
    const noProjectMsg = document.getElementById('no-project-msg');
    const userAssignedToProject = true; // Change this to simulate no project assigned

    if (!userAssignedToProject) {
        projectInfo.style.display = 'none';
        noProjectMsg.style.display = 'block';
    }

    const closeBugForm = document.getElementById('close-bug-form');
    closeBugForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const bugId = document.getElementById('bug-id').value;
        const closingComment = document.getElementById('closing-comment').value;

        if (bugId && closingComment) {
            alert(`Bug ID ${bugId} marked for closing with comment: "${closingComment}"`);
            // Implement further logic to handle the bug closure.
            closeBugForm.reset();
        } else {
            alert('Please fill out all fields before submitting.');
        }
    });
});
