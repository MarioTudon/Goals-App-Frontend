import { createContext, useReducer, useEffect } from "react"
import goalsReducer from '../reducers/goalsReducer'
import { requestGoals } from '../services/requests'

export const GoalsContext = createContext();

const GoalsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(goalsReducer, { order: [], objects: {} })

  return (
    <GoalsContext.Provider value={{ state, dispatch }}>
      {children}
    </GoalsContext.Provider>
  )
}


export default GoalsContextProvider
