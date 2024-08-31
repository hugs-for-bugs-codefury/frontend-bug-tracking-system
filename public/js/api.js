

class API{


    static users = new Map();
    static testers = new Map();
    static developers = new Map();
    static managers = new Map();
    static projects = new Map();
    static developersProjects = new Map();
    static testersProjects = new Map();
    static bugs = new Map();


    static loggedUser = null;


    /* ---------------------------- User Functions ---------------------------- */

    static login(email, password){
        for (const user of API.users.values()){
            if (user.email === email && user.password_hash === password){
                // update last login
                user.last_login = new Date().getTime();
                API.loggedUser = user;

                API.save();

                return user;
            }
        }
        return null;
    }

    static logout(){
        API.loggedUser = null;
        API.save();
        window.location.href = 'login.html';
        
    }

    static registerUser(name, email, password, role){
        const user_id = API.users.size + 1;
        const user = {user_id, name, email, password_hash: password, role, last_login: new Date()};
        API.users.set(user_id, user);
        switch (role){
            case 'tester':
                API.testers.set(user_id, {user_id, tester_id: API.testers.size + 1});
                break;
            case 'developer':
                API.developers.set(user_id, {user_id, developer_id: API.developers.size + 1});
                break;
            case 'manager':
                API.managers.set(user_id, {user_id, manager_id: API.managers.size + 1});
                break;
        }
        API.save();
        return user;
    }

    static getUser(user_id){
        return API.users.get(user_id);
    }

    static getManagerById(user_id){
        // returns manager with the given user_id along with the user details and its project
        const manager = API.managers.get(user_id);
        if (!manager) return null;
        const user = {...API.getUser(user_id), ...manager};
        const projects = [...API.projects.values()].filter(project => project.manager_id === manager.manager_id);
        return {...user, ...manager, projects};
    }
    static getManagerByManagerId(manager_id){
        // returns manager with the given manager_id along with the user details and its project
        const manager = [...API.managers.values()].find(manager => manager.manager_id === manager_id);
        if (!manager) return null;
        const user = API.getUser(manager.user_id);
        const projects = [...API.projects.values()].filter(project => project.manager_id === manager.manager_id);
        return {...user, ...manager, projects};
    }

    static getDeveloper(user_id){
        // returns developer with the given user_id along with the user details and its project
        const developer = API.developers.get(user_id);
        if (!developer) return null;
        const user = API.getUser(user_id);
        const projects = [...API.developersProjects.values()].filter(developerProject => developerProject.developer_id === developer.developer_id)
            .map(developerProject => API.projects.get(developerProject.project_id));
        return {...user, ...developer, projects};
    }
    static getDeveloperByDeveloperId(developer_id){
        // returns developer with the given developer_id along with the user details and its project
        const developer = [...API.developers.values()].find(developer => developer.developer_id === developer_id);
        if (!developer) return null;
        const user = API.getUser(developer.user_id);
        const projects = [...API.developersProjects.values()].filter(developerProject => developerProject.developer_id === developer.developer_id)
            .map(developerProject => API.projects.get(developerProject.project_id));
        return {...user, ...developer, projects};
    }

    static getTester(user_id){
        // returns tester with the given user_id along with the user details and its project
        const tester = API.testers.get(user_id);
        if (!tester) return null;
        const user = API.getUser(user_id);
        const projects = [...API.testersProjects.values()].filter(testerProject => testerProject.tester_id === tester.tester_id)
            .map(testerProject => API.projects.get(testerProject.project_id));
        return {...user, ...tester, projects};
    }
    static getTesterByTesterId(tester_id){
        // returns tester with the given tester_id along with the user details and its project
        const tester = [...API.testers.values()].find(tester => tester.tester_id === tester_id);
        if (!tester) return null;
        const user = API.getUser(tester.user_id);
        const projects = [...API.testersProjects.values()].filter(testerProject => testerProject.tester_id === tester.tester_id)
            .map(testerProject => API.projects.get(testerProject.project_id));
        return {...user, ...tester, projects};
    }


    /* ---------------------------- Manager Functions --------------------------- */

    static getProjectsByManager(manager_id){
        return [...API.projects.values()].filter(project => project.manager_id === manager_id);
    }

    static createProject(project_name, description, start_date, manager_id){
        if(!API.loggedUser || API.loggedUser.role !== 'manager'){
            throw new Error('Only managers can create projects');
        }
        const project_id = API.projects.size + 1;
        const project = {project_id, project_name, description, start_date, manager_id, status: 'in_progress'};
        API.projects.set(project_id, project);
        API.save();
        return project;
    }

    static assignProjectToDeveloper(project_id, developer_id){
        if(!API.loggedUser || API.loggedUser.role !== 'manager'){
            throw new Error('Only managers can assign projects');
        }
        const developersProject = {developer_id, project_id};
        API.developersProjects.set(`${developer_id}-${project_id}`, developersProject);
        API.save();
        return developersProject;
    }

    static assignBugToDeveloper(bug_id, developer_id){
        if(!API.loggedUser || API.loggedUser.role !== 'manager'){
            throw new Error('Only managers can assign bugs');
        }
        const bug = API.bugs.get(bug_id);
        if (!bug) return null;
        bug.assigned_to = developer_id;
        API.bugs.set(bug_id, bug);
        API.save();
        return bug;
    }


    static assignProjectToTester(project_id, tester_id){
        if(!API.loggedUser || API.loggedUser.role !== 'manager'){
            throw new Error('Only managers can assign projects');
        }
        const testersProject = {tester_id, project_id};
        API.testersProjects.set(`${tester_id}-${project_id}`, testersProject);
        API.save();
        return testersProject;
    }

    static getAllDevelopers(){

        
        return [...API.developers.values()].map(developer => ({...API.getUser(developer.user_id), ...developer}));

    }
    static getAllTesters(){
        return [...API.testers.values()].map(tester => ({...API.getUser(tester.user_id), ...tester}));
    }


    /* ---------------------------- Tester Functions ---------------------------- */

    static createBug(project_id, title, description, severity, created_by){
        if(!API.loggedUser || API.loggedUser.role !== 'tester') return null;
        const bug_id = API.bugs.size + 1;
        const bug = {bug_id, project_id, title, description, severity, status: 'pending', created_by, assigned_to: null};
        API.bugs.set(bug_id, bug);
        API.save();
        return bug;
    }
    static getTesterProjects(tester_id){
        const projects = [...API.testersProjects.values()].filter(testerProject => testerProject.tester_id === tester_id)
            .map(testerProject => API.projects.get(testerProject.project_id));
        for (const project of projects){
            project.bugs = API.getBugs(project.project_id);
        }
        return projects;
    }

    /* --------------------------- Developer Functions -------------------------- */

    static getAssignedBugs(developer_id){
        return [...API.bugs.values()].filter(bug => bug.assigned_to === developer_id);
    }

    static updateBugStatus(bug_id, status){
        if(!API.loggedUser || API.loggedUser.role !== 'developer') return null;
        const bug = API.bugs.get(bug_id);
        if (!bug) return null;
        bug.status = status;
        API.bugs.set(bug_id, bug);
        API.save();
        return bug;
    }

    static getDeveloperProjects(developer_id){

        const projects = [...API.developersProjects.values()].filter(developerProject => developerProject.developer_id === developer_id)
            .map(developerProject => API.projects.get(developerProject.project_id));
        for (const project of projects){
            project.bugs = API.getBugs(project.project_id);
        }
        return projects;
    }

    static redirectToUserPage(){
        if(this.loggedUser!=null){
            switch(this.loggedUser.role){
                case 'manager':
                    window.location.href = '/manager/dashboard.html';
                    break;
                case 'developer':
                    window.location.href = '/developer/dashboard.html';
                    break;

                case 'tester':
                    window.location.href = '/tester/dashboard.html';
                    break;

                default:
                    window.location.href = '/login.html';
            }
        }else{
            window.location.href = '/login.html';
        }
    }


    /* -------------------------- Common User Functions ------------------------- */

    static getProjectById(project_id){
        // get all the project details along with testers, developers, and bugs
        const project = API.projects.get(project_id);
        if (!project) return null;
        const developers = this.getDevelopersByProject(project_id);
        const testers = this.getTestersByProject(project_id);
        const bugs = API.getBugs(project_id);
        const manager = API.getManagerByManagerId(project.manager_id);
        delete project.manager_id;
        return {...project, developers, testers, bugs, manager};
    }


    /* ---------------------------- Helper Functions ---------------------------- */

    static load(){
        API.users = new Map(JSON.parse(localStorage.getItem('users')));
        API.testers = new Map(JSON.parse(localStorage.getItem('testers')));
        API.developers = new Map(JSON.parse(localStorage.getItem('developers')));
        API.managers = new Map(JSON.parse(localStorage.getItem('managers')));
        API.projects = new Map(JSON.parse(localStorage.getItem('projects')));
        API.developersProjects = new Map(JSON.parse(localStorage.getItem('developersProjects')));
        API.testersProjects = new Map(JSON.parse(localStorage.getItem('testersProjects')));
        API.bugs = new Map(JSON.parse(localStorage.getItem('bugs')));
        API.loggedUser = JSON.parse(localStorage.getItem('loggedUser')) || null;
    }


    static save(){
        localStorage.setItem('users', JSON.stringify([...API.users]));
        localStorage.setItem('testers', JSON.stringify([...API.testers]));
        localStorage.setItem('developers', JSON.stringify([...API.developers]));
        localStorage.setItem('managers', JSON.stringify([...API.managers]));
        localStorage.setItem('projects', JSON.stringify([...API.projects]));
        localStorage.setItem('developersProjects', JSON.stringify([...API.developersProjects]));
        localStorage.setItem('testersProjects', JSON.stringify([...API.testersProjects]));
        localStorage.setItem('bugs', JSON.stringify([...API.bugs]));
        localStorage.setItem('loggedUser', JSON.stringify(API.loggedUser));
    }

    static loadFromJson(json){

        this.users = new Map(json.users.map(user => [user.user_id, user]));
        this.testers = new Map(json.testers.map(tester => [tester.user_id, tester]));
        this.developers = new Map(json.developers.map(developer => [developer.user_id, developer]));
        this.managers = new Map(json.managers.map(manager => [manager.user_id, manager]));
        this.projects = new Map(json.projects.map(project => [project.project_id, project]));
        this.developersProjects = new Map(json.developersProjects.map(developerProject => [`${developerProject.developer_id}-${developerProject.project_id}`, developerProject]));
        this.testersProjects = new Map(json.testersProjects.map(testerProject => [`${testerProject.tester_id}-${testerProject.project_id}`, testerProject]));
        this.bugs = new Map(json.bugs.map(bug => [bug.bug_id, bug]));
        this.loggedUser = null;
        this.save();
        this.logout();
        
        



    }



    static getBugs(project_id){
        return [...API.bugs.values()].filter(bug => bug.project_id === project_id);
    }

    static getDevelopersByProject(project_id){
        console.log([...API.developersProjects.values()]);
        return [...API.developersProjects.values()].filter(developerProject => developerProject.project_id === project_id)
            .map(developerProject => API.getDeveloperByDeveloperId(developerProject.developer_id));
    }
    static getTestersByProject(project_id){
        return [...API.testersProjects.values()].filter(testerProject => testerProject.project_id === project_id)
            .map(testerProject => API.getTesterByTesterId(testerProject.tester_id));
    }
    

}



API.load();







// const IUser = {
//     user_id: 0,
//     name: '',
//     email: '',
//     password_hash: '',
//     role: '',
//     last_login: new Date(),

// }
// const ITester = {
//     user_id: IUser.user_id,
//     tester_id: 0,
// }

// const IDeveloper = {
//     user_id: IUser.user_id,
//     developer_id: 0,
// }

// const IManager = {
//     user_id: IUser.user_id,
//     manager_id: 0,
// }

// const IProject = {
//     project_id: 0,
//     project_name: '',
//     description: '',
//     start_date: '',
//     manager_id: IManager.manager_id,
//     status: '',
// }
// const IDevelopersProjects = {
//     developer_id: IDeveloper.developer_id,
//     project_id: IProject.project_id,
// }

// const ITestersProjects = {
//     tester_id: ITester.tester_id,
//     project_id: IProject.project_id,
// }

// const IBug = {
//     bug_id: 0,
//     project_id: IProject.project_id,
//     title: '',
//     description: '',
//     severity: '',
//     status: '',
//     created_by: ITester.tester_id,
//     assigned_to: IDeveloper.developer_id,
// }