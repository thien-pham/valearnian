import {
  FETCH_QUESTION_REQUEST,
  FETCH_QUESTION_SUCCESS,
  FETCH_QUESTION_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  //FETCH_SCORE,
  FETCH_QUESTION_INDEX,
  INCREMENT_SCORE,
  INCREMENT_QUESTION,
  NEXT_QUESTION
} from '../actions';
// import Queue from './algorithm';

const initialState = {
  questions: [],
  currentUser: null,
  loading: false,
  error: null,
  currentQuestion: 0,
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
    return {
      ...state,
      loading: false,
      error: true
    };
  case FETCH_QUESTION_SUCCESS:
  console.log(action.questions);
    return {
      ...state,
      loading: false,
      error: null,
      questions: action.questions
    };
  case FETCH_USER_REQUEST:
    return {
      ...state,
      loading: true,
      error: null
    };
  case FETCH_USER_FAILURE:
    return {
      ...state,
      loading: false,
      error: true
    };
  case FETCH_USER_SUCCESS:
    return {
      ...state,
      loading: false,
      error: null,
      currentUser: action.currentUser
    };
//   case FETCH_SCORE:
//     return {
//       ...state,
//       currentScore: action.currentScore
//     };
//   case FETCH_QUESTION_NUMBER:
//     return {
//       ...state,
//       questionNumber: action.questionNumber

  case INCREMENT_SCORE:
    return {
      ...state,
      score: state.score + 1
    };
  case INCREMENT_QUESTION:
    return {
      ...state,
      questionCount: state.questionCount + 1
    };
  case FETCH_QUESTION_INDEX:
    return {
      ...state,
      questionIndex: state.questionIndex + 1
    };
  case NEXT_QUESTION:
    return {
      ...state,
      currentQuestion: action.questionCount
    }
  default:
    return state;
  }
};

export default reducer;
