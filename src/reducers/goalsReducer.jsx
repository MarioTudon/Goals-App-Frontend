function goalsReducer(state, action) {
    switch (action.type) {
        case 'create': {
            const id = action.goal.id;
            const newState = {
                order: Array.isArray(state.order) ? [...state.order, id] : [id],
                objects: {
                    ...state.objects,
                    [id]: { ...action.goal, id: id }
                }
            };
            return newState
        };
        case 'read': {
            return action.goals
        };
        case 'update': {
            const goal = action.goal;
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
            };
            delete newState.objects[id];
            return newState;
        }
        case 'increaseCount': {
            const id = action.id;
            const newState = {
                ...state,
                objects: {
                    ...state.objects,
                    [id]: {
                        ...state.objects[id],
                        count: state.objects[id].count + 1
                    }
                }
            };
            //localStorage.setItem('goals', JSON.stringify(newState));
            return newState;
        }
        case 'resetCount': {
            const id = action.id;
            const newState = {
                ...state,
                objects: {
                    ...state.objects,
                    [id]: {
                        ...state.objects[id],
                        count: 0
                    }
                }
            };
            //localStorage.setItem('goals', JSON.stringify(newState));
            return newState;
        }
        default: {
            throw new Error('The action doesn\'t exist');
        }
    }
}

export default goalsReducer;