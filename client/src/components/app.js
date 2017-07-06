import React from 'react';
import * as Cookies from 'js-cookie';
import { connect } from 'react-redux';
import QuestionPage from './question-page/question-page';
import LoginPage from './login-page/Login-page';
import { createUser } from '../actions';


class App extends React.Component {
  // constructor (props) {
  //   super(props);
  //   this.state = {
  //     currentUser: null
  //   };
  // }

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
<<<<<<< HEAD
          this.setState({
            currentUser
          })
=======
          this.props.dispatch(createUser(currentUser))
>>>>>>> 6e966660be0cf1409fde9afc8243ce1cf33fb343
        );
    }
  }

  render () {
    if (!this.props.currentUser) {
      return <LoginPage />;
    }
<<<<<<< HEAD
    return <QuestionPage />;
=======
    return (<div>
    <QuestionPage />
    </div>);
>>>>>>> 6e966660be0cf1409fde9afc8243ce1cf33fb343
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser
});

export default connect(mapStateToProps)(App);
