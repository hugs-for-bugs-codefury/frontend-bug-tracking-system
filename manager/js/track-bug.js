document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const bug_id = parseInt(urlParams.get("bug_id"));
   
    const bug_history = API.getBugHistory(bug_id);
    const bug_details = API.getBug(bug_id);
    const project_details = API.getProjectByBug(bug_id);
    

    console.log(bug_history);

    const bugInfoDiv = document.getElementById("timeline");
    document.getElementById("bugTitle").innerText = bug_details.title
    document.getElementById("bugDescription").innerText = bug_details.description
    document.getElementById("bugProject").innerText = "Project: " + project_details.project_name
    document.getElementById("bugSeverity").innerHTML = `
    <span class="badge bg-${bug_details.severity === 'low' ? 'success' : bug_details.severity === 'medium' ? 'warning' : 'danger'}">${bug_details.severity} severity</span>`
    document.getElementById("bugStatus").innerHTML = `
    <span class="badge bg-${bug_details.status === 'open' ? 'danger' : 'success'}">${bug_details.status}</span>`
    

    bug_history.forEach(history => {
        const historyDetails = `
            <div class="timeline-item">
                        <div class="timeline-icon bg-primary text-white">
                            <i class="fas fa-bug"></i>
                        </div>
                        <div class="timeline-content">
                            <h5 class="timeline-title">${history.action}</h5>
                            <p class="timeline-actor">by: ${history.actor.name} [${history.actor.role}]</p>
                            <p class="timeline-timestamp">on: ${new Date(history.timestamp).toLocaleString()}</p>
                        </div>
                    </div>
        `;
        bugInfoDiv.innerHTML = historyDetails + bugInfoDiv.innerHTML;
    }    
    );  
  
  });
  