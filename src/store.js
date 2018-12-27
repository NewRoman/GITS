import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createReducer from './reducers';

const composeEnhancers =
  typeof window === 'object' &&
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose);

  

export function configureStore() {
  const middlewares = [thunk];
  const initialState = {
    
    user: {},// store user info if he is loging
    
    movies: []// store list of movies for loging user
  };
  const store = createStore(
    createReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );
  return store;
}

export default configureStore;