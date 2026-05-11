import { Modal } from './Modal'

export function ConfirmDialog({ title, message, confirmLabel = 'Delete', onConfirm, onCancel }) {
  return (
    <Modal title={title} onClose={onCancel}>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-5">{message}</p>
      <div className="flex gap-3 justify-end">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          Cancel
        </button>
        <button
          data-action="confirm"
          onClick={onConfirm}
          className="px-4 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 font-medium"
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  )
}
