export function getVisiblePages(
  currentPage: number,
  totalPages: number,
): number[] {
  const pages: number[] = [];

  // Always include: current-1, current, current+1
  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, currentPage + 1);

  // Generate the page numbers
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return pages;
}
