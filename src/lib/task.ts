import uuid from "react-uuid"

class Task {
  readonly id: string;
  title: string;
  isDone: boolean;

  constructor(input: string) {
    this.id = uuid();
    this.title = input;
    this.isDone = false;
  }
}
export { Task };
