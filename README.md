# Where's My Stuff

A personal apartment storage tracker. Map out your storage areas, define compartments inside them, and attach an inventory to each compartment. Find any item instantly via global search.

## Features

- **Visual storage map** — storage areas as color-coded cards, compartments as a nested grid inside each area
- **Inline editing** — click any name to rename it in place
- **Item inventory** — add/edit/delete items per compartment, with an optional note field per item
- **Move items** — reassign an item to any other compartment via a modal
- **Global search** — type anything in the search bar; results show the full breadcrumb path (`Area › Compartment`)
- **Persistent** — all data lives in `localStorage`; nothing leaves your browser
- **Export / Import** — download a JSON backup and restore it any time
- **Dark mode** — toggle in the header, preference is remembered

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Tech stack

| Layer | Choice |
|---|---|
| Framework | React 18 + Vite 5 |
| Styling | Tailwind CSS v3 |
| State | `useReducer` + Context |
| Persistence | `localStorage` |
| Icons | lucide-react |

## Project structure

```
src/
├── context/        # AppProvider, appReducer (all CRUD actions)
├── hooks/          # useLocalStorage, useSearch
├── components/
│   ├── area/       # StorageAreaCard, AreaHeader, AreaColorPicker
│   ├── compartment/# CompartmentGrid, CompartmentCard
│   ├── item/       # ItemList, ItemRow, AddItemInput
│   ├── search/     # SearchBar, SearchResultsPanel
│   └── ui/         # InlineEdit, Modal, MoveItemModal, ConfirmDialog
├── constants/      # colors palette, default seed state
└── utils/          # id generator, search logic
```
