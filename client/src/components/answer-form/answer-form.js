import React from 'react';
import { connect } from 'react-redux';
import {makeGuess} from '../../actions';

export class AnswerForm extends React.Component {
  // constructor (props) {
  //   super(props);
  //   // this.onSubmit = this.onSubmit.bind(this);
  // }
  submitGuess (e) {
    e.preventDefault();
    const value = this.input.value;
    this.props.dispatch(makeGuess(value));
    console.log('!!!!!!!!!!!', this.props.questions);
    if(value === this.props.questions[0].answer) {
      alert('Correct!');
    } else {
      alert('Sorry, try again later!');
    }
    this.form.reset();
  }

  render () {

    return (
      <form onSubmit={e => this.submitGuess(e)}>
        <input type="text" name="userGuess" id="userGuess" autoComplete="off"
            className="text" placeholder="The meaning is..." required
            ref={input => this.input = input} />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  guesses: state.guesses,
  questions: state.questions
});

export default connect(mapStateToProps)(AnswerForm);
