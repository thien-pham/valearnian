import React from 'react';
import { connect } from 'react-redux';
import { makeGuess, incrementScore, dequeue, requeue } from '../../actions';

export class AnswerForm extends React.Component {
  // constructor (props) {
  //   super(props);
  //   // this.onSubmit = this.onSubmit.bind(this);
  // }

  //if questions.length === 0
  //runQueue

  submitGuess (e) {
    e.preventDefault();
    const value = this.input.value;
    this.props.dispatch(makeGuess(value));
    if (value === this.props.questions[0].answer) {
      //increment score
      this.props.dispatch(incrementScore());
      //dequeue
      // this.props.dispatch(dequeue());
      //requeue
      this.props.dispatch(requeue());
      alert('Correct!');
    } else {
      //enqueue
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
  questions: state.questions,
  score: state.score,
  queueA: state.queueA,
  queueB: state.queueB
});

export default connect(mapStateToProps)(AnswerForm);
