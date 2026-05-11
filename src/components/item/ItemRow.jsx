import { useState } from 'react'
import { Trash2, MoveRight, ChevronDown, ChevronUp } from 'lucide-react'
import { InlineEdit } from '../ui/InlineEdit'
import { MoveItemModal } from '../ui/MoveItemModal'
import { useAppContext } from '../../context/AppContext'

export function ItemRow({ item, areaId, compartmentId }) {
  const { dispatch } = useAppContext()
  const [showNote, setShowNote] = useState(false)
  const [showMove, setShowMove] = useState(false)

  function deleteItem() {
    dispatch({ type: 'DELETE_ITEM', areaId, compartmentId, id: item.id })
  }

  return (
    <>
      <div className="group flex items-center gap-1.5 py-1 px-1 rounded hover:bg-black/3 dark:hover:bg-white/5">
        <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0" />

        <div className="flex-1 min-w-0">
          <InlineEdit
            value={item.name}
            onSave={name => dispatch({ type: 'UPDATE_ITEM', areaId, compartmentId, id: item.id, changes: { name } })}
            className="text-xs text-gray-700 dark:text-gray-200 w-full"
          />
          {item.note && showNote && (
            <InlineEdit
              value={item.note}
              onSave={note => dispatch({ type: 'UPDATE_ITEM', areaId, compartmentId, id: item.id, changes: { note } })}
              className="text-xs text-gray-400 dark:text-gray-500 w-full mt-0.5"
              placeholder="Add note..."
            />
          )}
        </div>

        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          {item.note !== undefined && (
            <button
              title={showNote ? 'Hide note' : 'Show/edit note'}
              onClick={() => setShowNote(v => !v)}
              className="p-1 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              {showNote ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
            </button>
          )}
          <button
            title="Move to another compartment"
            onClick={() => setShowMove(true)}
            className="p-1 rounded text-gray-400 hover:text-blue-500"
          >
            <MoveRight size={11} />
          </button>
          <button
            data-action="delete"
            title="Delete item"
            onClick={deleteItem}
            className="p-1 rounded text-gray-400 hover:text-red-500"
          >
            <Trash2 size={11} />
          </button>
        </div>
      </div>

      {showMove && (
        <MoveItemModal
          item={item}
          fromAreaId={areaId}
          fromCompartmentId={compartmentId}
          onClose={() => setShowMove(false)}
        />
      )}
    </>
  )
}
