import React from 'react';
// import * as Cookies from 'js-cookie';
import { connect } from 'react-redux';
// import AnswerForm from '../answer-form/answer-form';
import Navbar from '../navbar/Navbar';
import { fetchQuestion, fetchQuestionIndex, makeGuess, incrementScore } from '../../actions';

export class QuestionPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      queue: [],
      index: 0
    };
  }

  componentWillMount () {
    this.props.dispatch(fetchQuestion());
  }

  componentWillReceiveProps(nextProps) {
    console.log('NEXTPROPS', nextProps);
      if (nextProps.questions.length) {
        nextProps.questions.forEach((question, index) => {
          this.state.queue.push(index, question);
        });
        console.log('IN WILLRECEIVEPROPS', this.state.queue);
        return this.state.queue;
      }
    }

    submitGuess (e) {
      e.preventDefault();
      let status = 'Submit';
      const questionsQueue = this.props.questions;
      const correctQueue = [];
      const value = this.input.value;
      // this.form.reset();
      this.props.dispatch(makeGuess(value));
      this.input.value = '';
      const question = this.props.questions[0];
      console.log('VALUE', value);
      console.log('QUESTION.ANSWER', question.answer);
      if (value === question.answer) {
        //increment score
        this.props.dispatch(incrementScore());
        //dequeue
        const currentQuestion = questionsQueue.shift();
        console.log('**********', questionsQueue);
        console.log('__________', correctQueue);
        correctQueue.push(currentQuestion);
        // this.props.dispatch(dequeue());
        //requeue
        // this.props.dispatch(requeue());
        this.props.dispatch(fetchQuestionIndex);
        alert('Correct!');
      } else {
        //dequeue
        //enqueue same question
        const currentQuestion = questionsQueue.shift();
        questionsQueue.push(currentQuestion);
        alert('Sorry, try again later!');
      }
      status = 'Next';
      this.state.index++;
    }

  render () {
    const questions = this.props.questions.map((val, index) => {

      // return this.props.dispatch(fillUpQueue(val.question));
      return (<li key={index}>{val.question}</li>);
    });
    let status = 'Submit';
    console.log('THIS IS THE STATE QUEUE', this.state.queue);
    return (
          <div>
        {/*<button onClick={this.bind.populateQuestions(this)} />*/}
            <Navbar />
            <ul className="question-list">
              {/*<li>{this.props.questions[0].question}</li>*/}
              {questions[this.state.index]}
          {/* {this.props.questions[fetchQuestionIndex()].question} */}
          {/* {this.state.queue[this.props.questionIndex].question} */}
            </ul>
            <form onSubmit={e => this.submitGuess(e)}>
              <input type="text" name="userGuess" id="userGuess" autoComplete="off"
                  className="text" placeholder="The meaning is..." required
                  ref={input => this.input = input} />
              <button type="submit" >{status}</button>
            </form>
          </div>
    );
  }
}

const mapStateToProps = (state) => ({
  guesses: state.guesses,
  questions: state.questions,
  score: state.score,
  queueA: state.queueA,
  queueB: state.queueB,
  questionIndex: state.questionIndex
});

export default connect(mapStateToProps)(QuestionPage);
