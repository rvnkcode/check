import React, { useState } from "react";
import { Task } from "./lib/task";

interface IEachTaskItemProps {
  task: Task;
  isEdit: boolean;
  editTaskId: string;
  list: Task[];
  triggerEdit: (e: React.MouseEvent<HTMLLabelElement>) => void;
  editTask: (
    newInput: string,
    list: Task[],
    editTaskId: string,
    editMode: boolean
  ) => void;
}

export default function TaskListItem({
  isEdit,
  editTaskId,
  task,
  list,
  triggerEdit,
  editTask,
}: IEachTaskItemProps) {
  const [updateInput, setUpdateInput] = useState<string>(task.title);
  const handleUpdateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateInput(e.target.value);
  };

  if (isEdit && editTaskId === task.id) {
    return (
      <>
        <input type="checkbox" />
        <input
          type="text"
          value={updateInput}
          onChange={handleUpdateInput}
          onBlur={() => editTask(updateInput, list, editTaskId, isEdit)}
        />
      </>
    );
  } else {
    return (
      <>
        <input type="checkbox" />
        <label onDoubleClick={triggerEdit}>{updateInput}</label>
      </>
    );
  }
}
