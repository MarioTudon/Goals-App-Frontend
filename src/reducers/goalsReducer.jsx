import { act } from "react"

function goalsReducer(state, action) {
    switch (action.type) {
        case 'create': {
            const {id} = action.payload
            const newGoal = action.payload
            const newState = {
                order: [...state.order, id],
                objects: {
                    ...state.objects,
                    [id]: { ...newGoal }
                }
            }
            return newState
        }
        case 'read': {
            const goals = action.payload
            const newState = {
                ...state,
                order: goals.map(goal => goal.id),
                objects: Object.fromEntries(goals.map(goal => [goal.id, goal]))
            }
            return newState
        };
        case 'update': {
            const goal = action.payload
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
            const id = action.payload.id
            const newState = {
                ...state,
                order: state.order.filter(item => item !== id),
                objects: { ...state.objects }
            }
            delete newState.objects[id]
            return newState
        }
        default: {
            throw new Error('The action doesn\'t exist')
        }
    }
}

export default goalsReducer
