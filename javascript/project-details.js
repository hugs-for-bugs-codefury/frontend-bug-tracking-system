// Function to sort table columns
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
