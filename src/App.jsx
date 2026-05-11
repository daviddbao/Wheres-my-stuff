import { useState, useRef, useEffect } from 'react'
import { AppProvider, useAppContext } from './context/AppContext'
import { Header } from './components/layout/Header'
import { StorageAreaCard } from './components/area/StorageAreaCard'
import { AddAreaButton } from './components/area/AddAreaButton'
import { SearchResultsPanel } from './components/search/SearchResultsPanel'
import { useSearch } from './hooks/useSearch'
import { Package } from 'lucide-react'

function AppContent() {
  const { state } = useAppContext()
  const { query, setQuery, results } = useSearch(state.areas)
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('wms_dark') === 'true'
  )
  const [highlight, setHighlight] = useState(null) // { areaId, compartmentId }
  const areaRefs = useRef({})

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('wms_dark', darkMode)
  }, [darkMode])

  const sorted = [...state.areas].sort((a, b) => a.order - b.order)

  function handleNavigate(areaId, compartmentId) {
    setQuery('')
    setHighlight({ areaId, compartmentId })
    setTimeout(() => {
      areaRefs.current[areaId]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
    setTimeout(() => setHighlight(null), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100">
      <Header
        query={query}
        onQueryChange={setQuery}
        darkMode={darkMode}
        onToggleDark={() => setDarkMode(v => !v)}
      />

      <main className="max-w-6xl mx-auto px-4 py-6">
        {query.trim() ? (
          <SearchResultsPanel
            results={results}
            query={query}
            onNavigate={handleNavigate}
          />
        ) : (
          <>
            {sorted.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <Package size={56} className="text-gray-300 dark:text-gray-600 mb-4" />
                <h2 className="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-2">
                  No storage areas yet
                </h2>
                <p className="text-sm text-gray-400 dark:text-gray-500 mb-6 max-w-xs">
                  Add your first storage area to start tracking where things live in your apartment.
                </p>
                <AddAreaButton />
              </div>
            ) : (
              <div className="space-y-5">
                {sorted.map(area => (
                  <StorageAreaCard
                    key={area.id}
                    ref={el => { areaRefs.current[area.id] = el }}
                    area={area}
                    highlightedCompartmentId={
                      highlight?.areaId === area.id ? highlight.compartmentId : null
                    }
                  />
                ))}
                <AddAreaButton />
              </div>
            )}
          </>
        )}
      </main>

      <footer className="text-center py-4 text-xs text-gray-400 dark:text-gray-600">
        All data stored locally in this browser
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}
