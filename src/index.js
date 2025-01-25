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

  //later call UI related stuff
  return restoredTodoInstances;
}

// const newProjectIdea = "Work";
// projectArray.push(newProjectIdea);
// console.log(
//   "my project: " + projectArray[projectArray.indexOf(newProjectIdea)]
// );

const addBtn = document.getElementById("modalBtn");
addBtn.addEventListener("click", () => {
  console.log("test");
  const myNewTodo = new todoInstance("test", "test", "test");
  todoArray.push(myNewTodo);
  console.log(todoArray);
});
