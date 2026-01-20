import { createContext, useReducer, type ReactNode } from "react";

export type Severity = "low" | "medium" | "high";

export interface Task {
    id: string;
    title: string;
    severity: Severity;
    completed: boolean;
}

interface TaskContextProps {
    tasks: Task[];
    addTask: (task: Omit<Task, "id" | "completed">) => void;
    updateTask: (id: string, task: Omit<Task, "id">) => void;
    deleteTask: (id: string) => void;
    toggleTask: (id: string) => void;
}

export const TaskContext = createContext<TaskContextProps | undefined>(undefined);

type TaskAction = 
    | { type: "ADD_TASK"; payload: Task }
    | { type: "UPDATE_TASK"; payload: Task }
    | { type: "DELETE_TASK"; payload: string }
    | { type: "TOGGLE_TASK"; payload: string };

const taskReducer = (state: Task[], action: TaskAction): Task[] => {
    switch (action.type) {
        case "ADD_TASK":
            return [...state, action.payload];
        case "UPDATE_TASK":
            return state.map(task => 
                task.id === action.payload.id ? action.payload : task
            );
        case "DELETE_TASK":
            return state.filter(task => task.id !== action.payload);
        case "TOGGLE_TASK":
            return state.map(task =>
                task.id === action.payload 
                    ? { ...task, completed: !task.completed }
                    : task
            );
        default:
            return state;
    }
};

export function TaskContextProvider({ children }: { children: ReactNode }) {
    const [tasks, dispatch] = useReducer(taskReducer, []);

    const addTask = (task: Omit<Task, "id" | "completed">) => {
        const newTask: Task = {
            ...task,
            id: Date.now().toString(),
            completed: false,
        };
        dispatch({ type: "ADD_TASK", payload: newTask });
    };

    const updateTask = (id: string, task: Omit<Task, "id">) => {
        dispatch({ 
            type: "UPDATE_TASK", 
            payload: { ...task, id } 
        });
    };

    const deleteTask = (id: string) => {
        dispatch({ type: "DELETE_TASK", payload: id });
    };

    const toggleTask = (id: string) => {
        dispatch({ type: "TOGGLE_TASK", payload: id });
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, toggleTask }}>
            {children}
        </TaskContext.Provider>
    );
}
