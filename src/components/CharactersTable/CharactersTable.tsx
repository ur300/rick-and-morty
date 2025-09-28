"use no memo";
import { Link } from "@tanstack/react-router";
import {
  type CellContext,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { Character, CharacterStatus } from "@/types";
import { Avatar, Status } from "@/components";

const columnHelper = createColumnHelper<Character>();

interface CharactersTableProps {
  characters: Character[];
}

const columns = [
  columnHelper.accessor("image", {
    id: "image",
    header: "Image",
    cell: (info) => <Avatar src={info.getValue() as string} alt="Character" />,
  }),
  columnHelper.accessor("name", {
    id: "name",
    header: "Name",
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
  columnHelper.accessor("species", {
    id: "species",
    header: "Species",
  }),
  columnHelper.accessor("status", {
    id: "status",
    header: "Status",
    cell: (info: CellContext<Character, CharacterStatus>) => (
      <Status status={info.getValue()} />
    ),
  }),
  columnHelper.accessor("gender", {
    id: "gender",
    header: "Gender",
  }),
  columnHelper.accessor("location.name", {
    id: "location",
    header: "Location",
  }),
];

export function CharactersTable({ characters }: CharactersTableProps) {
  const table = useReactTable({
    data: characters,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
