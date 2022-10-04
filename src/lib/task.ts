import nextId from "react-id-generator";

class Task {
  id: string;
  title: string;

  constructor(input: string) {
    this.id = nextId();
    this.title = input;
  }
}
export { Task };
