import React from 'react';
import { connect } from 'react-redux';

<<<<<<< HEAD
export default class AnswerForm extends React.Component {
=======
export class AnswerForm extends React.Component {
>>>>>>> 6e966660be0cf1409fde9afc8243ce1cf33fb343
  // constructor (props) {
  //   super(props);
  //   // this.onSubmit = this.onSubmit.bind(this);
  // }
  submitGuess (e) {
    e.preventDefault();
    // const value = this.input.value;
    // this.props.dispatch(makeGuess(value));
    this.form.reset();
  }

  render () {
    return (
      <form onSubmit={e => this.submitGuess(e)}>
                <input type="text" name="userGuess" id="userGuess"
                    className="text" placeholder="The meaning is..." required
                    // ref={input => this.input = input}
                    />
                <button type="submit">Submit</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  guesses: state.guesses
});

export default connect(mapStateToProps)(AnswerForm);
