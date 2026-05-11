import { Plus } from 'lucide-react'
import { useAppContext } from '../../context/AppContext'

export function AddAreaButton() {
  const { dispatch } = useAppContext()
  return (
    <button
      onClick={() => dispatch({ type: 'ADD_AREA' })}
      className="flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-blue-400 hover:text-blue-500 dark:hover:border-blue-500 dark:hover:text-blue-400 transition-colors w-full"
    >
      <Plus size={16} />
      <span className="text-sm font-medium">Add storage area</span>
    </button>
  )
}
