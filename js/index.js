
document.getElementById("manager").addEventListener("click", function () {
  window.location.href = "pm-dashboard.html";
});

document
  .getElementById("developer")
  .addEventListener("click", function () {
    window.location.href = "developer-dashboard.html";
  });

document.getElementById("tester").addEventListener("click", function () {
  window.location.href = "tester-dashboard.html";
});





// //authorisation part
// // auth.js

// // Check if user is logged in
// function checkAuth() {
//   const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//   if (!currentUser) {
//     window.location.href = 'index.html';
//   }
//   return currentUser;
// }

// // Handle user login
// async function loginUser(email, password) {
//   const response = await fetch('data\\users.json');
//   const usersData = await response.json();

//   const user = usersData.users.find(
//     (u) => u.email === email && u.password === password
//   );

//   if (user) {
//     localStorage.setItem('currentUser', JSON.stringify(user));
//     user.lastLogin = new Date().toISOString();
//     saveUserData(usersData);
//     routeUser(user);
//   } else {
//     alert('Invalid credentials');
//   }
// }

// // Route user to appropriate dashboard
// function routeUser(user) {
//   if (user.role === 'Project Manager') {
//     window.location.href = 'manager_dashboard.html';
//   } else if (user.role === 'Tester') {
//     window.location.href = 'tester_dashboard.html';
//   } else if (user.role === 'Developer') {
//     window.location.href = 'developer_dashboard.html';
//   }
// }

// // Handle user registration
// async function registerUser(newUser) {
//   const response = await fetch('data/users.json');
//   const usersData = await response.json();

//   if (usersData.users.some((user) => user.email === newUser.email)) {
//     alert('User already exists');
//     return;
//   }

//   newUser.userid = (usersData.users.length + 1).toString();
//   usersData.users.push(newUser);

//   saveUserData(usersData);
//   localStorage.setItem('currentUser', JSON.stringify(newUser));
//   routeUser(newUser);
// }

// // Save user data to JSON (in real-world scenarios, this would be a backend API call)
// async function saveUserData(usersData) {
//   await fetch('data/users.json', {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(usersData, null, 2)
//   });
// }







