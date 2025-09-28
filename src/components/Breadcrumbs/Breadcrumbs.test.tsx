import React from "react";
import { render, screen } from "@testing-library/react";
import { type BreadcrumbItem, Breadcrumbs } from "./Breadcrumbs";
import { vi } from "vitest";

vi.mock("@tanstack/react-router", () => ({
  Link: ({
    children,
    to,
    className,
    ...props
  }: {
    children: React.ReactNode;
    to: string;
    className?: string;
    [key: string]: unknown;
  }) => (
    <a href={to} className={className} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("@/components", () => ({
  HomeIcon: () => <span data-testid="home-icon">🏠</span>,
  ChevronRightIcon: () => <span data-testid="chevron-right-icon">›</span>,
}));

describe("Breadcrumbs Component", () => {
  const mockBreadcrumbItems: BreadcrumbItem[] = [
    { label: "Characters", href: "/characters" },
    { label: "Rick Sanchez", current: true },
  ];

  it("renders breadcrumbs with correct structure", () => {
    render(<Breadcrumbs items={mockBreadcrumbItems} />);

    expect(screen.getByTestId("home-icon")).toBeInTheDocument();

    expect(screen.getByText("Characters")).toBeInTheDocument();
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();

    const chevronIcons = screen.getAllByTestId("chevron-right-icon");
    expect(chevronIcons).toHaveLength(2);
  });

  it("renders home link correctly", () => {
    render(<Breadcrumbs items={mockBreadcrumbItems} />);

    const homeLink = screen.getByRole("link", { name: /home/i });
    expect(homeLink).toHaveAttribute("href", "/");
    expect(homeLink).toHaveClass("text-gray-400", "hover:text-gray-500");
  });

  it("renders linked breadcrumb items correctly", () => {
    render(<Breadcrumbs items={mockBreadcrumbItems} />);

    const charactersLink = screen.getByRole("link", { name: "Characters" });
    expect(charactersLink).toHaveAttribute("href", "/characters");
    expect(charactersLink).toHaveClass(
      "text-sm",
      "font-medium",
      "text-gray-500",
      "hover:text-gray-700",
    );
  });

  it("renders current page breadcrumb without link", () => {
    render(<Breadcrumbs items={mockBreadcrumbItems} />);

    const currentPage = screen.getByText("Rick Sanchez");
    expect(currentPage).toHaveAttribute("aria-current", "page");
    expect(currentPage).toHaveClass("text-sm", "font-medium", "text-gray-900");
    expect(currentPage.tagName).toBe("SPAN");
  });

  it("returns null when items array is empty", () => {
    const { container } = render(<Breadcrumbs items={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("handles single breadcrumb item correctly", () => {
    const singleItem: BreadcrumbItem[] = [
      { label: "Current Page", current: true },
    ];

    render(<Breadcrumbs items={singleItem} />);

    expect(screen.getByTestId("home-icon")).toBeInTheDocument();
    expect(screen.getByText("Current Page")).toBeInTheDocument();
    expect(screen.getByText("Current Page")).toHaveAttribute(
      "aria-current",
      "page",
    );
  });
});
