import { useRef, useContext } from "react";
import { TaskContext, type Severity } from "../context/TaskContext";

export function TaskForm() {
    const context = useContext(TaskContext);
    if (!context) throw new Error("TaskContext not found");

    const { addTask } = context;
    const titleRef = useRef<HTMLInputElement>(null);
    const severityRef = useRef<HTMLSelectElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const title = titleRef.current?.value.trim() || "";
        const severity = (severityRef.current?.value as Severity) || "low";

        if (!title) {
            alert("Please enter a task title");
            titleRef.current?.focus();
            return;
        }

        addTask({
            title,
            severity,
        });

        titleRef.current!.value = "";
        severityRef.current!.value = "low";
        titleRef.current?.focus();
    };

    return (
        <form className="bg-white p-3 rounded mb-6 border" onSubmit={handleSubmit}>
            <div className="flex gap-2">
                <input
                    ref={titleRef}
                    type="text"
                    id="title"
                    placeholder="Add a task..."
                    required
                    className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                />
                <select ref={severityRef} id="severity" defaultValue="low" className="px-3 py-2 border border-gray-300 rounded text-sm">
                    <option value="low">Low</option>
                    <option value="medium">Med</option>
                    <option value="high">High</option>
                </select>
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded text-sm">
                    Add
                </button>
            </div>
        </form>
    );
}
