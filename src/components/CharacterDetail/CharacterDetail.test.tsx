import { render, screen } from "@testing-library/react";
import { CharacterDetail } from "./CharacterDetail";
import {
  mockCharacter,
  mockDeadCharacter,
  mockUnknownCharacter,
} from "@/test/test-utils";

vi.mock("./CharacterDetailsTable", () => ({
  CharacterDetailsTable: ({ character }: { character: { name: string } }) => (
    <div data-testid="character-details-table">
      Character Details Table for {character.name}
    </div>
  ),
}));

describe("CharacterDetail Component", () => {
  it("renders character name correctly", () => {
    render(<CharacterDetail character={mockCharacter} />);
    const name = screen.getByText("Rick Sanchez");
    expect(name).toBeInTheDocument();
    expect(name).toHaveClass("text-3xl", "font-bold", "text-gray-900", "mb-4");
  });

  it("renders character image with correct attributes", () => {
    render(<CharacterDetail character={mockCharacter} />);

    const image = screen.getByAltText("Rick Sanchez");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    );
    expect(image).toHaveClass(
      "w-64",
      "h-64",
      "lg:w-80",
      "lg:h-80",
      "rounded-lg",
      "object-cover",
      "mx-auto",
    );
  });

  it("renders CharacterDetailsTable component", () => {
    render(<CharacterDetail character={mockCharacter} />);

    const detailsTable = screen.getByTestId("character-details-table");
    expect(detailsTable).toBeInTheDocument();
    expect(detailsTable).toHaveTextContent(
      "Character Details Table for Rick Sanchez",
    );
  });

  it("renders different character names correctly", () => {
    const { rerender } = render(<CharacterDetail character={mockCharacter} />);
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();

    rerender(<CharacterDetail character={mockDeadCharacter} />);
    expect(screen.getByText("Morty Smith")).toBeInTheDocument();
    expect(screen.queryByText("Rick Sanchez")).not.toBeInTheDocument();

    rerender(<CharacterDetail character={mockUnknownCharacter} />);
    expect(screen.getByText("Unknown Character")).toBeInTheDocument();
    expect(screen.queryByText("Morty Smith")).not.toBeInTheDocument();
  });
});
