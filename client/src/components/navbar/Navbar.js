import React, { Component } from 'react';
import { connect } from 'react-redux';
import { score, questionNumber } from '../../actions';

export class Navbar extends Component {

    // const questionNumber = this.props.dispatch.questionNumber();

  render () {
    // const score = props.score;
    return (
      <nav className={'navbar navbar-inverse'} >
        <div className={'container'}>
          <div className={'navbar-header'} />
        </div>
        <form className={'navbar-form navbar-left'}>
          <div className={'form-group'}>
            <h3><span className={'label label-primary'}>{this.props.questionNumber}</span></h3>
          </div>
          <div className={'form-group'}>
            <h3><span className={'label label-success'}>{this.props.score}</span></h3>
          </div>
        </form>
        <form className={'navbar-form navbar-right'}>
          <div className={'form-group'}>
            <a href={'/api/auth/logout'}><h3><span className={'label label-danger'}>{'logout'}</span></h3></a>
          </div>
          </form>
          <p>This is the score: {this.props.score}</p>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.score,
  questionNumber: state.questionNumber
});

export default connect(mapStateToProps)(Navbar);
