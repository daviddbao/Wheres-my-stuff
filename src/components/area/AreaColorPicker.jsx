import { useEffect, useRef } from 'react'
import { AREA_COLORS } from '../../constants/colors'

export function AreaColorPicker({ current, onSelect, onClose }) {
  const ref = useRef(null)

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose() }
    function onClick(e) { if (ref.current && !ref.current.contains(e.target)) onClose() }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [onClose])

  return (
    <div
      ref={ref}
      className="absolute left-0 top-full mt-1 z-30 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-2 flex flex-wrap gap-2 w-40"
    >
      {AREA_COLORS.map(color => (
        <button
          key={color.key}
          title={color.key}
          onClick={() => { onSelect(color.key); onClose() }}
          className={`w-7 h-7 rounded-full ${color.dot} transition-transform hover:scale-110 ${current === color.key ? 'ring-2 ring-offset-1 ring-gray-600 dark:ring-gray-200' : ''}`}
        />
      ))}
    </div>
  )
}
