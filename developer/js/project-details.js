document.addEventListener("DOMContentLoaded", function () {
    const developer = API.getDeveloper(API.loggedUser.user_id);

    const urlParams = new URLSearchParams(window.location.search);
    const projectId = parseInt(urlParams.get("project_id"));

    const project = API.getProjectById(projectId);
    console.log(project);

    const project_status_text = {
        'in_progress': "In Progress",
        'completed': "Completed"
    }
    const bug_severity_text = {
        'low': "Low",
        'medium': "Medium",
        'high': "High",
        'critical': "Critical"
    }

   
        document.getElementById("project-name").innerText = project.project_name;
        document.getElementById("project-description").innerText = project.description;
        document.getElementById("project-status").innerText = project_status_text[project.status];
        document.getElementById("project-start-date").innerText = new Date(project.start_date).toLocaleDateString();
        document.getElementById("project-manager").innerText = project.manager.name
    

    const bugs = project.bugs.filter(bug => bug.assigned_to == developer.developer_id);
    const bugTable = document.getElementById("bugs-table-body");

        if (bugs.length > 0) {
        bugs.forEach(bug => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td scope="row">${bug.bug_id}</td>
                <td>${bug.title}</td>
                <td >
                <p class="text-truncate" style="max-width:30vw"> ${bug.description}</p>
               </td>
                <td>${bug.status=="open"?"Open":"Closed"}</td>
                <td>${bug_severity_text[bug.severity]}</td>
        
                <td>${API.getDeveloperByDeveloperId(bug.assigned_to).name}</td>
                <td ">

                    ${bug.status === 'open' ? `<button class="btn btn-danger" onclick="updateBugStatus(${bug.bug_id}, 'close')">Close Bug</button>` : 
                    `<button class="btn btn-outline-primary" onclick="updateBugStatus(${bug.bug_id}, 'open')">Reopen</button>`
                    }

                </td>
            `;
            bugTable.appendChild(row);
        });
    } else {
        bugTable.innerHTML = "<p>No bugs found.</p>";
    }


});

updateBugStatus = (bugId, status) => {
    API.updateBugStatus(bugId, status);
    alert(`Bug ${status === 'open' ? 'reopened' : 'closed'} successfully.`);
    window.location.reload();
};


function sortTable(columnIndex) {
    const table = document.getElementById("bugsTable");
    let switching = true;
    let direction = "asc";
    let shouldSwitch;
    let switchcount = 0;
    let rows, x, y, i;

    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[columnIndex];
            y = rows[i + 1].getElementsByTagName("TD")[columnIndex];

            if (direction === "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (direction === "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount === 0 && direction === "asc") {
                direction = "desc";
                switching = true;
            }
        }
    }
}

// Function to assign a bug to a developer
function assignBug(bugId) {
    alert(`Assigning bug ${bugId}`);
    // Additional logic to assign the bug
}

// Function to close a bug
function closeBug(bugId) {
    alert(`Closing bug ${bugId}`);
    // Additional logic to close the bug
}
