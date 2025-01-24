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

const newToDo = new todoInstance(
  "myTitle",
  "myDescription",
  "dueDate",
  "anyPriority",
  "myNote",
  "checkList",
  "myImage"
);

const evenNewerTodo = new todoInstance(
  "myTitle2",
  "myDescription2",
  "dueDate2",
  "anyPriority2",
  "myNote2",
  "checkList2",
  "myImage2"
);

const todoArray = [newToDo, evenNewerTodo];
console.log("This is the initial array");
console.log(todoArray);

const jsonArray = JSON.stringify(todoArray);
const fromJSONArray = JSON.parse(jsonArray);

console.log("This was parsed from JSON");
console.log(fromJSONArray);

// console.log("This is the original object: " + JSON.stringify(todoArray));
// localStorage.setItem("firstTodo", JSON.stringify(newToDo));
