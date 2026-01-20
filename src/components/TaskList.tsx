import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { TaskItem } from "./Task";

export function TaskList() {
    const context = useContext(TaskContext);
    if (!context) throw new Error("TaskContext not found");

    const { tasks } = context;

    return (
        <div>
            {tasks.length === 0 ? (
                <div className="text-center text-gray-400 py-12">
                    <p>No tasks yet. Add one to get started!</p>
                </div>
            ) : (
                <div>
                    {tasks.map(task => (
                        <div key={task.id}>
                            <TaskItem task={task} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
