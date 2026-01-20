import { Task } from "../types";
import { TaskAction } from "../types";

interface TaskState {
    tasks: Task[];
}

const initialState: TaskState = {
    tasks: [],
};

export function taskReducer(state: TaskState, action: TaskAction): TaskState {
    switch (action.type) {
        case "ADD_TASK":
            return {
                ...state,
                tasks: [...state.tasks, action.payload],
            };
        case "EDIT_TASK":
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task.id === action.payload.id ? { ...task, ...action.payload } : task
                ),
            };
        case "DELETE_TASK":
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload.id),
            };
        default:
            return state;
    }
}