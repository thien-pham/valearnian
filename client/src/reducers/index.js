import {
  FETCH_QUESTION_REQUEST,
  FETCH_QUESTION_SUCCESS,
  FETCH_QUESTION_FAILURE,
  CREATE_USER
} from '../actions';

const initialState = {
  questions: [],
  currentUser: null,
  loading: false,
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

export default reducer;
