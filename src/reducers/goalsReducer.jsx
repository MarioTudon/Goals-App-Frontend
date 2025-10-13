import { act } from "react"

function goalsReducer(state, action) {
    switch (action.type) {
        case 'create': {
            const id = action.payload.id

            const newState = {
                order: Array.isArray(state.order) ? [...state.order, id] : [id],
                objects: {
                    ...state.objects,
                    [id]: { ...action.payload, id: id }
                }
            }
            return newState
        }
        case 'read': {
            const goals = action.payload

            const order = goals.map(goal => goal.id)
            const objects = goals.reduce((acc, goal) => {
                acc[goal.id] = goal;
                return acc;
            }, {});
            return {
                order,
                objects
            }
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