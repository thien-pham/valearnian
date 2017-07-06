<<<<<<< HEAD
// import {CREATE_USER} from './actions';
import {
  FETCH_QUESTION_REQUEST,
  FETCH_QUESTION_SUCCESS,
  FETCH_QUESTION_FAILURE
=======
import {
  FETCH_QUESTION_REQUEST,
  FETCH_QUESTION_SUCCESS,
  FETCH_QUESTION_FAILURE,
  CREATE_USER
>>>>>>> 6e966660be0cf1409fde9afc8243ce1cf33fb343
} from '../actions';

const initialState = {
  questions: [],
  currentUser: null,
  loading: false,
<<<<<<< HEAD
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
=======
  error: null,
  guesses: '',
  score: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_QUESTION_REQUEST:
    return {
      ...state,
      loading: true
    };
  case FETCH_QUESTION_FAILURE:
    return Object.assign({}, state, {
      loading: false,
      error: true
    });
  case FETCH_QUESTION_SUCCESS:
    return Object.assign({}, state, {
      loading: false,
      error: null,
      questions: action.questions
    });
  case CREATE_USER:
    return {
      ...state,
      currentUser: action.currentUser
    };
  default:
    return state;
  }
};
>>>>>>> 6e966660be0cf1409fde9afc8243ce1cf33fb343

export default reducer;
