import React from "react";
import { type Character } from "@/types";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Status } from "@/components";

type CharacterDetailsTableProps = {
  character: Character;
};

type CharacterInfo = {
  property: string;
  value: string | React.ReactNode;
};

const columnHelper = createColumnHelper<CharacterInfo>();

export const CharacterDetailsTable = ({
  character,
}: CharacterDetailsTableProps) => {
  const characterInfo: CharacterInfo[] = [
    {
      property: "Status",
      value: <Status status={character.status} />,
    },
    {
      property: "Species",
      value: character.species,
    },
    {
      property: "Gender",
      value: character.gender,
    },
    ...(character.type
      ? [
          {
            property: "Type",
            value: character.type,
          },
        ]
      : []),
    {
      property: "Origin",
      value: character.origin?.name || "Unknown",
    },
    {
      property: "Last Known Location",
      value: character.location?.name || "Unknown",
    },
    ...(character.episode && character.episode.length > 0
      ? [
          {
            property: "Episodes",
            value: `Appears in ${character.episode.length} episode${character.episode.length !== 1 ? "s" : ""}`,
          },
        ]
      : []),
  ];

  const columns = [
    columnHelper.accessor("property", {
      header: "Property",
      cell: (info) => (
        <div className="font-semibold text-gray-900 bg-gray-50 px-6 py-4">
          {info.getValue()}
        </div>
      ),
    }),
    columnHelper.accessor("value", {
      header: "Value",
      cell: (info) => (
        <div className="px-6 py-4 text-gray-700">{info.getValue()}</div>
      ),
    }),
  ];

  const table = useReactTable({
    data: characterInfo,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <table className="w-full">
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="border-b border-gray-200 last:border-b-0"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
