import type { TodoInterface } from "./context/TaskContext";

const BASE_URL = "https://dummyjson.com";

export class APIService {
  static async getAllTodos(limit: number = 0, skip: number = 0): Promise<{ todos: TodoInterface[], total: number, skip: number, limit: number }> {
    const response = await fetch(`${BASE_URL}/todos?limit=${limit}&skip=${skip}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch todos: ${response.statusText}`);
    }
    return response.json();
  }

  static async getSingleTodo(id: number): Promise<TodoInterface> {
    const response = await fetch(`${BASE_URL}/todos/${id}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch todo ${id}: ${response.statusText}`);
    }
    return response.json();
  }

  static async updateTodo(id: number, completed: boolean): Promise<TodoInterface> {
      const response = await fetch(`${BASE_URL}/todos/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ completed })
      });
      if (!response.ok) {
        throw new Error(`Failed to update todo ${id}: ${response.statusText}`);
    }
    return response.json();
  }
}