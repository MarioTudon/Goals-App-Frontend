export const initialState = {
    authenticated: false
}

function authReducer(state, action) {
    switch (action.type) {
        case 'login': {
            const newState = {
                ...state,
                authenticated: true
            }
            return newState
        }
        case 'logout': {
            const newState = {
                ...state,
                authenticated: false
            }
            return newState
        }
        default: {
            throw new Error('The action doesn\'t exist')
        }
    }
}

export default authReducer