import { useState } from 'react'
import { Modal } from './Modal'
import { useAppContext } from '../../context/AppContext'

export function MoveItemModal({ item, fromAreaId, fromCompartmentId, onClose }) {
  const { state, dispatch } = useAppContext()
  const [toAreaId, setToAreaId] = useState(fromAreaId)
  const [toCompartmentId, setToCompartmentId] = useState('')

  const toArea = state.areas.find(a => a.id === toAreaId)
  const availableCompartments = toArea?.compartments.filter(
    c => !(c.id === fromCompartmentId && toAreaId === fromAreaId)
  ) ?? []

  function handleMove() {
    if (!toCompartmentId) return
    dispatch({
      type: 'MOVE_ITEM',
      item,
      fromAreaId,
      fromCompartmentId,
      toAreaId,
      toCompartmentId,
    })
    onClose()
  }

  return (
    <Modal title={`Move "${item.name}"`} onClose={onClose}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Storage area
          </label>
          <select
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
            value={toAreaId}
            onChange={e => { setToAreaId(e.target.value); setToCompartmentId('') }}
          >
            {state.areas.map(a => (
              <option key={a.id} value={a.id}>{a.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Compartment
          </label>
          <select
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
            value={toCompartmentId}
            onChange={e => setToCompartmentId(e.target.value)}
          >
            <option value="">— select compartment —</option>
            {availableCompartments.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-3 justify-end pt-1">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleMove}
            disabled={!toCompartmentId}
            className="px-4 py-2 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600 font-medium disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Move
          </button>
        </div>
      </div>
    </Modal>
  )
}
