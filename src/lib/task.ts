import uuid from "react-uuid"

class Task {
  readonly id: string;
  title: string;

  constructor(input: string) {
    this.id = uuid();
    this.title = input;
  }
}
export { Task };
