import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import AddTodo from "./AddTodo";

// Mock for useToast
const mockToast = vi.fn();
vi.mock("@chakra-ui/react", async () => {
  const actual = await vi.importActual("@chakra-ui/react");
  return {
    ...actual,
    useToast: () => mockToast,
  };
});

describe("AddTodo Component", () => {
  beforeEach(() => {
    mockToast.mockClear();
  });

  it("renders correctly", () => {
    const addTodo = vi.fn();
    const { container } = render(<AddTodo addTodo={addTodo} />);

    expect(container).toBeTruthy();
    expect(screen.getByPlaceholderText("Add new todo")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
  });

  it("calls addTodo when form is submitted with valid input", () => {
    const addTodo = vi.fn();
    render(<AddTodo addTodo={addTodo} />);

    const input = screen.getByPlaceholderText("Add new todo");
    const button = screen.getByRole("button", { name: "Add" });

    fireEvent.change(input, { target: { value: "New Todo Item" } });
    fireEvent.click(button);

    expect(addTodo).toHaveBeenCalledWith("New Todo Item");
    expect(addTodo).toHaveBeenCalledTimes(1);
  });

  it("shows error toast when submitting with empty input", () => {
    const addTodo = vi.fn();
    render(<AddTodo addTodo={addTodo} />);

    const button = screen.getByRole("button", { name: "Add" });
    fireEvent.click(button);

    expect(addTodo).not.toHaveBeenCalled();
    expect(mockToast).toHaveBeenCalledWith({
      title: "This field is required.",
      status: "error",
      duration: 2000,
      isClosable: true,
    });
  });

  it("clears input after successful submission", () => {
    const addTodo = vi.fn();
    render(<AddTodo addTodo={addTodo} />);

    const input = screen.getByPlaceholderText("Add new todo");
    const button = screen.getByRole("button", { name: "Add" });

    fireEvent.change(input, { target: { value: "New Todo Item" } });
    expect(input).toHaveValue("New Todo Item");

    fireEvent.click(button);

    expect(input).toHaveValue("");
  });

  it("handles form submission correctly", () => {
    const addTodo = vi.fn();
    render(<AddTodo addTodo={addTodo} />);

    const input = screen.getByPlaceholderText("Add new todo");
    const form = input.closest("form");

    fireEvent.change(input, { target: { value: "New Todo Item" } });
    fireEvent.submit(form!);

    expect(addTodo).toHaveBeenCalledWith("New Todo Item");
  });
});
