import { ItemRow } from './ItemRow'

export function ItemList({ items, areaId, compartmentId }) {
  if (items.length === 0) return null
  return (
    <div className="space-y-0.5 mb-1">
      {items.map(item => (
        <ItemRow key={item.id} item={item} areaId={areaId} compartmentId={compartmentId} />
      ))}
    </div>
  )
}
