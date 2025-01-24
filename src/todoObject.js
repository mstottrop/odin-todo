class todoInstance {
  constructor(title, project, description) {
    this.title = title;
    this.project = project;
    this.description = description;
  }

  //Setters
  setTitle(value) {
    this.title = value;
  }
  setProject(value) {
    this.project = value;
  }
  setDescription(value) {
    this.description = value;
  }

  //Getters
  getTitle() {
    return this.title;
  }

  getProject() {
    return this.project;
  }

  getDescription() {
    return this.description;
  }
}

export { todoInstance };
