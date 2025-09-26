import apiService from './api';
import type { Character, CharactersResponse, CharactersParams } from '@/types';

class CharactersService {
  getCharacters({ page, filter }: CharactersParams) {
    const params = new URLSearchParams();
    
    if (page) {
      params.append('page', page.toString());
    }
    
    if (filter) {
      Object.entries(filter).forEach(([key, value]) => {
        if (value) {
          params.append(key, value);
        }
      });
    }
    
    const queryString = params.toString();
    const url = queryString ? `/character?${queryString}` : '/character';
    
    return apiService.get<CharactersResponse>(url);
  }

  getCharacter(id: number) {
    return apiService.get<Character>(`/character/${id}`);
  }
}

export default new CharactersService();