export const FETCH_QUESTION_REQUEST = 'FETCH_QUESTION_REQUEST'
export const fetchQuestionRequest = () => ({type: FETCH_QUESTION_REQUEST})
export const FETCH_QUESTION_SUCCESS = 'FETCH_QUESTION_SUCCESS'
export const fetchQuestiontSuccess = (questions) => ({type: FETCH_QUESTION_SUCCESS, questions})
export const FETCH_QUESTION_FAILURE = 'FETCH_QUESTION_FAILURE'
export const fetchQuestionFailure = () => ({type: FETCH_QUESTION_FAILURE})


// export const CREATE_USER = 'CREATE_USER';
//
// export const createUser = (currentUser) => ({
//     type: CREATE_USER,
//     currentUser
// })

export const fetchQuestion = (currentUserId, accessToken) => {
  return dispatch => {
    return fetch('/questions/' + userId + '?access_token=' + accessToken)
      .then(res => {
        return res.json();
    }).then(response => {
        return dispatch(fetchQuestionSuccess(response));
    }).catch(err => {
        return dispatch(fetchQuestionError(err));
    });
  };
};
