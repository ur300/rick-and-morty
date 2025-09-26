import { queryOptions } from '@tanstack/react-query'
import CharactersService from '@/services/characters.service'

export const charactersQueryOptions = queryOptions({
  queryKey: ['characters'],
  queryFn: async () => {
    const response = await CharactersService.getCharacters({ page: 1, filter: {} })
    return response.data
  },
})