// import React from 'react';
// import { connect } from 'react-redux';
// import { makeGuess, incrementScore, dequeue, requeue, fetchIndex } from '../../actions';
// import Queue from './algorithm';
// export class AnswerForm extends React.Component {
//   // constructor (props) {
//   //   super(props);
//   //   // this.onSubmit = this.onSubmit.bind(this);
//   // }
//   //if questions.length === 0
//   //runQueue
//   submitGuess (e) {
//     e.preventDefault();
//     let status = 'Submit';
//     const questionsQueue = this.props.questions;
//     const correctQueue = [];
//     const value = this.input.value;
//     // this.form.reset();
//     this.props.dispatch(makeGuess(value));
//     this.input.value = '';
//     const question = this.props.questions[0];
//     if (value === question.answer) {
//       //increment score
//       this.props.dispatch(incrementScore());
//       //dequeue
//       const currentQuestion = questionsQueue.shift();
//       console.log('**********', questionsQueue);
//       console.log('__________', correctQueue);
//       correctQueue.push(currentQuestion);
//       // this.props.dispatch(dequeue());
//       //requeue
//       // this.props.dispatch(requeue());
//       this.props.dispatch(fetchIndex);
//       alert('Correct!');
//     } else {
//       //dequeue
//       //enqueue same question
//       const currentQuestion = questionsQueue.shift();
//       questionsQueue.push(currentQuestion);
//       alert('Sorry, try again later!');
//     }
//     status = 'Next';
//   }
//
//   render () {
//     let status = 'Submit';
//     return (
//       <form onSubmit={e => this.submitGuess(e)}>
//         <input type="text" name="userGuess" id="userGuess" autoComplete="off"
//             className="text" placeholder="The meaning is..." required
//             ref={input => this.input = input} />
//         <button type="submit" >{status}</button>
//       </form>
//     );
//   }
// }
//
// const mapStateToProps = (state) => ({
//   guesses: state.guesses,
//   questions: state.questions,
//   score: state.score,
//   queueA: state.queueA,
//   queueB: state.queueB,
//   questionIndex: state.questionIndex
// });
//
// export default connect(mapStateToProps)(AnswerForm);
