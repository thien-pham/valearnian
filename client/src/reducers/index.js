import {
  FETCH_QUESTION_REQUEST,
  FETCH_QUESTION_SUCCESS,
  FETCH_QUESTION_FAILURE,

  FETCH_SCORE,
  FETCH_QUESTION_NUMBER,
 

  CREATE_USER,
  MAKE_GUESS

} from '../actions';

const initialState = {
  questions: [],
  currentUser: null,
  loading: false,
  error: null,



  questionNumber: 1,

  guesses: [],
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
  // case FETCH_QUESTION_SUCCESS:
  //   let q = [];
  //   let a = [];
  //   for (let i=0; i<action.questions.length; i++) {
  //     q.push(action.questions[i].question);
  //     a.push(action.questions[i].answer);
  //   }
  //   return Object.assign({}, state, {
  //     loading: false,
  //     error: null,
  //     questions: q,
  //     answers: a
  //   });
  case CREATE_USER:
    return {
      ...state,
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

  case MAKE_GUESS:
    return {
      ...state,
      guesses: state.guesses.concat(action.guess)
    };
  default:
    return state;
  }
};

export default reducer;
