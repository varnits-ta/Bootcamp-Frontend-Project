import { useContext, useState, useRef } from "react";
import { TaskContext, type Severity } from "../context/TaskContext";

interface TaskItemProps {
    task: any;
}

export function TaskItem({ task }: TaskItemProps) {
    const context = useContext(TaskContext);
    if (!context) throw new Error("TaskContext not found");

    const { deleteTask, toggleTask, updateTask } = context;
    const [isEditing, setIsEditing] = useState(false);
    const titleRef = useRef<HTMLInputElement>(null);
    const severityRef = useRef<HTMLSelectElement>(null);

    const getSeverityColor = () => {
        switch (task.severity) {
            case "low":
                return "border-l-4 border-green-500";
            case "medium":
                return "border-l-4 border-yellow-500";
            case "high":
                return "border-l-4 border-red-500";
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        const title = titleRef.current?.value.trim() || "";
        const severity = (severityRef.current?.value as Severity) || "low";

        if (!title) {
            alert("Title cannot be empty");
            return;
        }

        updateTask(task.id, {
            title,
            severity,
            completed: task.completed,
        });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className={`${getSeverityColor()} bg-white p-3 rounded mb-2 flex items-center justify-between border`}>
                <div className="flex items-center gap-2 flex-1">
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                        className="w-4 h-4 cursor-pointer"
                    />
                    <input
                        ref={titleRef}
                        type="text"
                        defaultValue={task.title}
                        className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                    <select
                        ref={severityRef}
                        defaultValue={task.severity}
                        className="px-2 py-1 border border-gray-300 rounded text-sm"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Med</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <div className="flex gap-2 ml-2">
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white text-xs font-semibold py-1 px-2 rounded"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                    <button
                        className="bg-gray-400 hover:bg-gray-500 text-white text-xs font-semibold py-1 px-2 rounded"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={`${getSeverityColor()} bg-white p-3 rounded mb-2 flex items-center justify-between border ${task.completed ? "opacity-50 bg-gray-50" : ""}`}>
            <div className="flex items-center gap-3 flex-1">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="w-4 h-4 cursor-pointer"
                />
                <span className={`flex-1 ${task.completed ? "line-through text-gray-500" : "text-gray-800"}`}>{task.title}</span>
                <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                    {task.severity.charAt(0).toUpperCase() + task.severity.slice(1)}
                </span>
            </div>
            <div className="flex gap-2 ml-2">
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold py-1 px-2 rounded"
                    onClick={handleEdit}
                >
                    Edit
                </button>
                <button
                    className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold py-1 px-2 rounded"
                    onClick={() => deleteTask(task.id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
