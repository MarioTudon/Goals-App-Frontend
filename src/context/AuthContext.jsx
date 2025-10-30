import { createContext, useReducer, useEffect } from 'react'
import authReducer from '../reducers/authReducer.jsx'
import { refreshToken } from '../services/requests.jsx'
import { useNavigate } from "react-router"

export const AuthContext = createContext(null)

const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { authenticated: false })
    const navigate = useNavigate()

    useEffect(() => {
        async function login() {
            try {
                await refreshToken()
                dispatch({ type: 'login' })
                navigate('/Goals-List')
            }
            catch (err) {
                console.error(err.error, '\n', err)
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