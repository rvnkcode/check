import React, { useState } from "react";
import { Task } from "./lib/task";

interface IToDoList {
  list: Task[];
}

function App() {
  const [input, setInput] = useState<string>(``);

  const [list, setList] = useState<Task[]>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onClick = () => {
    if (input.length > 0) {
      const task = new Task(input);
      setList([...list, task]);
    }
    setInput(``);
  };
  // const debug = () => console.log(input);

  return (
    <div className="App">
      <input
        type="text"
        value={input}
        onChange={onChange}
        placeholder="완벽보다는 완수에 의미를 두자"
      />
      <button type="button" onClick={onClick}>
        submit
      </button>
      <ToDoList list={list} />
    </div>
  );
}

function ToDoList({ list }: IToDoList) {
  return (
    <ul>
      {list.map((task: Task) => (
        <ListItems key={task.id} id={task.id} title={task.title} />
      ))}
    </ul>
  );
}

function ListItems({ id, title }: Task) {
  return (
    <li>
      <input type="checkbox" id={id} />
      <label htmlFor={id}>
        <input type="checkbox" />
        {title}
      </label>
    </li>
  );
}
export default App;
