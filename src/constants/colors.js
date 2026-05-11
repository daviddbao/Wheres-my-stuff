export const AREA_COLORS = [
  { key: 'slate',  bg: 'bg-slate-100',  border: 'border-slate-400',  text: 'text-slate-700',  dot: 'bg-slate-400'  },
  { key: 'blue',   bg: 'bg-blue-50',    border: 'border-blue-400',   text: 'text-blue-700',   dot: 'bg-blue-400'   },
  { key: 'green',  bg: 'bg-green-50',   border: 'border-green-500',  text: 'text-green-700',  dot: 'bg-green-500'  },
  { key: 'amber',  bg: 'bg-amber-50',   border: 'border-amber-400',  text: 'text-amber-700',  dot: 'bg-amber-400'  },
  { key: 'red',    bg: 'bg-red-50',     border: 'border-red-400',    text: 'text-red-700',    dot: 'bg-red-400'    },
  { key: 'purple', bg: 'bg-purple-50',  border: 'border-purple-400', text: 'text-purple-700', dot: 'bg-purple-400' },
  { key: 'pink',   bg: 'bg-pink-50',    border: 'border-pink-400',   text: 'text-pink-700',   dot: 'bg-pink-400'   },
  { key: 'teal',   bg: 'bg-teal-50',    border: 'border-teal-500',   text: 'text-teal-700',   dot: 'bg-teal-500'   },
]

export const DEFAULT_COLOR = 'slate'

export function getColor(key) {
  return AREA_COLORS.find(c => c.key === key) ?? AREA_COLORS[0]
}
