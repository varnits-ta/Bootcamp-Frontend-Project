import React, { createContext, useReducer, type Dispatch } from "react";

export interface TodoInterface {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

type Action =
  | { type: "ADD_TODO"; payload: TodoInterface }
  | { type: "DELETE_TODO"; payload: { id: number } }
  | { type: "SET_TODOS"; payload: TodoInterface[] }
  | { type: "UPDATE_TODO"; payload: TodoInterface };

export interface TaskContextType {
  state: TodoInterface[];
  dispatch: Dispatch<Action>;
}

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined,
);

export const TaskReducer = (state: TodoInterface[], action: Action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.payload];
    case "DELETE_TODO":
      return state.filter(
        (todo: TodoInterface) => todo.id !== action.payload.id,
      );
    case "SET_TODOS":
      return action.payload;
    case "UPDATE_TODO":
      return state.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo,
      );
    default:
      return state;
  }
};

export const TaskContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(TaskReducer, []);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
