import React, { useReducer, createContext } from 'react'
import authReducer, { initialState } from '../reducers/authReducer.jsx'

export const AuthContext = createContext(null)

const AuthContextProvider = ({ children }) => {
    const value = useReducer(authReducer, initialState)

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider