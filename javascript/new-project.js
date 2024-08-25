document.getElementById("createProjectForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const projectName = document.getElementById("projectName").value;
    const startDate = new Date(document.getElementById("startDate").value);
    const today = new Date();
    const teamMembers = Array.from(document.getElementById("teamMembers").selectedOptions).map(option => option.value);

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

    for (const member of teamMembers) {
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

    // Send data to the server
    fetch('data/projects.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            projectName,
            startDate: startDate.toISOString(),
            teamMembers
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        document.getElementById("createProjectForm").reset();
    })
    .catch(error => {
        console.error('Error:', error);
    });

});
