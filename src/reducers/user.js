import constants from '../constants/constants'

export default function user(state = {}, action = {}) {
  switch (action.type) {
	  case constants.USER_LOGGED_IN:
      // state.token = action.user.isLoged;
      return {...action.user};
    case constants.USER_LOGGED_OUT:
      return {};
    default:
      return state;
  }
}
