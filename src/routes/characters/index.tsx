import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { CharactersTable, LoadingIndicator, CharacterFilters, Pagination } from '@/components'
import { charactersQueryOptions } from '@/queries'
import { z } from 'zod'
import { CharacterStatus } from '@/types'


const charactersSearchSchema = z.object({
  page: z.string().optional().transform((val) => val ? parseInt(val, 10) : 1),
  name: z.string().optional(),
  status: z.nativeEnum(CharacterStatus).optional(),
})

export const Route = createFileRoute('/characters/')({
  component: CharactersIndexComponent,
  pendingComponent: () => <LoadingIndicator message="Loading characters list..." />,
})

function CharactersIndexComponent() {
  const search = Route.useSearch()
  const navigate = Route.useNavigate()
  
  // Manual search parameter handling
  const currentPage = search.page ? parseInt(search.page as string, 10) : 1
  const name = search.name as string | undefined
  const status = search.status as CharacterStatus | undefined
  
  const handleNameChange = (newName: string | undefined) => {
    navigate({
      search: { 
        page: 1,
        name: newName,
        status
      }
    })
  }

  const handleStatusChange = (newStatus: CharacterStatus | undefined) => {
    navigate({
      search: { 
        page: 1,
        name: name,
        status: newStatus,
      }
    })
  }

  const handleClearFilters = () => {
    navigate({
      search: { 
        page: 1,
        name: undefined,
        status: undefined,
      }
    })
  }
  
  const { data: characters } = useSuspenseQuery(charactersQueryOptions({
    page: currentPage,
    filter: {
      name: name,
      status: status,
    }
  }))
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Rick and Morty Characters</h1>
      
      <CharacterFilters
        name={name}
        status={status}
        onNameChange={handleNameChange}
        onStatusChange={handleStatusChange}
        onClearFilters={handleClearFilters}
      />
      
      <CharactersTable characters={characters.results} />
      <Pagination 
        currentPage={currentPage}
        totalPages={characters.info.pages}
        pageSize={20}
        showPageInfo={true}
      />
      <Outlet />
    </>
  )
}
