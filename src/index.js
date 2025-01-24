import "./styles.css";
import { todoInstance } from "./todoObject.js";

window.onload = () => {
  import("./domInteractions.js").then((Module) => {
    const newDOMInteraction = new Module.domInteractions();
  });
};

window.onbeforeunload = () => {
  saveContentToStorage;
};

function saveContentToStorage(params) {
  console.log("this.saveMyContent");
}

const newToDo1 = new todoInstance("myTitle1", "myProject1", "myDescription1");
const newTodo2 = new todoInstance("myTitle2", "myProject2", "myDescription2");
console.log("before storing in localstorage: " + newToDo1.getTitle());

const todoArray = [newToDo1, newTodo2];
localStorage.setItem("myTodoArray", JSON.stringify(todoArray));

const storedTodos = JSON.parse(localStorage.getItem("myTodoArray"));
const restoredTodoInstances = storedTodos.map(
  (data) => new todoInstance(data.title, data.project, data.description)
);

const oldNewTodo1 = restoredTodoInstances[0];
console.log("after storing in localStorage: " + oldNewTodo1.getTitle());
