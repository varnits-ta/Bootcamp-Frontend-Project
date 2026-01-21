import { TaskContext } from "@/context/TaskContext";
import { useContext } from "react";

export const useTask = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("Tasks must be accessed inside the TaskContextProvider");
  }

  return context;
};
