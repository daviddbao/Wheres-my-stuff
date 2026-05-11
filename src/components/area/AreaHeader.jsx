import { useState } from 'react'
import { ChevronUp, ChevronDown, Trash2, MapPin } from 'lucide-react'
import { InlineEdit } from '../ui/InlineEdit'
import { ColorDot } from '../ui/ColorDot'
import { AreaColorPicker } from './AreaColorPicker'
import { ConfirmDialog } from '../ui/ConfirmDialog'
import { useAppContext } from '../../context/AppContext'

export function AreaHeader({ area }) {
  const { dispatch } = useAppContext()
  const [showPicker, setShowPicker] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  function update(changes) {
    dispatch({ type: 'UPDATE_AREA', id: area.id, changes })
  }

  return (
    <>
      <div className="flex items-start gap-2 px-4 pt-4 pb-2">
        {/* Color dot + picker */}
        <div className="relative mt-0.5">
          <button
            title="Change color"
            onClick={() => setShowPicker(v => !v)}
            className="flex-shrink-0"
          >
            <ColorDot colorKey={area.color} size="lg" className="hover:scale-110 transition-transform" />
          </button>
          {showPicker && (
            <AreaColorPicker
              current={area.color}
              onSelect={key => update({ color: key })}
              onClose={() => setShowPicker(false)}
            />
          )}
        </div>

        {/* Name + hint */}
        <div className="flex-1 min-w-0">
          <InlineEdit
            value={area.name}
            onSave={name => update({ name })}
            className="text-base font-semibold text-gray-800 dark:text-gray-100 w-full"
          />
          <div className="flex items-center gap-1 mt-0.5">
            <MapPin size={11} className="text-gray-400 flex-shrink-0" />
            <InlineEdit
              value={area.positionHint}
              onSave={positionHint => update({ positionHint })}
              placeholder="Add location hint..."
              className="text-xs text-gray-400 dark:text-gray-500"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-0.5 flex-shrink-0">
          <button
            data-action="reorder"
            title="Move up"
            onClick={() => dispatch({ type: 'REORDER_AREA', id: area.id, direction: 'up' })}
            className="p-1.5 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-black/5 dark:hover:bg-white/10"
          >
            <ChevronUp size={14} />
          </button>
          <button
            data-action="reorder"
            title="Move down"
            onClick={() => dispatch({ type: 'REORDER_AREA', id: area.id, direction: 'down' })}
            className="p-1.5 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-black/5 dark:hover:bg-white/10"
          >
            <ChevronDown size={14} />
          </button>
          <button
            data-action="delete"
            title="Delete area"
            onClick={() => setConfirmDelete(true)}
            className="p-1.5 rounded text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {confirmDelete && (
        <ConfirmDialog
          title="Delete storage area?"
          message={`"${area.name}" and all its compartments and items will be permanently deleted.`}
          onConfirm={() => { dispatch({ type: 'DELETE_AREA', id: area.id }); setConfirmDelete(false) }}
          onCancel={() => setConfirmDelete(false)}
        />
      )}
    </>
  )
}
