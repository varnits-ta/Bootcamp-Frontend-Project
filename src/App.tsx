import { TaskForm } from './components/TaskForm'
import { TaskList } from './components/TaskList'
import { TaskContextProvider } from './context/TaskContext'
import { ThemeContextProvider } from './context/ThemeContext'

export function App() {
    return (
        <ThemeContextProvider>
            <TaskContextProvider>
                <div className="min-h-screen bg-gray-100">
                    <header className="bg-white border-b px-4 py-4 mb-6">
                        <div className="max-w-4xl mx-auto">
                            <h1 className="text-2xl font-bold text-gray-800">Tasks</h1>
                        </div>
                    </header>
                    <main className="max-w-4xl mx-auto px-4">
                        <TaskForm />
                        <TaskList />
                    </main>
                </div>
            </TaskContextProvider>
        </ThemeContextProvider>
    )
}