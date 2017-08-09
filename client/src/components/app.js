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
    const accessToken = Cookies.get('accessToken');
      if(accessToken) {
        this.props.dispatch(fetchUser());
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
