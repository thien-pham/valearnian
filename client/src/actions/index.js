export const FETCH_QUESTION_REQUEST = 'FETCH_QUESTION_REQUEST';
export const fetchQuestionRequest = () => ({
  type: FETCH_QUESTION_REQUEST });

export const FETCH_QUESTION_SUCCESS = 'FETCH_QUESTION_SUCCESS';
export const fetchQuestionSuccess = (questions) => ({
  type: FETCH_QUESTION_SUCCESS, questions });

export const FETCH_QUESTION_FAILURE = 'FETCH_QUESTION_FAILURE';
export const fetchQuestionFailure = () => ({
  type: FETCH_QUESTION_FAILURE });

export const CREATE_USER = 'CREATE_USER';
export const createUser = (currentUser) => ({
  type: CREATE_USER, currentUser });

import * as Cookies from 'js-cookie';
// export const fetchQuestion = (userId, accessToken) => {
//   return dispatch => {
//     return fetch('/questions/' + userId + '?access_token=' + accessToken)
//       .then(res => {
//         return res.json();
//       }).then(response => {
//         return dispatch(fetchQuestionSuccess(response));
//       }).catch(err => {
//         return dispatch(fetchQuestionFailure(err));
//       });
//   };
// };

export const fetchQuestion = () => dispatch => {
  dispatch(fetchQuestionRequest());
  const accessToken = Cookies.get('accessToken');
  return fetch('/api/questions', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
      .then(data => {
        if (!data.ok) {
          return dispatch(fetchQuestionFailure());
        }
        return data.json();
      }).then(response => {
        return dispatch(fetchQuestionSuccess(response));
      });

};
