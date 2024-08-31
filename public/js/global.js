if(API.loggedUser!=null){
    const nav_username = document.getElementById("username");
    const nav_role = document.getElementById("role");
    const nav_last_login = document.getElementById("last-login");
    if(nav_username!=null){
        nav_username.innerHTML = API.loggedUser.name;
    }
    if(nav_role!=null){
        nav_role.innerHTML = API.loggedUser.role;
    }
    if(nav_last_login!=null){
        nav_last_login.innerHTML = API.loggedUser.last_login;
    }

}

logout = () => {
    API.logout();
    window.location.href = "/login.html";
}