import { createFileRoute } from '@tanstack/react-router'
import charactersService from '@/services/characters.service'

export const Route = createFileRoute('/characters/$characterId')({
  loader: async ({ params: { characterId } }) => {
    const response = await charactersService.getCharacter(Number(characterId))
    return {
      character: response.data
    }
  },
  component: CharacterDetailComponent,
})

function CharacterDetailComponent() {
  const { character } = Route.useLoaderData()
  
  return (
    <div className="character-detail">
      <div className="character-header">
        <img 
          src={character.image} 
          alt={character.name}
          className="character-image"
        />
        <div className="character-info">
          <h1 className="character-name">{character.name}</h1>
          <div className="character-status">
            <span className={`status-indicator ${character.status.toLowerCase()}`}></span>
            <span>{character.status} - {character.species}</span>
          </div>
        </div>
      </div>
      
      <div className="character-details">
        <div className="detail-section">
          <h3>Origin</h3>
          <p>{character.origin?.name || 'Unknown'}</p>
        </div>
        
        <div className="detail-section">
          <h3>Last Known Location</h3>
          <p>{character.location?.name || 'Unknown'}</p>
        </div>
        
        {character.type && (
          <div className="detail-section">
            <h3>Type</h3>
            <p>{character.type}</p>
          </div>
        )}
        
        <div className="detail-section">
          <h3>Gender</h3>
          <p>{character.gender}</p>
        </div>
        
        {character.episode && character.episode.length > 0 && (
          <div className="detail-section">
            <h3>Episodes</h3>
            <p>Appears in {character.episode.length} episode{character.episode.length !== 1 ? 's' : ''}</p>
          </div>
        )}
      </div>
    </div>
  )
}
