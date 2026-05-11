export function searchItems(areas, query) {
  if (!query || query.trim().length === 0) return []
  const q = query.trim().toLowerCase()
  const results = []
  for (const area of areas) {
    for (const compartment of area.compartments) {
      for (const item of compartment.items) {
        if (
          item.name.toLowerCase().includes(q) ||
          item.note.toLowerCase().includes(q)
        ) {
          results.push({ item, compartment, area })
        }
      }
    }
  }
  return results
}
