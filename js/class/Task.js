class Task {
  #id;
  #text;

  constructor(id, text) {
    this.#id = id;
    this.#text = text;
  }

  getId() {
    return this.#id;
  }

  getText() {
    return this.#text;
  }
}

// Export so that other js file can import it.
export { Task };
