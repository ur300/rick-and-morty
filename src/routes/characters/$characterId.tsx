import { createFileRoute } from '@tanstack/react-router'
import charactersService from '@/services/characters.service'
import { CharacterDetail } from '@/components/CharacterDetail'
import { Breadcrumbs } from '@/components/Breadcrumbs'

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
  
  return <>
    <Breadcrumbs items={[{ label: 'Characters', href: '/characters' }, { label: character.name, current: true }]} />
    <CharacterDetail character={character} />
  </>
}
