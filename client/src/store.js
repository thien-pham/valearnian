import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducers/index';

// const middlewares = [logger(), thunk];
// export default createStore(
//   reducer,
//   undefined
//   composeWithDevTools(
//     applyMiddleware(...middlewares)
//     // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );

const middlewares = composeWithDevTools(
  applyMiddleware(
    thunk,
    createLogger()
  )
);

export default createStore(reducer, middlewares);
