import "./styles.css";
import { todoInstance } from "./todoObject.js";

let todoArray;
const todoStorageString = "myTodoArray";
let projectArray = ["Default"];

window.onload = () => {
  import("./domInteractions.js").then((Module) => {
    const newDOMInteraction = new Module.domInteractions();
  });
  restoreContentFromStorage(todoStorageString);
};

window.onbeforeunload = () => {
  saveContentToStorage(todoArray);
};

function saveContentToStorage(arrayToStore) {
  localStorage.setItem(todoStorageString, JSON.stringify(arrayToStore));
}

function restoreContentFromStorage(storedContent) {
  const storedTodos = JSON.parse(localStorage.getItem(storedContent) || "[]");
  const restoredTodoInstances = storedTodos.map(
    (data) => new todoInstance(data.title, data.project, data.description)
  );
  //later call UI related stuff
  return restoredTodoInstances;
}

const newToDo1 = new todoInstance("myTitle1", "myProject1", "myDescription1");
const newTodo2 = new todoInstance("myTitle2", "myProject2", "myDescription2");

todoArray = [newToDo1, newTodo2];

// const newProjectIdea = "Work";
// projectArray.push(newProjectIdea);
// console.log(
//   "my project: " + projectArray[projectArray.indexOf(newProjectIdea)]
// );
