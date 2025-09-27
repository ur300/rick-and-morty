import { Link } from '@tanstack/react-router'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  type CellContext,
  useReactTable,
  type PaginationState,
  type Updater,
} from '@tanstack/react-table'
import type { Character } from '@/types'
import { CharacterStatus } from '@/types'
import { Avatar, Status, Pagination } from '@/components'

const columnHelper = createColumnHelper<Character>()

interface CharactersTableProps {
  characters: Character[]
  totalPages: number
  setPagination: (pagination: PaginationState) => void
  pagination: PaginationState
}

export function CharactersTable({ characters, totalPages, setPagination, pagination }: CharactersTableProps) {  
  const columns = [
    columnHelper.accessor('image', {
      id: 'image',
      header: 'Image',
      cell: (info: CellContext<Character, string>) => <Avatar src={info.getValue()} alt="Character" />,
    }),
    columnHelper.accessor('name', {
      id: 'name',
      header: 'Name',
      cell: (info) => (
        <Link
          to="/characters/$characterId"
          params={{ characterId: info.row.original.id.toString() }}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          {info.getValue()}
        </Link>
      ),
    }),
    columnHelper.accessor('species', {
      id: 'species',
      header: 'Species',
    }),
    columnHelper.accessor('status', {
      id: 'status',
      header: 'Status',
      cell: (info: CellContext<Character, CharacterStatus>) => <Status status={info.getValue()} />
    }),
    columnHelper.accessor('gender', {
      id: 'gender',
      header: 'Gender',
    }),
    columnHelper.accessor('location.name', {
      id: 'location',
      header: 'Location',
    }),
  ]
  
  const table = useReactTable({
    data: characters,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: totalPages,
    state: { pagination },
    onPaginationChange: (updaterOrValue: Updater<PaginationState> | PaginationState) => {
      if (typeof updaterOrValue === 'function') {
        setPagination(updaterOrValue(pagination))
      } else {
        setPagination(updaterOrValue)
      }
    },
    debugTable: true,
  })

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row, index) => (
              <tr key={`${row.id}-${pagination.pageIndex}-${index}`} className="hover:bg-gray-50">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination 
        currentPage={pagination.pageIndex + 1}
        totalPages={totalPages}
        pageSize={20}
        onPageChange={(page) => setPagination({ ...pagination, pageIndex: page - 1 })}
        showPageInfo={true}
        showPageSizeSelector={false}
      />
    </div>
  )
}
