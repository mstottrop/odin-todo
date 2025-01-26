import "./styles.css";
import { todoInstance } from "./todoObject.js";

let todoArray = [];
let projectArray = [];

window.onload = () => {
  import("./domInteractions.js").then((Module) => {
    const newDOMInteraction = new Module.domInteractions();
  });
  const arrayOfArrays = restoreContentFromStorage();
  todoArray = arrayOfArrays[0];
  projectArray = arrayOfArrays[1];
  console.log(
    "After loading: " + todoArray.length + " & " + projectArray.length
  );
  //later call UI related stuff -> domInteractions.js
};

window.onbeforeunload = () => {
  saveContentToStorage(todoArray, projectArray);
  console.log("Before unload: " + todoArray.length);
};

function saveContentToStorage(todoArrayToStore, projectArrayToStore) {
  localStorage.setItem("theTodoArray", JSON.stringify(todoArrayToStore));
  localStorage.setItem("theProjectArray", JSON.stringify(projectArrayToStore));
  console.log("ToDo Array: " + JSON.stringify(todoArrayToStore));
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

    return [restoredTodoInstances, storedProjects];
  } catch (error) {
    console.error(error);
    return [[], []];
  }
}

const addBtn = document.getElementById("modalBtn");
const dialog = document.querySelector("dialog");
const titleInput = document.querySelector("#title");
const descriptionInput = document.querySelector("#description");
const projectInput = document.querySelector("#projects");

addBtn.addEventListener("click", () => {
  console.log("modal opened with: " + todoArray.length);
  dialog.showModal();
});

dialog.addEventListener("close", () => {
  try {
    if (!titleInput.value || !projectInput.value || !descriptionInput.value) {
      throw new Error("Please fill out all fields");
    } else if (projectInput.value == "placeholder") {
      const newTodo = new todoInstance(
        titleInput.value,
        "Default",
        descriptionInput.value
      );
      todoArray.push(newTodo);
      console.log(todoArray);
    } else {
      const newTodo = new todoInstance(
        titleInput.value,
        projectInput.value,
        descriptionInput.value
      );
      todoArray.push(newTodo);
      console.log(todoArray);
    }
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
  console.log("modal closed with: " + todoArray.length);
});
