import React, { Component } from 'react';
import { connect } from 'react-redux';
// import UserInfo from '../user-info/user-info'
import './navbar.css';
// import { score, questionNumber } from '../../actions';

export class Navbar extends Component {

    // const questionNumber = this.props.dispatch.questionNumber();

  render () {
    // const score = props.score;
    let points = '';
    if (this.props.score === 1) {
      points = 'pt';
    } else if (this.props.score > 1) {
      points = 'pts';
    }
    return (
      <nav className={'navbar navbar-inverse'} >
        <div className={'container-fluid'}>
          <div className={'navbar-header'} >
        </div>
        <ul className={'nav navbar-nav'} >
          <li className={'label label-primary'}>Question # {this.props.questionCount}</li>
          <li className={'label label-primary score'}>Score: {this.props.score}</li>
        </ul>
        <ul className={'nav navbar-nav navbar-right'}>
          <li className={'label label-primary'}><a href={'/api/auth/logout'}>{'logout'}</a></li>
        </ul>
      </div>
      </nav> 
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.score,
  questionCount: state.questionCount
});

export default connect(mapStateToProps)(Navbar);




{/* <nav className='navbar' >
  <ul>
    <li className='question-no'>Question # {this.props.questionCount}</li>
    <li className='score'>Score: {this.props.score}</li>
    <li className='logout'><a href={'/api/auth/logout'}>Logout</a></li>
  </ul>
</nav> */}
