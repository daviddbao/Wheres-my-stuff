import { Package, Moon, Sun, Download, Upload } from 'lucide-react'
import { SearchBar } from '../search/SearchBar'
import { useAppContext } from '../../context/AppContext'

export function Header({ query, onQueryChange, darkMode, onToggleDark }) {
  const { state, dispatch } = useAppContext()

  function handleExport() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'wheres-my-stuff.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleImport(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => {
      try {
        const parsed = JSON.parse(ev.target.result)
        if (parsed?.areas) dispatch({ type: 'LOAD_STATE', state: parsed })
      } catch {
        alert('Invalid backup file.')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-3">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 flex-shrink-0">
          <Package size={20} />
          <span className="font-semibold text-gray-800 dark:text-gray-100 text-sm hidden sm:block">
            Where&apos;s My Stuff
          </span>
        </div>

        <div className="flex-1 flex justify-center">
          <SearchBar query={query} onChange={onQueryChange} />
        </div>

        <div className="flex items-center gap-1 flex-shrink-0">
          <label
            title="Import backup"
            className="cursor-pointer p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Upload size={16} />
            <input type="file" accept=".json" className="hidden" onChange={handleImport} />
          </label>
          <button
            title="Export backup"
            onClick={handleExport}
            className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Download size={16} />
          </button>
          <button
            title="Toggle dark mode"
            onClick={onToggleDark}
            className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>
    </header>
  )
}
