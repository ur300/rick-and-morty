import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import type { Character } from '@/types'
import { charactersQueryOptions } from '@/queries'

export const Route = createFileRoute('/characters/')({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(charactersQueryOptions),
  component: CharactersIndexComponent,
})

function CharactersIndexComponent() {
  const { data: characters } = useSuspenseQuery(charactersQueryOptions)
  console.log(characters)
  return (
    <div className="characters-page">
      <h1>Rick and Morty Characters</h1>
      <div className="characters-grid">
        {characters.results.map((character: Character) => (
          <Link
            key={character.id}
            to="/characters/$characterId"
            params={{ characterId: character.id.toString() }}
            className="character-card"
          >
            <img 
              src={character.image} 
              alt={character.name}
              className="character-thumbnail"
            />
            <div className="character-card-info">
              <h3>{character.name}</h3>
              <p>{character.species} - {character.status}</p>
            </div>
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  )
}
