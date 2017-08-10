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

      <nav className={'navbar navbar-default'}>
        <div className={'container-fluid heading'}>
      <div className={'navbar-header'}>
        <h2>VALEARNIAN</h2>
      </div>
        <ul className={'nav navbar-nav'}>
          <li className={'question'}><span className='glyphicon glyphicon-question-sign'> {this.props.questionCount}</span></li>
          <li className={'score'}><span className='glyphicon glyphicon-dashboard'> {this.props.score} {points}</span></li>
        </ul>
        <ul className={'nav navbar-nav navbar-right'}>
          <li className='logout'><a href={'/api/auth/logout'}><span className='glyphicon glyphicon-log-out'> {'Logout'}</span></a></li>
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





{/* <nav className={'navbar navbar-inverse'} >
  <div className={'container-fluid'}>
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
</nav> */}
