import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { CharactersTable } from '@/components'
import { charactersQueryOptions } from '@/queries'

export const Route = createFileRoute('/characters/')({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(charactersQueryOptions),
  component: CharactersIndexComponent,
})

function CharactersIndexComponent() {
  const { data: characters } = useSuspenseQuery(charactersQueryOptions)

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Rick and Morty Characters</h1>
      <CharactersTable characters={characters.results} />
      <Outlet />
    </>
  )
}
