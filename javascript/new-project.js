document.getElementById("createProjectForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const projectName = document.getElementById("projectName").value;
    const startDate = new Date(document.getElementById("startDate").value);
    const today = new Date();
    const teamMembers = document.getElementById("teamMembers").selectedOptions;

    // Check if the start date is at least 2 days later than today
    const minStartDate = new Date();
    minStartDate.setDate(today.getDate() + 2);
    
    if (startDate < minStartDate) {
        alert("Start date should be at least 2 days later than today's date.");
        return;
    }

    // Check if the selected team members comply with the project assignment rules
    const developers = [];
    const testers = [];

    for (let i = 0; i < teamMembers.length; i++) {
        const member = teamMembers[i].value;
        if (member.includes("dev")) {
            developers.push(member);
        } else if (member.includes("tester")) {
            testers.push(member);
        }
    }

    if (developers.length > 1) {
        alert("A developer can only be assigned to one project.");
        return;
    }

    if (testers.length > 2) {
        alert("A tester can be assigned to a maximum of 2 projects.");
        return;
    }

    // Simulate project creation and generate a unique project ID
    const projectId = "PRJ" + Math.floor(Math.random() * 1000);
    alert(`Project "${projectName}" created successfully with ID ${projectId} and status "In Progress".`);

    // Reset the form after successful submission
    document.getElementById("createProjectForm").reset();
});
