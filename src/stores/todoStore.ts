import { atom } from "jotai";
import { nanoid } from "nanoid";

// Types
export type Todo = { id: string; body: string };

// Todos Atoms
export const todosAtom = atom<Todo[]>([]);
todosAtom.debugLabel = "todosAtom";

// CRUD Operations for Todos

// Create
export const addTodoAtom = atom(null, (get, set, body: string) => {
  const newTodo: Todo = { id: nanoid(), body };
  set(todosAtom, [...get(todosAtom), newTodo]);
});

// Read
export const readTodosAtom = atom((get) => get(todosAtom));

// Update
export const updateTodoAtom = atom(null, (get, set, updatedTodo: Todo) => {
  const todos = get(todosAtom);
  const updatedTodos = todos.map((todo) =>
    todo.id === updatedTodo.id ? updatedTodo : todo
  );
  set(todosAtom, updatedTodos);
});

// Delete
export const deleteTodoAtom = atom(null, (get, set, id: string) => {
  const todos = get(todosAtom);
  const filteredTodos = todos.filter((todo) => todo.id !== id);
  set(todosAtom, filteredTodos);
});
