export const initialState = {
    authenticated: false,
    username: ''
}

function authReducer(state, action) {
    switch (action.type) {
        case 'login': {
            const { username } = action.payload
            const newState = {
                ...state,
                authenticated: true,
                username
            }
            return newState
        }
        case 'logout': {
            const newState = {
                ...state,
                authenticated: false,
                username: ''
            }
            return newState
        }
        default: {
            throw new Error('The action doesn\'t exist')
        }
    }
}

export default authReducer
