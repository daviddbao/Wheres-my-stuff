import { SearchResultCard } from './SearchResultCard'

export function SearchResultsPanel({ results, query, onNavigate }) {
  return (
    <div className="max-w-2xl mx-auto w-full px-4 py-6">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {results.length === 0
          ? `No items found for "${query}"`
          : `${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`}
      </p>
      <div className="space-y-2">
        {results.map(r => (
          <SearchResultCard key={r.item.id} result={r} onNavigate={onNavigate} />
        ))}
      </div>
    </div>
  )
}
