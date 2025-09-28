import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 10,
    pageSize: 20,
    onPageChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders pagination component with all elements", () => {
      render(<Pagination {...defaultProps} />);

      expect(screen.getByText("First")).toBeInTheDocument();
      expect(screen.getByText("Previous")).toBeInTheDocument();
      expect(screen.getByText("Next")).toBeInTheDocument();
      expect(screen.getByText("Last")).toBeInTheDocument();
    });

    it("renders page info by default", () => {
      render(<Pagination {...defaultProps} />);

      expect(
        screen.getByText("Showing 1 to 20 of 200 results"),
      ).toBeInTheDocument();
    });

    it("hides page info when showPageInfo is false", () => {
      render(<Pagination {...defaultProps} showPageInfo={false} />);

      expect(screen.queryByText(/Showing/)).not.toBeInTheDocument();
    });

    it("renders correct page numbers based on current page", () => {
      render(<Pagination {...defaultProps} currentPage={5} />);

      expect(screen.getByText("4")).toBeInTheDocument();
      expect(screen.getByText("5")).toBeInTheDocument();
      expect(screen.getByText("6")).toBeInTheDocument();
    });
  });

  describe("Navigation Buttons - First Page", () => {
    it("disables First and Previous buttons on first page", () => {
      render(<Pagination {...defaultProps} currentPage={1} />);

      const firstButton = screen.getByText("First");
      const previousButton = screen.getByText("Previous");

      expect(firstButton).toHaveClass("cursor-not-allowed");
      expect(previousButton).toHaveClass("cursor-not-allowed");
    });

    it("enables Next and Last buttons on first page", () => {
      render(<Pagination {...defaultProps} currentPage={1} />);

      const nextButton = screen.getByText("Next");
      const lastButton = screen.getByText("Last");

      expect(nextButton).toHaveClass("cursor-pointer");
      expect(lastButton).toHaveClass("cursor-pointer");
    });
  });

  describe("Navigation Buttons - Last Page", () => {
    it("disables Next and Last buttons on last page", () => {
      render(<Pagination {...defaultProps} currentPage={10} />);

      const nextButton = screen.getByText("Next");
      const lastButton = screen.getByText("Last");

      expect(nextButton).toHaveClass("cursor-not-allowed");
      expect(lastButton).toHaveClass("cursor-not-allowed");
    });

    it("enables First and Previous buttons on last page", () => {
      render(<Pagination {...defaultProps} currentPage={10} />);

      const firstButton = screen.getByText("First");
      const previousButton = screen.getByText("Previous");

      expect(firstButton).toHaveClass("cursor-pointer");
      expect(previousButton).toHaveClass("cursor-pointer");
    });
  });

  describe("Navigation Buttons - Middle Page", () => {
    it("enables all navigation buttons on middle page", () => {
      render(<Pagination {...defaultProps} currentPage={5} />);

      const firstButton = screen.getByText("First");
      const previousButton = screen.getByText("Previous");
      const nextButton = screen.getByText("Next");
      const lastButton = screen.getByText("Last");

      expect(firstButton).toHaveClass("cursor-pointer");
      expect(previousButton).toHaveClass("cursor-pointer");
      expect(nextButton).toHaveClass("cursor-pointer");
      expect(lastButton).toHaveClass("cursor-pointer");
    });
  });

  describe("Page Number Buttons", () => {
    it("highlights current page correctly", () => {
      render(<Pagination {...defaultProps} currentPage={5} />);

      const currentPageButton = screen.getByText("5");
      expect(currentPageButton).toHaveClass(
        "bg-blue-50",
        "text-blue-600",
        "border-blue-300",
      );
    });

    it("does not highlight non-current pages", () => {
      render(<Pagination {...defaultProps} currentPage={5} />);

      const page4Button = screen.getByText("4");
      const page6Button = screen.getByText("6");

      expect(page4Button).toHaveClass("bg-white", "text-gray-700");
      expect(page6Button).toHaveClass("bg-white", "text-gray-700");
    });
  });
});
