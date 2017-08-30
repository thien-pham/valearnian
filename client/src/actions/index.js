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

export const NEXT_QUESTION = 'NEXT_QUESTION';
export const nextQuestion = (count) => ({
  type: NEXT_QUESTION,
  count
});

export const INCREMENT_SCORE = 'INCREMENT_SCORE';
export const incrementScore = () => ({
  type: INCREMENT_SCORE });

export const INCREMENT_QUESTION = 'INCREMENT_QUESTION';
export const incrementQuestion = () => ({
  type: INCREMENT_QUESTION });

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
