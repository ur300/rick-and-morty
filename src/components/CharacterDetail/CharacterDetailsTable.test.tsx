import { render, screen } from "@testing-library/react";
import { CharacterDetailsTable } from "./CharacterDetailsTable";
import {
  mockCharacter,
  mockDeadCharacter,
  mockUnknownCharacter,
} from "@/test/test-utils";

vi.mock("../Status", () => ({
  Status: ({ status }: { status: string }) => (
    <span data-testid="status-component" data-status={status}>
      {status}
    </span>
  ),
}));

describe("CharacterDetailsTable Component", () => {
  it("renders all basic character information", () => {
    render(<CharacterDetailsTable character={mockCharacter} />);

    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Species")).toBeInTheDocument();
    expect(screen.getByText("Gender")).toBeInTheDocument();
    expect(screen.getByText("Type")).toBeInTheDocument();
    expect(screen.getByText("Origin")).toBeInTheDocument();
    expect(screen.getByText("Last Known Location")).toBeInTheDocument();
    expect(screen.getByText("Episodes")).toBeInTheDocument();
  });

  it("renders character values correctly", () => {
    render(<CharacterDetailsTable character={mockCharacter} />);

    expect(screen.getByText("Human")).toBeInTheDocument();
    expect(screen.getByText("Male")).toBeInTheDocument();
    expect(screen.getByText("Genius")).toBeInTheDocument();
    expect(screen.getByText("Earth (C-137)")).toBeInTheDocument();
    expect(
      screen.getByText("Earth (Replacement Dimension)"),
    ).toBeInTheDocument();
    expect(screen.getByText("Appears in 2 episodes")).toBeInTheDocument();
  });

  it("renders Status component with correct status", () => {
    render(<CharacterDetailsTable character={mockCharacter} />);

    const statusComponent = screen.getByTestId("status-component");
    expect(statusComponent).toBeInTheDocument();
    expect(statusComponent).toHaveAttribute("data-status", "Alive");
  });

  it("handles character without type correctly", () => {
    render(<CharacterDetailsTable character={mockDeadCharacter} />);

    expect(screen.queryByText("Type")).not.toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Species")).toBeInTheDocument();
  });

  it("handles character without episodes correctly", () => {
    render(<CharacterDetailsTable character={mockDeadCharacter} />);

    expect(screen.queryByText("Episodes")).not.toBeInTheDocument();
  });

  it("handles unknown origin and location", () => {
    render(<CharacterDetailsTable character={mockUnknownCharacter} />);

    const unknownElements = screen.getAllByText("Unknown");
    expect(unknownElements).toHaveLength(2);
  });

  it("displays correct episode count for multiple episodes", () => {
    render(<CharacterDetailsTable character={mockCharacter} />);

    expect(screen.getByText("Appears in 2 episodes")).toBeInTheDocument();
  });

  it("displays correct episode count for single episode", () => {
    const characterWithOneEpisode = {
      ...mockCharacter,
      episode: ["https://rickandmortyapi.com/api/episode/1"],
    };

    render(<CharacterDetailsTable character={characterWithOneEpisode} />);

    expect(screen.getByText("Appears in 1 episode")).toBeInTheDocument();
  });

  it("renders table with correct structure", () => {
    render(<CharacterDetailsTable character={mockCharacter} />);

    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
    expect(table).toHaveClass("w-full");

    const tbody = table.querySelector("tbody");
    expect(tbody).toBeInTheDocument();
  });

  it("handles empty episode array", () => {
    const characterWithNoEpisodes = {
      ...mockCharacter,
      episode: [],
    };

    render(<CharacterDetailsTable character={characterWithNoEpisodes} />);

    expect(screen.queryByText(/episodes/)).not.toBeInTheDocument();
  });
});
