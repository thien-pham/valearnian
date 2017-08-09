import * as Cookies from 'js-cookie';

export const FETCH_QUESTION_REQUEST = 'FETCH_QUESTION_REQUEST';
export const fetchQuestionRequest = () => ({
  type: FETCH_QUESTION_REQUEST });

export const FETCH_QUESTION_SUCCESS = 'FETCH_QUESTION_SUCCESS';
export const fetchQuestionSuccess = (questions) => ({
  type: FETCH_QUESTION_SUCCESS, questions });

export const FETCH_QUESTION_FAILURE = 'FETCH_QUESTION_FAILURE';
export const fetchQuestionFailure = () => ({
  type: FETCH_QUESTION_FAILURE });

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const fetchUserRequest = () => ({
  type: FETCH_USER_REQUEST });

export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const fetchUserSuccess = currentUser => ({
  type: FETCH_USER_SUCCESS,
  currentUser });

export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
export const fetchUserFailure = error => ({
  type: FETCH_USER_FAILURE,
  error });

export const FETCH_SCORE = 'FETCH_SCORE';
export const fetchScore = () => ({
  type: FETCH_SCORE });

export const FETCH_QUESTION_INDEX = 'FETCH_QUESTION_INDEX';
export const fetchQuestionIndex = () => ({
  type: FETCH_QUESTION_INDEX });

export const FETCH_QUESTION_NUMBER = 'FETCH_QUESTION_NUMBER';
export const fetchQuestionNumber = () => ({
  type: FETCH_QUESTION_NUMBER });

// export const CREATE_USER = 'CREATE_USER';
// export const createUser = (currentUser) => ({
//   type: CREATE_USER, currentUser });

export const MAKE_GUESS = 'MAKE_GUESS';
export const makeGuess = (guess) => ({
  type: MAKE_GUESS,
  guess });

export const INCREMENT_SCORE = 'INCREMENT_SCORE';
export const incrementScore = () => ({
  type: INCREMENT_SCORE });

export const INCREMENT_QUESTION = 'INCREMENT_QUESTION';
export const incrementQuestion = () => ({
  type: INCREMENT_QUESTION });

export const ENQUEUE = 'ENQUEUE';
export const enqueue = () => ({
  type: ENQUEUE });

export const DEQUEUE = 'DEQUEUE';
export const dequeue = () => ({
  type: DEQUEUE });

export const REQUEUE = 'REQUEUE';
export const requeue = () => ({
  type: REQUEUE });

export const FILL_UP_QUEUE = 'FILL_UP_QUEUE';
export const fillUpQueue = (array) => ({
  type: FILL_UP_QUEUE,
  array
});

export const score = () => dispatch => {
  dispatch(fetchScore);
};

export const questionNumber = () => dispatch => {
  dispatch(fetchQuestionNumber);
};

export const NEW_GAME = 'NEW_GAME';
export const newGame = () => ({
    type: NEW_GAME
});

// export const fetchQuestion = (accessToken) => dispatch => {
//   dispatch(fetchQuestionRequest());
//   const accessToken = Cookies.get('accessToken');
//   return fetch('/api/questions', {
//     headers: {
//       Authorization: `Bearer ${accessToken}`
//     }
//   })
//       .then(data => {
//         if (!data.ok) {
//           return dispatch(fetchQuestionFailure());
//         }
//         return data.json();
//       }).then(response => {
//         return dispatch(fetchQuestionSuccess(response));
//       });
// };
export const fetchQuestion = () => (dispatch) => {
  dispatch(fetchQuestionRequest());
  const accessToken = Cookies.get('accessToken');
  fetch('/api/questions', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  }).then(res => {
    if(!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  }).then(data => {
    dispatch(fetchQuestionSuccess(data));
  }).catch(error => {
    dispatch(fetchQuestionFailure(error));
  });
};

export const fetchUser = (accessToken) => (dispatch) => {
  dispatch(fetchUserRequest());
  fetch(`/api/me`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  }).then(res => {
    if(!res.ok) {
      if(res.status === 401) {
        Cookies.remove('accessToken');
        return;
      }
      throw new Error(res.statusText);
    }
    return res.json();
  }).then(currentUser => {
    console.log(currentUser);
    dispatch(fetchUserSuccess(currentUser));
  }).catch(error => {
    dispatch(fetchUserFailure(error));
  });
};

// const accessToken = Cookies.get('accessToken');
// if (accessToken) {
//   fetch('/api/me', {
//     headers: {
//       Authorization: `Bearer ${accessToken}`
//     }
//   })
//     .then(res => {
//       if (!res.ok) {
//         if (res.status === 401) {
//           Cookies.remove('accessToken');
//           return;
//         }
//         throw new Error(res.statusText);
//       }
//       return res.json();
//     })
//     .then(currentUser =>
//       this.props.dispatch(createUser(currentUser))
//     );
// }
