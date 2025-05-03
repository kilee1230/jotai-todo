import { render, screen } from "@testing-library/react";
import { Provider } from "jotai";
import TodoList from "./TodoList";
import { expect, test, vi } from "vitest";

test("renders TodoList component", () => {
  // Mock the required props
  const mockTodos = [{ id: "1", body: "Test todo", completed: false }];
  const mockDeleteTodo = vi.fn();

  render(
    <Provider>
      <TodoList todos={mockTodos} deleteTodo={mockDeleteTodo} />
    </Provider>
  );

  // Instead of looking for a title, directly test for the todo item content
  const todoItem = screen.getByText("Test todo");
  expect(todoItem).toBeInTheDocument();

  // Check for paragraph elements instead of list items
  const paragraphElements = screen.getAllByText(/Test todo/i);
  expect(paragraphElements.length).toBe(1);
});

test("calls deleteTodo when delete button is clicked", async () => {
  const mockTodos = [{ id: "1", body: "Test todo", completed: false }];
  const mockDeleteTodo = vi.fn();

  render(
    <Provider>
      <TodoList todos={mockTodos} deleteTodo={mockDeleteTodo} />
    </Provider>
  );

  // Use the correct aria-label to find the delete button
  const deleteButton = screen.getByLabelText("Delete todo");
  deleteButton.click();

  // Check if deleteTodo was called with the correct ID
  expect(mockDeleteTodo).toHaveBeenCalledWith("1");
});
