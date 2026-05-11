import { forwardRef } from 'react'
import { Trash2, ChevronUp, ChevronDown } from 'lucide-react'
import { InlineEdit } from '../ui/InlineEdit'
import { ItemList } from '../item/ItemList'
import { AddItemInput } from '../item/AddItemInput'
import { ConfirmDialog } from '../ui/ConfirmDialog'
import { useAppContext } from '../../context/AppContext'
import { useState } from 'react'

export const CompartmentCard = forwardRef(function CompartmentCard({ compartment, areaId, highlighted }, ref) {
  const { dispatch } = useAppContext()
  const [confirmDelete, setConfirmDelete] = useState(false)

  function update(changes) {
    dispatch({ type: 'UPDATE_COMPARTMENT', areaId, id: compartment.id, changes })
  }

  return (
    <>
      <div
        ref={ref}
        className={`flex flex-col rounded-lg border bg-white dark:bg-gray-850 p-3 transition-all ${
          highlighted
            ? 'border-blue-400 ring-2 ring-blue-200 dark:ring-blue-800'
            : 'border-gray-200 dark:border-gray-700'
        }`}
      >
        {/* Compartment header */}
        <div className="flex items-center gap-1 mb-2">
          <InlineEdit
            value={compartment.name}
            onSave={name => update({ name })}
            className="flex-1 text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide"
          />
          <button
            data-action="reorder"
            title="Move left"
            onClick={() => dispatch({ type: 'REORDER_COMPARTMENT', areaId, id: compartment.id, direction: 'up' })}
            className="p-1 rounded text-gray-300 dark:text-gray-600 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <ChevronUp size={11} />
          </button>
          <button
            data-action="reorder"
            title="Move right"
            onClick={() => dispatch({ type: 'REORDER_COMPARTMENT', areaId, id: compartment.id, direction: 'down' })}
            className="p-1 rounded text-gray-300 dark:text-gray-600 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <ChevronDown size={11} />
          </button>
          <button
            data-action="delete"
            title="Delete compartment"
            onClick={() => setConfirmDelete(true)}
            className="p-1 rounded text-gray-300 dark:text-gray-600 hover:text-red-400"
          >
            <Trash2 size={11} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1">
          <ItemList items={compartment.items} areaId={areaId} compartmentId={compartment.id} />
          {compartment.items.length === 0 && (
            <p className="text-xs text-gray-300 dark:text-gray-600 italic mb-1">Empty</p>
          )}
        </div>

        {/* Add item */}
        <AddItemInput areaId={areaId} compartmentId={compartment.id} />
      </div>

      {confirmDelete && (
        <ConfirmDialog
          title="Delete compartment?"
          message={`"${compartment.name}" and its ${compartment.items.length} item(s) will be permanently deleted.`}
          onConfirm={() => { dispatch({ type: 'DELETE_COMPARTMENT', areaId, id: compartment.id }); setConfirmDelete(false) }}
          onCancel={() => setConfirmDelete(false)}
        />
      )}
    </>
  )
})
