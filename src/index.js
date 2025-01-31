import "./styles.css";
import { todoInstance } from "./todoObject.js";

let todoArray = [];
let projectArray = [];
const projectsList = document.querySelector(".projectsList");
const todosList = document.querySelector(".todo-area");

window.onload = () => {
  import("./domInteractions.js").then((Module) => {
    const newDOMInteraction = new Module.domInteractions();
  });
  const arrayOfArrays = restoreContentFromStorage();
  todoArray = arrayOfArrays[0];
  projectArray = arrayOfArrays[1];

  displayProjects();
  displayTodos();

  //later call UI related stuff -> domInteractions.js
};

function displayProjects() {
  projectsList.innerHTML = "";
  projectArray.forEach((item) => {
    const newButton = document.createElement("button");
    newButton.textContent = item.toString();
    projectsList.appendChild(newButton);
  });
}

function displayTodos() {
  todosList.innerHTML = "";
  todoArray.forEach((item) => {
    const newTodoCard = document.createElement("div");
    newTodoCard.className = "todoCard";
    const newTodoTitle = document.createElement("h3");
    newTodoTitle.textContent = item.getTitle();
    newTodoCard.appendChild(newTodoTitle);
    const newTodoDescription = document.createElement("p");
    newTodoDescription.textContent = item.getDescription();
    newTodoCard.appendChild(newTodoDescription);
    todosList.appendChild(newTodoCard);
  });
}

window.onbeforeunload = () => {
  saveContentToStorage(todoArray, projectArray);
};

function saveContentToStorage(todoArrayToStore, projectArrayToStore) {
  localStorage.setItem("theTodoArray", JSON.stringify(todoArrayToStore));
  localStorage.setItem("theProjectArray", JSON.stringify(projectArrayToStore));
}

function restoreContentFromStorage() {
  try {
    const storedTodos = JSON.parse(localStorage.getItem("theTodoArray")) || [];
    const storedProjects =
      JSON.parse(localStorage.getItem("theProjectArray")) || [];

    if (!storedTodos.length && !storedProjects.length) {
      throw new Error("Couldn't restore empty arrays");
    }

    const restoredTodoInstances = storedTodos.map(
      (data) => new todoInstance(data.title, data.project, data.description)
    );

    console.log(restoredTodoInstances);
    console.log(restoredTodoInstances[0].getTitle());

    return [restoredTodoInstances, storedProjects];
  } catch (error) {
    console.error(error);
    return [[], []];
  }
}

/* Add Projects */
const addProjectsBtn = document.getElementById("addProject");
const projectDialog = document.getElementById("projectDialog");
const projectTitle = document.getElementById("projectTitle");

addProjectsBtn.addEventListener("click", (e) => {
  projectDialog.showModal();
});

projectDialog.addEventListener("close", (e) => {
  const title = projectTitle.value.trim();

  try {
    if (title === "") {
      throw new Error("Value mustn't be empty!");
    }
    projectArray.push(title);
    const newButton = document.createElement("button");
    newButton.textContent = title;
    projectsList.appendChild(newButton);
  } catch (error) {
    console.log(error.message);
  }
});

/* Add To Dos*/
const addTodoBtn = document.getElementById("todoModalBtn");
const todoDialog = document.getElementById("todoDialog");
const todoTitleInput = document.querySelector("#title");
const descriptionInput = document.querySelector("#description");
const projectInput = document.querySelector("#projectsSelect");

addTodoBtn.addEventListener("click", () => {
  populateSelector();
  todoDialog.showModal();
});

function populateSelector() {
  const df = document.createDocumentFragment();
  const option1 = document.createElement("option");
  option1.value = "placeholder";
  option1.appendChild(document.createTextNode("Choose..."));
  df.appendChild(option1);

  const option2 = document.createElement("option");
  option2.value = "Default";
  option2.appendChild(document.createTextNode("Default"));
  df.appendChild(option2);

  projectArray.forEach((project) => {
    const option = document.createElement("option");
    option.value = project;
    option.appendChild(document.createTextNode(project));
    df.appendChild(option);
  });
  projectInput.appendChild(df);
}

todoDialog.addEventListener("close", () => {
  try {
    if (
      !todoTitleInput.value ||
      !projectInput.value ||
      !descriptionInput.value
    ) {
      throw new Error("Please fill out all fields");
    } else if (projectInput.value == "placeholder") {
      const newTodo = new todoInstance(
        todoTitleInput.value,
        "Default",
        descriptionInput.value
      );
      todoArray.push(newTodo);
      displayTodos();
    } else {
      const newTodo = new todoInstance(
        todoTitleInput.value,
        projectInput.value,
        descriptionInput.value
      );
      todoArray.push(newTodo);
      displayTodos();
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
  projectInput.innerHTML = "";
});
