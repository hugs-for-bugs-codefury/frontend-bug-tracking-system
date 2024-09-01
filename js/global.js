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
        nav_last_login.innerHTML = new Date(API.loggedUser.last_login).toLocaleString();
    }

}

logout = () => {
    API.logout();
    window.location.href = "/login.html";
}

let toasts = []

const removeToast = (toast_id) => {
    const toast = document.getElementById(toast_id);
    console.log(toast);
    toast.classList.remove('show');
    toast.classList.add('hide');
    toasts = toasts.filter(t => t.id != toast_id);
    document.getElementById("toast-container").innerHTML = toasts.map(toast => toast.component).join('');
    
}


const showToast = (title, message, type, duration=3000) => {
    const toast_id = `${title}-${toasts.length+1}`;
    const toastComponent = `<div id="${toast_id}" class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="toast-header">
            
            <strong class="me-auto">${title}</strong>
           
            <button onClick="${()=>removeToast(toast_id)}" type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div class="toast-body">
            ${message}
          </div>
        </div>`;
    toasts.push({
        id: toast_id,
        message: message,
        type: type,
        component:toastComponent
    });
    document.getElementById("toast-container").innerHTML = toasts.map(toast => toast.component).join('');
    setTimeout(() => {
        removeToast(toast_id);
    }, duration);
}