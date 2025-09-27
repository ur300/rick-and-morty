import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { CharactersTable } from '@/components'
import { charactersQueryOptions } from '@/queries'
import { LoadingIndicator } from '@/components/LoadingIndicator'
import { z } from 'zod'
import type { PaginationState } from '@tanstack/react-table'

const charactersSearchSchema = z.object({
  page: z.number().int().positive().optional().default(1),
})

export const Route = createFileRoute('/characters/')({
  validateSearch: charactersSearchSchema,
  component: CharactersIndexComponent,
})

function CharactersIndexComponent() {
  const search = Route.useSearch()
  const navigate = Route.useNavigate()
  
  const pagination: PaginationState = {
    pageIndex: (search.page || 1) - 1,
    pageSize: 20,
  }
  
  const setPagination = (newPagination: PaginationState) => {
    navigate({
      search: { page: newPagination.pageIndex + 1 }
    })
  }
  
  const { data: characters, isLoading, error } = useQuery(charactersQueryOptions({ page: search.page }))
  
  console.log('Current page:', search.page);
  console.log('Characters data:', characters);
  console.log('Characters results length:', characters?.results?.length);
  console.log('Is loading:', isLoading);
  
  if (isLoading) {
    return <LoadingIndicator message="Loading characters list..." />
  }
  
  if (error) {
    return <div>Error loading characters: {error.message}</div>
  }
  
  if (!characters) {
    return <div>No characters data</div>
  }
  
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Rick and Morty Characters</h1>
      <CharactersTable 
        characters={characters.results} 
        totalPages={characters.info.pages}
        setPagination={setPagination}
        pagination={pagination}
      />
      <Outlet />
    </>
  )
}
