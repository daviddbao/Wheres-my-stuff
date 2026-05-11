import { Plus } from 'lucide-react'
import { useAppContext } from '../../context/AppContext'

export function AddCompartmentButton({ areaId }) {
  const { dispatch } = useAppContext()
  return (
    <button
      onClick={() => dispatch({ type: 'ADD_COMPARTMENT', areaId })}
      className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-dashed border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 hover:border-blue-400 hover:text-blue-500 dark:hover:border-blue-500 dark:hover:text-blue-400 text-xs transition-colors w-full"
    >
      <Plus size={12} />
      <span>Add compartment</span>
    </button>
  )
}
