import constants from '../constants/constants'

export default function movies(state = null, action) {
    
    switch (action.type) {
        
        case constants.MOVIES_FETCHED: {
            
            return  action.movies;
		}
		case constants.MOVIE_CREATED: {
            return [...state, action.movie];
        }
        case constants.CLEAR_ALL_MOVIES: {
            
            return [];
		}
        default:
            return state 
    }
}