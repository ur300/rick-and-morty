import { type Character } from '@/types'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Status } from '../Status'

type CharacterDetailProps = {
  character: Character
}

type CharacterInfo = {
  property: string
  value: string | React.ReactNode
}

const columnHelper = createColumnHelper<CharacterInfo>()

export const CharacterDetail = ({ character }: CharacterDetailProps) => {console.log(character)
  const characterInfo: CharacterInfo[] = [
    {
      property: 'Status',
      value: <Status status={character.status} />,
    },
    {
      property: 'Species',
      value: character.species,
    },
    {
      property: 'Gender',
      value: character.gender,
    },
    ...(character.type ? [{
      property: 'Type',
      value: character.type,
    }] : []),
    {
      property: 'Origin',
      value: character.origin?.name || 'Unknown',
    },
    {
      property: 'Last Known Location',
      value: character.location?.name || 'Unknown',
    },
    ...(character.episode && character.episode.length > 0 ? [{
      property: 'Episodes',
      value: `Appears in ${character.episode.length} episode${character.episode.length !== 1 ? 's' : ''}`,
    }] : []),
  ]

  const columns = [
    columnHelper.accessor('property', {
      header: 'Property',
      cell: (info) => (
        <div className="font-semibold text-gray-900 bg-gray-50 px-6 py-4">
          {info.getValue()}
        </div>
      ),
    }),
    columnHelper.accessor('value', {
      header: 'Value',
      cell: (info) => (
        <div className="px-6 py-4 text-gray-700">
          {info.getValue()}
        </div>
      ),
    }),
  ]

  const table = useReactTable({
    data: characterInfo,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="max-w-6xl py-6">
      <div className="flex flex-col lg:flex-row gap-8 lg:items-end">
        
        <div className="flex-shrink-0">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {character.name}
            </h1>
            <img 
              src={character.image} 
              alt={character.name}
              className="w-64 h-64 lg:w-80 lg:h-80 rounded-lg object-cover mx-auto"
            />
          </div>
        </div>
        
        <div className="flex-1">
          <div className="bg-white overflow-hidden">
            <table className="w-full">
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-b border-gray-200 last:border-b-0">
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
        </div>
      </div>
    </div>
  )
}
