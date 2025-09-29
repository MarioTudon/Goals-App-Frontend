export const initialState = {
    token: '',
    authenticated: false
}

function authReducer(state, action) {
    switch (action.type) {
        case 'authorize': {
            const user = action.user;
            const newState = {
                token: user.token,
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