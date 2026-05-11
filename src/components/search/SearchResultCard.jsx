import { ChevronRight } from 'lucide-react'
import { ColorDot } from '../ui/ColorDot'

export function SearchResultCard({ result, onNavigate }) {
  const { item, compartment, area } = result

  return (
    <button
      onClick={() => onNavigate(area.id, compartment.id)}
      className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-sm transition-all"
    >
      <ColorDot colorKey={area.color} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">{item.name}</p>
        {item.note && (
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{item.note}</p>
        )}
        <div className="flex items-center gap-1 mt-0.5 text-xs text-gray-400 dark:text-gray-500">
          <span>{area.name}</span>
          <ChevronRight size={10} />
          <span>{compartment.name}</span>
        </div>
      </div>
    </button>
  )
}
