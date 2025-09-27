import { Link } from '@tanstack/react-router'
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/Icons'
import { getVisiblePages } from '@/helpers/getVisiblePages'

interface PaginationProps {
  currentPage: number
  totalPages: number
  pageSize: number
  showPageInfo?: boolean
  maxVisiblePages?: number
}

export function Pagination({
  currentPage,
  totalPages,
  pageSize,
  showPageInfo = true,
  maxVisiblePages = 5,
}: PaginationProps) {
  const visiblePages = getVisiblePages(currentPage, totalPages, maxVisiblePages)
  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages

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


      {/* Pagination Controls */}
      <div className="flex items-center gap-1">
        {/* Previous Button */}
        {isFirstPage ? (
          <span className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-400 bg-gray-100 cursor-not-allowed border border-gray-300 rounded-l-md">
            <ChevronLeftIcon className="w-4 h-4" />
            Previous
          </span>
            ) : (
              <Link
                to="/characters"
                search={(prev: any) => ({ ...prev, page: currentPage - 1 })}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-l-md"
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

            return (
            <Link
              key={pageNumber}
              to="/characters"
              search={(prev: any) => ({ ...prev, page: pageNumber })}
              className={`px-3 py-2 text-sm font-medium border-t border-b border-gray-300 ${
                isCurrentPage
                  ? 'bg-blue-50 text-blue-600 border-blue-300'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {pageNumber}
            </Link>
            )
          })}
        </div>

        {/* Next Button */}
        {isLastPage ? (
          <span className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-400 bg-gray-100 cursor-not-allowed border border-gray-300 rounded-r-md">
            Next
            <ChevronRightIcon className="w-4 h-4" />
          </span>
            ) : (
              <Link
                to="/characters"
                search={(prev: any) => ({ ...prev, page: currentPage + 1 })}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-r-md"
              >
                Next
                <ChevronRightIcon className="w-4 h-4" />
              </Link>
            )}
      </div>
    </div>
  )
}
