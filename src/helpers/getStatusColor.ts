import { CharacterStatus } from "@/types"

export const getStatusColor = (status: CharacterStatus) => {
  switch (status.toLowerCase()) {
    case CharacterStatus.ALIVE:
      return 'bg-green-500'
    case CharacterStatus.DEAD:
      return 'bg-red-500'
    case CharacterStatus.UNKNOWN:
      return 'bg-gray-500'
    default:
      return 'bg-gray-500'
  }
}