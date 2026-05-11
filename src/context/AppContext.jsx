import { createContext, useContext, useReducer, useEffect } from 'react'
import { appReducer } from './appReducer'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { DEFAULT_STATE } from '../constants/defaultState'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [saved, setSaved] = useLocalStorage('wms_state', DEFAULT_STATE)
  const [state, dispatch] = useReducer(appReducer, saved)

  // Sync reducer state back to localStorage on every change
  useEffect(() => {
    setSaved(state)
  }, [state]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppContext must be used within AppProvider')
  return ctx
}
