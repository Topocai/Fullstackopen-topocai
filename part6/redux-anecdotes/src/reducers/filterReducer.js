const reducer = (state = '', action) => {
    switch (action.type) {
        case 'filter/set':
            return action.payload.value.trim().toLowerCase()
        default:
            return state
    }
}

const createFilterAction = (type, payload) => ({type: `filter/${type}`, payload})

export const setFilter = (value) => createFilterAction('set', {value})

export default reducer