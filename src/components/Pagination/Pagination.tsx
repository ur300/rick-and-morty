import { ChevronLeftIcon, ChevronRightIcon } from "@/components";
import { getVisiblePages } from "@/helpers/getVisiblePages";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  showPageInfo?: boolean;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  pageSize,
  showPageInfo = true,
  onPageChange,
}: PaginationProps) {
  const visiblePages = getVisiblePages(currentPage, totalPages);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalPages * pageSize);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between py-4">
      {showPageInfo && (
        <div className="text-sm text-gray-700">
          Showing {startItem} to {endItem} of {totalPages * pageSize} results
        </div>
      )}

      <div className="flex items-center">
        {isFirstPage ? (
          <span className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-400 bg-gray-100 cursor-not-allowed border border-gray-300 border-r-0 rounded-l-md">
            First
          </span>
        ) : (
          <button
            onClick={() => onPageChange(1)}
            className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-l-md border-r-0 cursor-pointer"
          >
            First
          </button>
        )}

        {isFirstPage ? (
          <span className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-400 bg-gray-100 cursor-not-allowed border border-gray-300">
            <ChevronLeftIcon className="w-4 h-4" />
            Previous
          </span>
        ) : (
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className="flex items-center gap-1 px-3 py-2 text-sm cursor-pointer font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300"
          >
            <ChevronLeftIcon className="w-4 h-4" />
            Previous
          </button>
        )}

        <div className="flex items-center">
          {visiblePages.map((pageNumber) => {
            const isCurrentPage = pageNumber === currentPage;

            return (
              <button
                key={pageNumber}
                onClick={() => onPageChange(pageNumber)}
                className={`px-3 py-2 text-sm font-medium border-t cursor-pointer border-b border-gray-300 ${
                  isCurrentPage
                    ? "bg-blue-50 text-blue-600 border-blue-300"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>

        {isLastPage ? (
          <span className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-400 bg-gray-100 cursor-not-allowed border border-gray-300">
            Next
            <ChevronRightIcon />
          </span>
        ) : (
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className="flex items-center gap-1 px-3 py-2 text-sm cursor-pointer font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300"
          >
            Next
            <ChevronRightIcon />
          </button>
        )}

        {isLastPage ? (
          <span className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-400 bg-gray-100 cursor-not-allowed border border-gray-300 border-l-0 rounded-r-md">
            Last
          </span>
        ) : (
          <button
            onClick={() => onPageChange(totalPages)}
            className="flex items-center gap-1 px-3 py-2 text-sm cursor-pointer font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 border-l-0 rounded-r-md"
          >
            Last
          </button>
        )}
      </div>
    </div>
  );
}
