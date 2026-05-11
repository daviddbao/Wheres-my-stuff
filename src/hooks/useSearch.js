import { useState, useEffect } from 'react'
import { searchItems } from '../utils/search'

export function useSearch(areas) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  useEffect(() => {
    const timer = setTimeout(() => {
      setResults(searchItems(areas, query))
    }, 150)
    return () => clearTimeout(timer)
  }, [areas, query])

  return { query, setQuery, results }
}
