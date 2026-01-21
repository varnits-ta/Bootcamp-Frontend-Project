import { useState } from "react";
import { useTodos } from "@/hooks/useTodos";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./ui/table";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";

const ITEMS_PER_PAGE = 30;

export const TodoTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  const { todos, isLoading, toggleTodo, total } = useTodos(
    ITEMS_PER_PAGE,
    skip,
  );

  const totalPages = Math.ceil((total || 0) / ITEMS_PER_PAGE);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  return (
    <div className="w-full space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>ToDo</TableHead>
              <TableHead className="w-[100px]">Completed</TableHead>
              <TableHead className="w-[100px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              [...Array(10)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={4}>
                    <Skeleton className="h-8 w-full" />
                  </TableCell>
                </TableRow>
              ))
            ) : todos.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-8 text-muted-foreground"
                >
                  No todos found
                </TableCell>
              </TableRow>
            ) : (
              todos.map((todo) => (
                <TableRow key={todo.id}>
                  <TableCell className="w-[100px]">{todo.id}</TableCell>
                  <TableCell>{todo.todo}</TableCell>
                  <TableCell className="w-[100px]">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      readOnly
                      className="h-4 w-4"
                    />
                  </TableCell>
                  <TableCell className="w-[100px]">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleTodo(todo.id, todo.completed)}
                    >
                      {todo.completed ? "Undo" : "Check"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {todos.length > 0 ? skip + 1 : 0} to {skip + todos.length} of{" "}
          {total} todos
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevious}
            disabled={currentPage === 1 || isLoading}
          >
            Previous
          </Button>
          <span className="text-sm">
            Page {currentPage} of {totalPages || 1}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={currentPage >= totalPages || isLoading}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
