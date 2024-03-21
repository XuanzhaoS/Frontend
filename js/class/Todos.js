import { Task } from "./Task.js";

// Implement a Todos class
class Todos {
  #tasks = [];
  #backend_url = "";

  //   Takes a parameter 'url' to set the backend URL
  constructor(url) {
    this.#backend_url = url;
  }

  //   Using an asynchronous operation to fetch data from the backend and parses it as JSON.

  getTasks = () => {
    return new Promise(async (resolve, reject) => {
      fetch(this.#backend_url)
        .then((response) => response.json())
        .then(
          (json) => {
            this.#readJson(json);
            resolve(this.#tasks);
          },
          (error) => {
            reject(error);
          }
        );
    });
  };

  addTask = (text) => {
    return new Promise(async (resolve, reject) => {
      const json = JSON.stringify({ description: text });
      fetch(this.#backend_url + "/new", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: json,
      })
        .then((response) => response.json())
        .then(
          (json) => {
            resolve(this.#addToArray(json.id, text));
          },
          (error) => {
            reject(error);
          }
        );
    });
  };

//   Delete from backend
  removeTask = (id) => {
    return new Promise(async (resolve, reject) => {
      fetch(this.#backend_url + "/delete/" + id, {
        method: "delete",
      })
        .then((response) => response.json())
        .then(
          (json) => {
            this.#removeFromArray(id);
            resolve(json.id);
          },
          (error) => {
            reject(error);
          }
        );
    });
  };

  //   Using a private method to convert JSON data retrieved from the backend into "Task" objects and store the in the private task list.
  #readJson = (tasksAsJson) => {
    tasksAsJson.forEach((node) => {
      const task = new Task(node.id, node.description);
      this.#tasks.push(task);
    });
  };

  #addToArray = (id, text) => {
    const task = new Task(id, text);
    this.#tasks.push(task);
    // const ele = { id: task.getId(), description: task.getText() };
    // this.#tasks.push(ele);
    return task;
  };

  #removeFromArray = (id) => {
    const arrayWithoutRemoved = this.#tasks.filter((task) => task.id !== id);
    this.#tasks = arrayWithoutRemoved;
  };
}

export { Todos };
