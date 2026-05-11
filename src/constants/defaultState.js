export const DEFAULT_STATE = {
  version: 1,
  areas: [
    {
      id: 'area-seed-1',
      name: 'Entryway Cabinet',
      color: 'blue',
      positionHint: 'near front door',
      order: 0,
      compartments: [
        {
          id: 'comp-seed-1',
          name: 'Top shelf',
          order: 0,
          items: [
            { id: 'item-seed-1', name: 'Spare keys', note: '', addedAt: new Date().toISOString() },
            { id: 'item-seed-2', name: 'Sunglasses', note: 'black frames', addedAt: new Date().toISOString() },
          ],
        },
        {
          id: 'comp-seed-2',
          name: 'Bottom shelf',
          order: 1,
          items: [
            { id: 'item-seed-3', name: 'Umbrella', note: '', addedAt: new Date().toISOString() },
          ],
        },
      ],
    },
    {
      id: 'area-seed-2',
      name: 'Bathroom Storage',
      color: 'teal',
      positionHint: 'under the sink',
      order: 1,
      compartments: [
        {
          id: 'comp-seed-3',
          name: 'Left bin',
          order: 0,
          items: [
            { id: 'item-seed-4', name: 'Extra toilet paper', note: '', addedAt: new Date().toISOString() },
            { id: 'item-seed-5', name: 'Cleaning spray', note: '', addedAt: new Date().toISOString() },
          ],
        },
        {
          id: 'comp-seed-4',
          name: 'Right bin',
          order: 1,
          items: [
            { id: 'item-seed-6', name: 'First aid kit', note: '', addedAt: new Date().toISOString() },
          ],
        },
      ],
    },
    {
      id: 'area-seed-3',
      name: 'Bedroom Closet',
      color: 'amber',
      positionHint: 'left side of bedroom',
      order: 2,
      compartments: [
        {
          id: 'comp-seed-5',
          name: 'Top shelf',
          order: 0,
          items: [
            { id: 'item-seed-7', name: 'Winter blanket', note: 'grey wool', addedAt: new Date().toISOString() },
          ],
        },
        {
          id: 'comp-seed-6',
          name: 'Storage box',
          order: 1,
          items: [
            { id: 'item-seed-8', name: 'Extension cord', note: 'orange, 5m', addedAt: new Date().toISOString() },
            { id: 'item-seed-9', name: 'Charging cables', note: '', addedAt: new Date().toISOString() },
          ],
        },
      ],
    },
  ],
}
