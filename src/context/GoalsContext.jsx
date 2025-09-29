import { createContext, useReducer, useEffect } from "react"
import goalsReducer from '../reducers/goalsReducer'
import { requestGoals } from '../services/requests'

export const GoalsContext = createContext();

const GoalsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(goalsReducer, { order: [], objects: {} })

  useEffect(() => {
    async function fetchGoals() {
      try {
        const res = await requestGoals()
        dispatch({ type: "read", goals: res })
      }
      catch (error) {
        console.error(error)
        //Mandar a otra pagina para recargar
      }
    }
    fetchGoals();
  }, []);

  return (
    <GoalsContext.Provider value={{ state, dispatch }}>
      {children}
    </GoalsContext.Provider>
  );
}


export default GoalsContextProvider
