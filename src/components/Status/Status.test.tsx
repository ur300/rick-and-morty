import { render, screen } from "@testing-library/react";
import { Status } from "./Status";
import type { CharacterStatus } from "@/types";

describe("Status Component", () => {
  it("renders alive status with correct styling", () => {
    render(<Status status="Alive" />);

    const statusElement = screen.getByText("Alive");
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveClass("bg-green-100", "text-green-800");
  });

  it("renders dead status with correct styling", () => {
    render(<Status status="Dead" />);

    const statusElement = screen.getByText("Dead");
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveClass("bg-red-100", "text-red-800");
  });

  it("renders unknown status with correct styling", () => {
    render(<Status status="unknown" />);

    const statusElement = screen.getByText("unknown");
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveClass("bg-gray-100", "text-gray-800");
  });

  it("renders the correct text content for each status", () => {
    const testCases: { status: CharacterStatus; expectedText: string }[] = [
      { status: "Alive", expectedText: "Alive" },
      { status: "Dead", expectedText: "Dead" },
      { status: "unknown", expectedText: "unknown" },
    ];

    testCases.forEach(({ status, expectedText }) => {
      const { unmount } = render(<Status status={status} />);
      expect(screen.getByText(expectedText)).toBeInTheDocument();
      unmount();
    });
  });
});
