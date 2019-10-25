const fetchUserReducer = (state = [], action) => {
    switch(action.type) {
        case "FETCH_USERS_SUCCESS":
            return [
                ...action.payload,
                ...state
            ]
        case "FETCH_USERS_API_SAGA_SUCCESS":
            return [
                ...action.payload,
                ...state
            ]

        case "FETCH_USERS_API_SAGA_START":
            return []
        case "FETCH_USERS_API_SAGA_ERROR":
            return state
        case "FETCH_USERS_START":
            return state
        case "FETCH_USERS_ERROR":
            return state
        default:
        return state
    }
}

export default fetchUserReducer