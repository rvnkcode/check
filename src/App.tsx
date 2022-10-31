import React, { useEffect, useState } from "react";
import { Task } from "./lib/task";
import TaskListItem from "./TaskListItem";
import Buttons from "./Buttons";
import "./style.css";
import styled from "styled-components";

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  @media (min-width: 1080px) {
    width: 1020px;
  }
`;

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const StyledDiv = styled.div`
  display: flex;
`;

const StyledInput = styled.input`
  flex: 1;
`;

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
  const [selectedSet, setSelectedSet] = useState<Set<string>>(new Set());
  const [selectedArr, setSelectedArr] = useState<string[]>([]);

  const toggleSelectMode = (selectMode: boolean, selected: Set<string>) => {
    if (selectMode) {
      setSelectMode(false);
      selected.clear();
      setSelectedSet(selected);
      setSelectedArr([]);
      console.log(selectedSet);
    } else setSelectMode(true);
  };

  const handleSelectedItem = (selected: Set<string>, id: string) => {
    selected.has(id) ? selected.delete(id) : selected.add(id);
    setSelectedSet(selected);
    setSelectedArr(Array.from(selected));
    console.log(selectedSet);
  };

  const deleteSelectedItemsFromList = (list: Task[], selected: Set<string>) => {
    let newList: Task[] = [...list];
    selected.forEach((id: string) => {
      newList = newList.filter((task) => task.id !== id);
    });
    selected.clear();
    setSelectedSet(selected);
    setSelectedArr([]);
    setSelectMode(false);
    setList(newList);
  };

  // ================================ Generate ================================
  // if (selectMode && selectedItems.size > 0) {}

  // ================================ Generate ================================
  return (
    <>
      <nav></nav>
      <StyledMain>
        <header></header>
        <StyledSection>
          <StyledDiv>
            <StyledInput
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
            <button type="button" onClick={() => console.log(list)}>
              DEBUG
            </button>
          </StyledDiv>
          <Buttons
            toggleSelectMode={toggleSelectMode}
            selectMode={selectMode}
            list={list}
            selectedItems={selectedSet}
            deleteSelectedItemsFromList={deleteSelectedItemsFromList}
          />
        </StyledSection>
        <ul>
          {list.map((task: Task) => (
            <li
              key={task.id}
              id={task.id}
              onClick={
                selectMode
                  ? () => handleSelectedItem(selectedSet, task.id)
                  : () => null
              }
              className={
                selectMode && selectedArr.includes(task.id)
                  ? `selected`
                  : undefined
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
        <section>
          <Buttons
            toggleSelectMode={toggleSelectMode}
            selectMode={selectMode}
            list={list}
            selectedItems={selectedSet}
            deleteSelectedItemsFromList={deleteSelectedItemsFromList}
          />
        </section>
      </StyledMain>
    </>
  );
}
