import React, { Component } from 'react';
import { connect } from 'react-redux';
import './navbar.css';

export class Navbar extends Component {

  render () {
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
          <li className={'score'}><span className='glyphicon glyphicon-dashboard'> {this.props.score}{points}</span></li>
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
