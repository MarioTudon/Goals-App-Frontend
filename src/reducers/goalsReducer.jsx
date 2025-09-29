function goalsReducer(state, action) {
    switch (action.type) {
        case 'create': {
            const id = action.newGoal.id

            if(action.newGoal.id === -1) {
                return state
            }

            const newState = {
                order: Array.isArray(state.order) ? [...state.order, id] : [id],
                objects: {
                    ...state.objects,
                    [id]: { ...action.newGoal, id: id }
                }
            }
            return newState
        }
        case 'read': {
            return action.goals
        };
        case 'update': {
            const goal = action.updatedGoal;
            const newState = {
                ...state,
                objects: {
                    ...state.objects,
                    [goal.id]: goal  
                }
            }
            return newState;
        }
        case 'delete': {
            const id = action.id;
            const newState = {
                ...state,
                order: state.order.filter(item => item !== id),
                objects: { ...state.objects }
            }
            delete newState.objects[id];
            return newState;
        }
        default: {
            throw new Error('The action doesn\'t exist');
        }
    }
}

export default goalsReducer