import { forwardRef } from 'react'
import { getColor } from '../../constants/colors'
import { AreaHeader } from './AreaHeader'
import { CompartmentGrid } from '../compartment/CompartmentGrid'

export const StorageAreaCard = forwardRef(function StorageAreaCard(
  { area, highlightedCompartmentId },
  ref
) {
  const color = getColor(area.color)

  return (
    <div
      ref={ref}
      className={`rounded-xl border-2 ${color.border} ${color.bg} dark:bg-gray-900 overflow-hidden shadow-sm`}
    >
      <AreaHeader area={area} />
      <CompartmentGrid
        compartments={area.compartments}
        areaId={area.id}
        highlightedCompartmentId={highlightedCompartmentId}
      />
    </div>
  )
})
