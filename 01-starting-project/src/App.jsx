import { useState } from "react";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/projectsidebar";
import NewProject from "./components/NewProject";
import SelectedProject from "./components/SelectedProject";

// ye jo function he jab apan naye project ko add krenge aur purane project ke data ko store krne ke liye
// aur data ko dynmaic save ke liye 
function App() {
const[projectsState , setProjectState] = useState({
  selectedProjectID : undefined,
  projects: [],
  tasks :[]
});
function handleAddTask(text) {
  setProjectState((prevState) => {
    const taskId = Math.random();
    const newTask = {
      text : text ,
      projectId: prevState.selectedProjectID,
      id: taskId,
    };
  // ye jo undefined he vapas save button ho jat he kyuki undefined means kuch bhi kaam nhi jhua he
    return{
    ...prevState,
  //  selectedProjectID : undefined , 
  tasks: [ newTask , ...prevState.tasks]
  };
});
  
}

function handleDeleteTask(id) {
  setProjectState(prevState => {
    return {
      ...prevState , 
      tasks: prevState.tasks.filter(
        (task) => task.id !== id
      ),}
  })

}

function handleSelectproject(id) {
  setProjectState(prevState => {
    return {
      ...prevState , 
      selectedProjectID: id , 

    }
  })
}
// ye jo prev state he isme purana data save krne ke liye , null means adding new project 
// undefined means nothing kuch nhi kiya he kaam start nhi hua he   .
function handleStartAddProject() {
  setProjectState(prevState => {
    return {
      ...prevState , 
      selectedProjectID: null,

    }
  })
}
// ye jo he funcation text ko add  krne ke liye  , ... ye props hota he isme sari properties hotihe .
// prevstate purana data add krne ke liy e
function handleAddProject(projectData) {
  setProjectState(prevState => {
    const projectId = Math.random();
    const newProject = {
      ...projectData,
      id: projectId,
    };
  // ye jo undefined he vapas save button ho jat he kyuki undefined means kuch bhi kaam nhi jhua he
    return{
    ...prevState,
    selectedProjectID : undefined ,
  projects: [...prevState.projects, newProject]
  };
});
}
function handleDeleteProject() {
  setProjectState(prevState => {
    return {
      ...prevState , 
      selectedProjectID: undefined,
      projects : prevState.projects.filter(
        (project) => project.id !== prevState.selectedProjectID
      ),}
  })

}
// ye jo he javascript me elemnt ko find krne ke kaam aata he unki id se.... 
const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectID);

// ye jo he form page kholn eke liye 
let content = (
<SelectedProject project={selectedProject} 
onDelete = {handleDeleteProject} 
onAddTask = {handleAddTask}
onDeleteTask = {handleDeleteTask}
tasks = {projectsState.tasks}
/>

);

if(projectsState.selectedProjectID === null) {
  content = <NewProject onAdd={handleAddProject} />
}
else if (projectsState.selectedProjectID === undefined) {
content =  <NoProjectSelected onStartAddProject = {handleStartAddProject}/>
}

  return (
    <main className="h-screen my-8 flex gap-8 ">
 <ProjectsSidebar onStartAddProject = {handleStartAddProject} 
 projects = {projectsState.projects} 
 onSelectProject = {handleSelectproject}
 selectedProjectId={projectsState.selectedProjectID}
 />
{content}
    </main>
  );
}

export default App;
