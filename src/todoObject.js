class todoInstance {
  constructor(title, project, description, dueDate, priority, images) {
    this.title = title;
    this.project = project;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.images = images;
  }
  createTodo() {
    console.log("createTodo");
  }
  //Setters
  setTodoCompletion() {
    console.log("todo is complete - not complete");
  }
  setTodoPriority() {
    console.log("set new priority");
  }

  //Getters
  getTodoPriority() {}

  getTodoDueDate() {
    console.log("dueDate");
  }

  createProject() {
    console.log("Project created");
  }
}

export { todoInstance };
