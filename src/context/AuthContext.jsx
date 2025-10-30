import { createContext, useReducer, useEffect } from 'react'
import authReducer from '../reducers/authReducer.jsx'
import { refreshToken } from '../services/requests.jsx';

export const AuthContext = createContext(null)

const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { authenticated: false})

    useEffect(() => {
        async function login() {
            try {
                await refreshToken()
                dispatch({ type: 'login' })
            }
            catch (error) {
                console.error(error)
            }
        }
        login()
    }, [])

    return (
        <AuthContext.Provider value={{ state, dispatch }} >
            {children}
        </AuthContext.Provider >
    )
}

export default AuthContextProvider