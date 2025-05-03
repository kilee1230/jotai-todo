import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import ColorModeSwitcher from "./ThemeSwitcher";

describe("ThemeSwitcher", () => {
  it("renders correctly", () => {
    const { container } = render(
      <ColorModeSwitcher toggleTheme={() => {}} theme={"light"} />
    );
    expect(container).toBeTruthy();
  });

  it("calls toggleTheme when clicked", () => {
    // Create a mock function
    const mockToggleTheme = vi.fn();

    const { getByRole } = render(
      <ColorModeSwitcher toggleTheme={mockToggleTheme} theme={"light"} />
    );

    const button = getByRole("button");
    fireEvent.click(button);

    // Verify the mock was called
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });
});
