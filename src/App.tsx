import { Heading, useColorMode, VStack } from "@chakra-ui/react";

import { useAtom, useSetAtom } from "jotai";

import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import ColorModeSwitcher from "./components/ColorModeSwitcher";

import { themeAtom } from "./stores/themeStore";
import { addTodoAtom, deleteTodoAtom, todosAtom } from "./stores/todoStore";

function App() {
  const [theme, setTheme] = useAtom(themeAtom);
  const [todos] = useAtom(todosAtom);

  const setAddTodo = useSetAtom(addTodoAtom);
  const deleteTodo = useSetAtom(deleteTodoAtom);

  const { toggleColorMode } = useColorMode();

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    toggleColorMode();
  };

  return (
    <VStack p={4}>
      <ColorModeSwitcher toggleTheme={toggleTheme} theme={theme} />
      <Heading size="2xl">Jotai-Todo App</Heading>
      <AddTodo addTodo={setAddTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} />
    </VStack>
  );
}

export default App;
