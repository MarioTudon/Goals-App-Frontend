export const initialState = {
    authenticated: false
}

function authReducer(state, action) {
    switch (action.type) {
        case 'login': {
            const user = action.payload
            const newState = {
                ...state,
                authenticated: user.authenticated
            }
            return newState
        }
        case 'logout': {
            const user = action.payload
            const newState = {
                ...state,
                authenticated: user.authenticated
            }
            return newState
        }
        default: {
            throw new Error('The action doesn\'t exist')
        }
    }
}

export default authReducer