import React, { useEffect, useState } from "react";
import { Task } from "./lib/task";
import TaskListItem from "./EachTaskItem";

export default function App() {
  const [input, setInput] = useState<string>(``);

  const localList = localStorage.getItem("dumpList");
  const [list, setList] = useState<Task[]>(
    localList ? JSON.parse(localList) : []
  );

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const addTaskToList = (input: string, list: Task[]) => {
    input.length > 0 && setList([...list, new Task(input)]);
    setInput(``);
  };

  useEffect(() => {
    localStorage.setItem("dumpList", JSON.stringify(list));
  }, [list]);

  const [editTargetTaskId, setEditTargetTaskID] = useState<string>(``);
  const [editMode, setEditMode] = useState<boolean>(false);

  const toggleEditMode = (editMode: boolean) =>
    editMode ? setEditMode(false) : setEditMode(true);

  const triggerEdit = (e: React.MouseEvent<HTMLLabelElement>) => {
    setEditTargetTaskID(e.currentTarget.parentElement?.id || ``);
    toggleEditMode(false);
  };

  const editTask = (
    newInput: string,
    list: Task[],
    editTaskId: string,
    editMode: boolean
  ) => {
    setList(
      list.map((task: Task) => {
        if (task.id === editTaskId) {
          return { ...task, title: newInput };
        } else return task;
      })
    );
    toggleEditMode(editMode);
  };

  return (
    <main>
      <input type="text" value={input} onChange={handleInput} />
      <button type="button" onClick={() => addTaskToList(input, list)}>
        add
      </button>
      <button type="button" onClick={() => setList([])}>
        clear
      </button>
      <ul>
        {list.map((task: Task) => (
          <li key={task.id} id={task.id}>
            <TaskListItem
              task={task}
              list={list}
              isEdit={editMode}
              triggerEdit={triggerEdit}
              editTaskId={editTargetTaskId}
              editTask={editTask}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
