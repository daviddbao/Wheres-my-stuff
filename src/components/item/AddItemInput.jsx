import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useAppContext } from '../../context/AppContext'

export function AddItemInput({ areaId, compartmentId }) {
  const { dispatch } = useAppContext()
  const [value, setValue] = useState('')

  function submit() {
    const trimmed = value.trim()
    if (!trimmed) return
    dispatch({ type: 'ADD_ITEM', areaId, compartmentId, name: trimmed })
    setValue('')
  }

  return (
    <div className="flex items-center gap-1 mt-1">
      <input
        type="text"
        placeholder="Add item..."
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && submit()}
        className="flex-1 text-xs px-2 py-1.5 border border-gray-200 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-300 min-w-0"
      />
      <button
        onClick={submit}
        className="flex-shrink-0 p-1.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400"
      >
        <Plus size={12} />
      </button>
    </div>
  )
}
