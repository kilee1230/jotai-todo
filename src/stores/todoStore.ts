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

// Delete
export const deleteTodoAtom = atom(null, (get, set, id: string) => {
  const todos = get(todosAtom);
  const filteredTodos = todos.filter((todo) => todo.id !== id);
  set(todosAtom, filteredTodos);
});
