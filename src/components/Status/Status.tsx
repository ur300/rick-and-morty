import { CharacterStatus } from '@/types'

interface StatusProps {
  status: CharacterStatus
  className?: string
}

const statusColors = {
  [CharacterStatus.ALIVE]: 'bg-green-100 text-green-800',
  [CharacterStatus.DEAD]: 'bg-red-100 text-red-800',
  [CharacterStatus.UNKNOWN]: 'bg-gray-100 text-gray-800',
}

export function Status({ status, className }: StatusProps) { 
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]} ${className || ''}`}>
      {status}
    </span>
  )
}
