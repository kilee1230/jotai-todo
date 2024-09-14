import { FormEvent, useRef } from "react";
import { useToast } from "@chakra-ui/react";
import { HStack, Input, Button } from "@chakra-ui/react";

interface AddTodoProps {
  addTodo: (body: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ addTodo }) => {
  const contentRef = useRef<HTMLInputElement>(null);

  const toast = useToast();

  const toastError = (title: string) =>
    toast({
      title: title,
      status: "error",
      duration: 2000,
      isClosable: true,
    });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (contentRef.current === null) return;

    if (!contentRef.current.value) {
      toastError("No content");
      return;
    }

    const todoBody = contentRef.current.value;

    addTodo(todoBody);
    contentRef.current.value = "";
  };

  return (
    <form onSubmit={handleSubmit}>
      <HStack m="8">
        <Input
          variant="filled"
          placeholder="learning Chakra UI"
          ref={contentRef}
        />

        <Button type="submit" colorScheme="green" px="8">
          Add Todo
        </Button>
      </HStack>
    </form>
  );
};

export default AddTodo;
