import { useRef, useEffect } from 'react'
import { CompartmentCard } from './CompartmentCard'
import { AddCompartmentButton } from './AddCompartmentButton'

export function CompartmentGrid({ compartments, areaId, highlightedCompartmentId }) {
  const sorted = [...compartments].sort((a, b) => a.order - b.order)
  const refs = useRef({})

  useEffect(() => {
    if (highlightedCompartmentId && refs.current[highlightedCompartmentId]) {
      refs.current[highlightedCompartmentId].scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [highlightedCompartmentId])

  return (
    <div className="px-4 pb-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
        {sorted.map(comp => (
          <CompartmentCard
            key={comp.id}
            ref={el => { refs.current[comp.id] = el }}
            compartment={comp}
            areaId={areaId}
            highlighted={comp.id === highlightedCompartmentId}
          />
        ))}
      </div>
      <AddCompartmentButton areaId={areaId} />
    </div>
  )
}
