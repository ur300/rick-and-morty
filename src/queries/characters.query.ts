import { queryOptions } from "@tanstack/react-query";
import CharactersService from "@/services/characters.service";
import type { CharactersParams } from "@/types";
import { QUERY_STALE_TIME } from "@/constants/app";

export const charactersQueryOptions = (params: CharactersParams = {}) =>
  queryOptions({
    queryKey: ["characters", params],
    queryFn: async () => {
      const response = await CharactersService.getCharacters(params);
      return response.data;
    },
    staleTime: QUERY_STALE_TIME
  });
