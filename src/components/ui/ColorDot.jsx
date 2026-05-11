import { getColor } from '../../constants/colors'

export function ColorDot({ colorKey, size = 'md', className = '' }) {
  const color = getColor(colorKey)
  const sizeClass = size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'
  return (
    <span
      className={`inline-block rounded-full flex-shrink-0 ${sizeClass} ${color.dot} ${className}`}
    />
  )
}
