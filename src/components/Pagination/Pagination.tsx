import { Link } from '@tanstack/react-router'
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/Icons'

interface PaginationProps {
  currentPage: number
  totalPages: number
  pageSize: number
  onPageChange?: (page: number) => void
  setPageSize?: (pageSize: number) => void
  showPageSizeSelector?: boolean
  showPageInfo?: boolean
  maxVisiblePages?: number
}

export function Pagination({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  setPageSize,
  showPageSizeSelector = false,
  showPageInfo = true,
  maxVisiblePages = 5,
}: PaginationProps) {
  // Calculate visible page numbers
  const getVisiblePages = () => {
    const pages: (number | string)[] = []
    const halfVisible = Math.floor(maxVisiblePages / 2)
    
    let startPage = Math.max(1, currentPage - halfVisible)
    let endPage = Math.min(totalPages, currentPage + halfVisible)
    
    // Adjust if we're near the beginning or end
    if (endPage - startPage + 1 < maxVisiblePages) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)
      } else {
        startPage = Math.max(1, endPage - maxVisiblePages + 1)
      }
    }
    
    // Add first page and ellipsis if needed
    if (startPage > 1) {
      pages.push(1)
      if (startPage > 2) {
        pages.push('...')
      }
    }
    
    // Add visible pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
    
    // Add ellipsis and last page if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('...')
      }
      pages.push(totalPages)
    }
    
    return pages
  }

  const visiblePages = getVisiblePages()
  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages

  // Calculate page info
  const startItem = (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, totalPages * pageSize)

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
      {/* Page Info */}
      {showPageInfo && (
        <div className="text-sm text-gray-700">
          Showing {startItem} to {endItem} of {totalPages * pageSize} results
        </div>
      )}

      {/* Page Size Selector */}
      {showPageSizeSelector && setPageSize && (
        <div className="flex items-center gap-2">
          <label htmlFor="pageSize" className="text-sm text-gray-700">
            Rows per page:
          </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex items-center gap-1">
        {/* Previous Button */}
        {onPageChange ? (
          <button
            onClick={() => !isFirstPage && onPageChange(currentPage - 1)}
            disabled={isFirstPage}
            className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeftIcon className="w-4 h-4" />
            Previous
          </button>
        ) : (
          <Link
            to="/characters"
            search={{ page: currentPage - 1 }}
            disabled={isFirstPage}
            className={`flex items-center gap-1 px-3 py-2 text-sm font-medium border border-gray-300 rounded-l-md ${
              isFirstPage
                ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                : 'text-gray-700 bg-white hover:bg-gray-50'
            }`}
          >
            <ChevronLeftIcon className="w-4 h-4" />
            Previous
          </Link>
        )}

        {/* Page Numbers */}
        <div className="flex items-center">
          {visiblePages.map((page, index) => {
            if (page === '...') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-3 py-2 text-sm text-gray-500"
                >
                  ...
                </span>
              )
            }

            const pageNumber = page as number
            const isCurrentPage = pageNumber === currentPage

            if (onPageChange) {
              return (
                <button
                  key={pageNumber}
                  onClick={() => onPageChange(pageNumber)}
                  className={`px-3 py-2 text-sm font-medium border-t border-b border-gray-300 ${
                    isCurrentPage
                      ? 'bg-blue-50 text-blue-600 border-blue-300'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {pageNumber}
                </button>
              )
            } else {
              return (
                <Link
                  key={pageNumber}
                  to="/characters"
                  search={{ page: pageNumber }}
                  className={`px-3 py-2 text-sm font-medium border-t border-b border-gray-300 ${
                    isCurrentPage
                      ? 'bg-blue-50 text-blue-600 border-blue-300'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {pageNumber}
                </Link>
              )
            }
          })}
        </div>

        {/* Next Button */}
        {onPageChange ? (
          <button
            onClick={() => !isLastPage && onPageChange(currentPage + 1)}
            disabled={isLastPage}
            className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        ) : (
          <Link
            to="/characters"
            search={{ page: currentPage + 1 }}
            disabled={isLastPage}
            className={`flex items-center gap-1 px-3 py-2 text-sm font-medium border border-gray-300 rounded-r-md ${
              isLastPage
                ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                : 'text-gray-700 bg-white hover:bg-gray-50'
            }`}
          >
            Next
            <ChevronRightIcon className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  )
}
