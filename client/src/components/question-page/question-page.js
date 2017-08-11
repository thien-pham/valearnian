import React from 'react';
import * as Cookies from 'js-cookie';
import { connect } from 'react-redux';
// import AnswerForm from '../answer-form/answer-form';
import Navbar from '../navbar/Navbar';
import LinkedList from '../linkedList';
// import QuestionsQueue from './questions-queue';
import { fetchQuestion, fetchQuestionIndex, makeGuess, incrementScore, newGame, incrementQuestion } from '../../actions';
import './question-page.css'
import Modal from '../modal/modal';

export class QuestionPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      linkedlist: new LinkedList();
      index: 0,
      name: null,
      message: ''
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchQuestion());
  }

  componentWillReceiveProps(nextProps) {
    console.log('NEXTPROPS', nextProps);
      if (nextProps.questions.length && this.state.ll.length === 0) {
        nextProps.questions.forEach((question, index) => {
          this.state.ll.insert(index, question);
        });
        return this.state.ll;
      }
    }

    submitGuess (e) {
      e.preventDefault();
      let ll = this.state.linkedlist;
      let currentQuestion = linkedlist.get(0).question;
      const value = this.input.value;
      this.input.value = '';

      if (value.toLowerCase() === ll.get(this.state.index).answer.toLowerCase()) {
        ll.insert(ll.length, ll.get(this.state.index));
        //increment score
        this.props.dispatch(incrementScore());
      } else {
        ll.insert(this.state.index + 3, ll.get(this.state.index));
      }
      this.props.dispatch(incrementQuestion());
      this.setState({index:this.state.index + 1});
      this.props.dispatch(nextQuestion(this.state.index + 1))
    }

  render () {
    if(this.props.questions.length <= 0) {
      return <div />
    }

    const questions = this.props.questions.map((val, index) => {
      return (<li key={index}>{val.question}</li>);
    });

    return (
          <div>
            <Navbar />
            <ul className="question-list">
              <div className="card" >
                <img className="image" src={require('./dragons.jpg')} width='150' role="presentation"/>
                <div className="container2">
                  {this.state.ll.get(this.props.currentQuestion).question}
                </div>
              </div>
            </ul>
            <form className='userInput' onSubmit={e => this.submitGuess(e)}>
              <input type="text" name="userGuess" id="userGuess" autoComplete="off"
                  className="text" placeholder="The meaning is..." required
                  ref={input => this.input = input} />
                  <Modal className={'col-md-4'} status={this.state.message} />
            </form>}
          </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions,
  score: state.score,
  currentQuestion: state.currentQuestion,
  questionIndex: state.questionIndex
});

export default connect(mapStateToProps)(QuestionPage);
