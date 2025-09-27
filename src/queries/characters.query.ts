import { queryOptions } from '@tanstack/react-query'
import CharactersService from '@/services/characters.service'
import type { CharactersParams } from '@/types'

export const charactersQueryOptions = (params: CharactersParams = {}) => queryOptions({
  queryKey: ['characters', params],
  queryFn: async () => {
    const response = await CharactersService.getCharacters(params)
    return response.data
  },
  staleTime: 0,
  gcTime: 10 * 60 * 1000, // 10 minutes
})
