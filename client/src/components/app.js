import React from 'react';
import * as Cookies from 'js-cookie';
import { connect } from 'react-redux';
import QuestionPage from './question-page/question-page';
import Login from './login-page/Login';
import { fetchUser } from '../actions';

class App extends React.Component {
  constructor() {
    super();
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount () {
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
    const accessToken = Cookies.get('accessToken');
        console.log(accessToken)
        if(accessToken) {
          this.props.dispatch(fetchUser(accessToken));
        }
  }

  render () {
    if (!this.props.currentUser) {
      return <Login />;
    }
    return <QuestionPage />;
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser
});

export default connect(mapStateToProps)(App);
