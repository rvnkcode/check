import React, { useEffect, useState } from "react";
import { Task } from "./lib/task";
import TaskListItem from "./TaskListItem";
import Buttons from "./Buttons";
import "./style.css";

export default function App() {
  // ================================= read =================================
  const localList = localStorage.getItem("dumpList");
  const [list, setList] = useState<Task[]>(
    localList ? JSON.parse(localList) : []
  );

  // ================================= create =================================
  const [input, setInput] = useState<string>(``);
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

  // ================================= update =================================
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

  // ================================= delete =================================
  const [selectMode, setSelectMode] = useState<boolean>(false);
  const selectedItems = new Set<string>();

  const toggleSelectMode = (
    selectMode: boolean,
    selectedItems: Set<string>
  ) => {
    if (selectMode) {
      setSelectMode(false);
      selectedItems.clear();
      console.log(selectedItems);
    } else setSelectMode(true);
  };

  const handleSelectedItem = (selectedItems: Set<string>, id: string) => {
    selectedItems.has(id) ? selectedItems.delete(id) : selectedItems.add(id);
    console.log(selectedItems);
  };

  const deleteSelectedItemsFromList = (
    list: Task[],
    selectedItems: Set<string>
  ) => {
    let newList: Task[] = [...list];
    selectedItems.forEach((id: string) => {
      newList = newList.filter((task) => task.id !== id);
    });
    setList(newList);
  };

  // ================================ Generate ================================
  return (
    <main>
      <div>
        <input
          type="text"
          value={input}
          onChange={handleInput}
          placeholder="완벽보다는 완수에 의미를 두자."
        />
        <button type="button" onClick={() => addTaskToList(input, list)}>
          add
        </button>
        <button type="button" onClick={() => setList([])}>
          clear
        </button>
        <Buttons
          toggleSelectMode={toggleSelectMode}
          selectMode={selectMode}
          list={list}
          selectedItems={selectedItems}
          deleteSelectedItemsFromList={deleteSelectedItemsFromList}
        />
      </div>
      <ul>
        {list.map((task: Task) => (
          <li
            key={task.id}
            id={task.id}
            onClick={
              selectMode
                ? () => handleSelectedItem(selectedItems, task.id)
                : () => console.log(`not select mode`)
            }
          >
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
      <Buttons
        toggleSelectMode={toggleSelectMode}
        selectMode={selectMode}
        list={list}
        selectedItems={selectedItems}
        deleteSelectedItemsFromList={deleteSelectedItemsFromList}
      />
    </main>
  );
}
