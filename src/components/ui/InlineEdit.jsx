import { useState, useRef, useEffect } from 'react'

export function InlineEdit({ value, onSave, className = '', placeholder = 'Untitled' }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const inputRef = useRef(null)

  useEffect(() => {
    if (editing) inputRef.current?.select()
  }, [editing])

  function commit() {
    const trimmed = draft.trim()
    if (trimmed) onSave(trimmed)
    else setDraft(value) // revert if empty
    setEditing(false)
  }

  function handleBlur(e) {
    // Skip auto-save if focus moved to a data-action button (e.g. delete)
    if (e.relatedTarget?.dataset?.action) {
      setDraft(value)
      setEditing(false)
      return
    }
    commit()
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') { e.preventDefault(); commit() }
    if (e.key === 'Escape') { setDraft(value); setEditing(false) }
  }

  if (editing) {
    return (
      <input
        ref={inputRef}
        className={`bg-white dark:bg-gray-800 border border-blue-400 rounded px-1 outline-none focus:ring-2 focus:ring-blue-300 ${className}`}
        value={draft}
        onChange={e => setDraft(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
    )
  }

  return (
    <span
      role="button"
      tabIndex={0}
      title="Click to rename"
      className={`cursor-text hover:bg-black/5 dark:hover:bg-white/10 rounded px-1 ${className}`}
      onClick={() => { setDraft(value); setEditing(true) }}
      onKeyDown={e => e.key === 'Enter' && (setDraft(value), setEditing(true))}
    >
      {value || <span className="text-gray-400 italic">{placeholder}</span>}
    </span>
  )
}
