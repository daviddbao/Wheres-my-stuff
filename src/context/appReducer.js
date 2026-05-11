import { newId } from '../utils/id'
import { DEFAULT_COLOR } from '../constants/colors'

export function appReducer(state, action) {
  switch (action.type) {

    // ─── Areas ───────────────────────────────────────────────────────────────

    case 'ADD_AREA': {
      const newArea = {
        id: newId(),
        name: 'New storage area',
        color: DEFAULT_COLOR,
        positionHint: '',
        order: state.areas.length,
        compartments: [],
      }
      return { ...state, areas: [...state.areas, newArea] }
    }

    case 'UPDATE_AREA': {
      const { id, changes } = action
      return {
        ...state,
        areas: state.areas.map(a => a.id === id ? { ...a, ...changes } : a),
      }
    }

    case 'DELETE_AREA': {
      const filtered = state.areas.filter(a => a.id !== action.id)
      return { ...state, areas: filtered.map((a, i) => ({ ...a, order: i })) }
    }

    case 'REORDER_AREA': {
      const { id, direction } = action
      const areas = [...state.areas].sort((a, b) => a.order - b.order)
      const idx = areas.findIndex(a => a.id === id)
      if (direction === 'up' && idx === 0) return state
      if (direction === 'down' && idx === areas.length - 1) return state
      const swapIdx = direction === 'up' ? idx - 1 : idx + 1
      ;[areas[idx].order, areas[swapIdx].order] = [areas[swapIdx].order, areas[idx].order]
      return { ...state, areas }
    }

    // ─── Compartments ─────────────────────────────────────────────────────────

    case 'ADD_COMPARTMENT': {
      const { areaId } = action
      return {
        ...state,
        areas: state.areas.map(a => {
          if (a.id !== areaId) return a
          const newComp = {
            id: newId(),
            name: 'New compartment',
            order: a.compartments.length,
            items: [],
          }
          return { ...a, compartments: [...a.compartments, newComp] }
        }),
      }
    }

    case 'UPDATE_COMPARTMENT': {
      const { areaId, id, changes } = action
      return {
        ...state,
        areas: state.areas.map(a => {
          if (a.id !== areaId) return a
          return {
            ...a,
            compartments: a.compartments.map(c =>
              c.id === id ? { ...c, ...changes } : c
            ),
          }
        }),
      }
    }

    case 'DELETE_COMPARTMENT': {
      const { areaId, id } = action
      return {
        ...state,
        areas: state.areas.map(a => {
          if (a.id !== areaId) return a
          const filtered = a.compartments.filter(c => c.id !== id)
          return { ...a, compartments: filtered.map((c, i) => ({ ...c, order: i })) }
        }),
      }
    }

    case 'REORDER_COMPARTMENT': {
      const { areaId, id, direction } = action
      return {
        ...state,
        areas: state.areas.map(a => {
          if (a.id !== areaId) return a
          const comps = [...a.compartments].sort((x, y) => x.order - y.order)
          const idx = comps.findIndex(c => c.id === id)
          if (direction === 'up' && idx === 0) return a
          if (direction === 'down' && idx === comps.length - 1) return a
          const swapIdx = direction === 'up' ? idx - 1 : idx + 1
          ;[comps[idx].order, comps[swapIdx].order] = [comps[swapIdx].order, comps[idx].order]
          return { ...a, compartments: comps }
        }),
      }
    }

    // ─── Items ────────────────────────────────────────────────────────────────

    case 'ADD_ITEM': {
      const { areaId, compartmentId, name } = action
      const newItem = {
        id: newId(),
        name: name.trim(),
        note: '',
        addedAt: new Date().toISOString(),
      }
      return {
        ...state,
        areas: state.areas.map(a => {
          if (a.id !== areaId) return a
          return {
            ...a,
            compartments: a.compartments.map(c => {
              if (c.id !== compartmentId) return c
              return { ...c, items: [...c.items, newItem] }
            }),
          }
        }),
      }
    }

    case 'UPDATE_ITEM': {
      const { areaId, compartmentId, id, changes } = action
      return {
        ...state,
        areas: state.areas.map(a => {
          if (a.id !== areaId) return a
          return {
            ...a,
            compartments: a.compartments.map(c => {
              if (c.id !== compartmentId) return c
              return {
                ...c,
                items: c.items.map(it => it.id === id ? { ...it, ...changes } : it),
              }
            }),
          }
        }),
      }
    }

    case 'DELETE_ITEM': {
      const { areaId, compartmentId, id } = action
      return {
        ...state,
        areas: state.areas.map(a => {
          if (a.id !== areaId) return a
          return {
            ...a,
            compartments: a.compartments.map(c => {
              if (c.id !== compartmentId) return c
              return { ...c, items: c.items.filter(it => it.id !== id) }
            }),
          }
        }),
      }
    }

    case 'MOVE_ITEM': {
      const { item, fromAreaId, fromCompartmentId, toAreaId, toCompartmentId } = action
      // Remove from source
      let next = appReducer(state, {
        type: 'DELETE_ITEM',
        areaId: fromAreaId,
        compartmentId: fromCompartmentId,
        id: item.id,
      })
      // Add to destination (preserve existing item data)
      return {
        ...next,
        areas: next.areas.map(a => {
          if (a.id !== toAreaId) return a
          return {
            ...a,
            compartments: a.compartments.map(c => {
              if (c.id !== toCompartmentId) return c
              return { ...c, items: [...c.items, item] }
            }),
          }
        }),
      }
    }

    case 'LOAD_STATE': {
      return { ...action.state, version: 1 }
    }

    default:
      return state
  }
}
