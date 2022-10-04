import React, { useState } from "react";
import { Task } from "./lib/task";

function App() {
  const [input, setInput] = useState<string>(``);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const [list, setList] = useState<Task[]>([]);

  const addItemToList = () => {
    if (input.length > 0) {
      const task = new Task(input);
      setList([...list, task]);
    }
    setInput(``);
  };

  const clearList = () => setList([]);

  const selectedItem = new Set<string>();

  const onChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked
      ? selectedItem.add(e.target.id)
      : selectedItem.delete(e.target.id);
    console.log(selectedItem);
  };

  const deleteSelectedItemsFromList = () => {
    let newList: Task[] = [...list];
    selectedItem.forEach((id: string) => {
      newList = newList.filter((task) => task.id !== id);
    });
    setList(newList);
  };

  return (
    <div className="App">
      <input
        type="text"
        value={input}
        onChange={onChange}
        placeholder="완벽보다는 완수에 의미를 두자"
      />
      <button type="button" onClick={addItemToList}>
        submit
      </button>
      <button type="button" onClick={clearList}>
        clear
      </button>
      <ul>
        {list.map((task: Task) => (
          <li key={task.id}>
            <input type="checkbox" id={task.id} onChange={onChecked} />
            <input type="checkbox" />
            <label htmlFor={task.id}>{task.title}</label>
          </li>
        ))}
      </ul>
      <button type="button" onClick={deleteSelectedItemsFromList}>
        delete
      </button>
    </div>
  );
}

export default App;
