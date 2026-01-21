import { useState, useCallback, useEffect } from "react";
import { APIService } from "@/api";
import { useTask } from "./useTaskContext";

export const useTodos = (initialLimit: number = 0, initialSkip: number = 0) => {
  const { state: todos, dispatch } = useTask();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchTodos = useCallback(
    async (limit: number = initialLimit, skip: number = initialSkip) => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await APIService.getAllTodos(limit, skip);
        dispatch({ type: "SET_TODOS", payload: data.todos });
        setTotal(data.total);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch],
  );

  const toggleTodo = useCallback(
    async (id: number, currentCompleted: boolean) => {
      const targetTodo = todos.find((t) => t.id === id);
      if (!targetTodo) return;

      const updatedTodo = { ...targetTodo, completed: !currentCompleted };

      dispatch({ type: "UPDATE_TODO", payload: updatedTodo });

      try {
        await APIService.updateTodo(id, !currentCompleted);
      } catch (err: any) {
        setError("Failed to update todo");
        dispatch({ type: "UPDATE_TODO", payload: targetTodo });
      }
    },
    [todos, dispatch],
  );

  useEffect(() => {
    fetchTodos(initialLimit, initialSkip);
  }, [initialLimit, initialSkip, fetchTodos]);

  return { todos, isLoading, error, fetchTodos, toggleTodo, total };
};
