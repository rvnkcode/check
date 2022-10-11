import React from "react";
import { Task } from "./lib/task";
// import styled from "styled-components";

interface IButtonsProps {
  selectMode: boolean;
  toggleSelectMode: (selectMode: boolean, selectedItems: Set<string>) => void;
  list: Task[];
  selectedItems: Set<string>;
  deleteSelectedItemsFromList: (
    list: Task[],
    selectedItems: Set<string>
  ) => void;
}

export default function Buttons({
  toggleSelectMode,
  selectMode,
  list,
  selectedItems,
  deleteSelectedItemsFromList,
}: IButtonsProps) {
  return (
    <div>
      <button
        type="button"
        onClick={() => toggleSelectMode(selectMode, selectedItems)}
      >
        select
      </button>
      <button
        type="button"
        disabled={!selectMode}
        onClick={() => deleteSelectedItemsFromList(list, selectedItems)}
      >
        delete
      </button>
    </div>
  );
}
