import React from 'react';
import * as Cookies from 'js-cookie';
import { connect } from 'react-redux';
import QuestionPage from './question-page/question-page';
import LoginPage from './login-page/Login-page';
import { createUser } from '../actions';


class App extends React.Component {

  componentDidMount () {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      fetch('/api/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
        .then(res => {
          if (!res.ok) {
            if (res.status === 401) {
              Cookies.remove('accessToken');
              return;
            }
            throw new Error(res.statusText);
          }
          return res.json();
        })
        .then(currentUser =>
          this.props.dispatch(createUser(currentUser))
        );
    }
  }

  render () {
    if (!this.props.currentUser) {
      return <LoginPage />;
    }
    return <QuestionPage />;
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser
});

export default connect(mapStateToProps)(App);
