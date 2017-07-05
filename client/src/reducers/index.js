// import {CREATE_USER} from './actions';
import {
  FETCH_QUESTION_REQUEST,
  FETCH_QUESTION_SUCCESS,
  FETCH_QUESTION_FAILURE
} from '../actions';

const initialState = {
  questions: [],
  currentUser: null,
  loading: false,
  error: null
}
//
// export default (state=initialState, action) => {
//     if(action.type === CREATE_USER) {
//         return {
//             ...state,
//             currentUser: action.currentUser
//         }
//     }
//     return state;
// }


// guesses
// correct
// wrong
// answers
// currentQuestion
// points
// loading

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUESTION_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_QUESTION_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: true
      })
    case FETCH_QUESTION_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: null,
        questions: action.questions
      })
    default:
        return state;
    }
  }

export default reducer;
