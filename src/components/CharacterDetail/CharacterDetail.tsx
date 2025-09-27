import { type Character } from '@/types'
import { CharacterDetailsTable } from './CharacterDetailsTable'

type CharacterDetailProps = {
  character: Character
}

export const CharacterDetail = ({ character }: CharacterDetailProps) => {

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
          <CharacterDetailsTable character={character} />
        </div>
      </div>
    </div>
  )
}
