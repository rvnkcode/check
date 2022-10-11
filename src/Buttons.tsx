import React from "react";
import { Task } from "./lib/task";

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
  deleteSelectedItemsFromList
}: IButtonsProps) {
  return (
    <div>
      <button
        type="button"
        onClick={() => toggleSelectMode(selectMode, selectedItems)}
      >
        select
      </button>
      {selectMode && (
        <button
          type="button"
          onClick={() => deleteSelectedItemsFromList(list, selectedItems)}
        >
          delete
        </button>
      )}
    </div>
  );
}
