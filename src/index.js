import "./styles.css";
import { todoInstance } from "./todoObject.js";

let todoArray = [];
const todoStorageString = "myTodoArray";
let projectArray = ["Default"];

window.onload = () => {
  import("./domInteractions.js").then((Module) => {
    const newDOMInteraction = new Module.domInteractions();
  });
  todoArray = restoreContentFromStorage(todoStorageString);
  console.log("After loading: " + todoArray.length);
};

window.onbeforeunload = () => {
  saveContentToStorage(todoArray);
  console.log("Before unload: " + todoArray.length);
};

function saveContentToStorage(arrayToStore) {
  localStorage.setItem(todoStorageString, JSON.stringify(arrayToStore));
}

function restoreContentFromStorage(storedContent) {
  const storedTodos = JSON.parse(localStorage.getItem(storedContent));
  const restoredTodoInstances = storedTodos.map(
    (data) => new todoInstance(data.title, data.project, data.description)
  );

  //later call UI related stuff -> domInteractions.js
  return restoredTodoInstances;
}

// const newProjectIdea = "Work";
// projectArray.push(newProjectIdea);
// console.log(
//   "my project: " + projectArray[projectArray.indexOf(newProjectIdea)]
// );

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
  // console.log(
  //   "dialog closed with the following values: " +
  //     titleInput.value +
  //     ", " +
  //     projectInput.value +
  //     ", " +
  //     descriptionInput.value +
  //     "."
  // );

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
