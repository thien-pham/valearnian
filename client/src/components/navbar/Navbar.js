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
          {/* <div className={'navbar-header'} >
        </div> */}
        <form className={'navbar-form navbar-left question'}>
          <div className={'form-group'}>
            <h3><span className={'label label-default'}>Question # {this.props.questionCount}</span></h3>
          </div>

          <div className={'form-group'}>
            <h3><span className={'label label-default score'}>Score: {this.props.score} {points}</span></h3>
          </div>
        </form>
        <form className={'navbar-form navbar-right logout'}>
          <div className={'form-group'}>
            <a href={'/api/auth/logout'}><h3><span className={'label label-default'}>{'logout'}</span></h3></a>
          </div>
          </form>
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
