import React from 'react';
import { connect } from 'react-redux';
import Navbar from '../navbar/Navbar';
import { fetchQuestion, fillUpQueue, makeGuess, incrementScore, incrementQuestion } from '../../actions';
import './question-page.css';
import Modal from '../modal/modal';

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

  componentWillReceiveProps (nextProps) {
    // let answer = 'Correct!';
    if (!nextProps.questions.length) {
      this.props.queueA.forEach(item => {
        this.props.questions.push(item);
      });
      return this.props.questions;
    }
  }

  submitGuess (e) {
    e.preventDefault();
    const correctQueue = [];
    const value = this.input.value;
    this.props.dispatch(makeGuess(value));
    this.input.value = '';

    let question = this.props.questions[0];

    this.setState({ index: this.state.index + 1 });
    if (this.props.questions.length === 0) {
      this.props.dispatch(fillUpQueue(correctQueue));
    }
    if (value.toLowerCase() === question.answer.toLowerCase()) {
      this.props.dispatch(incrementScore());
      this.props.dispatch(incrementQuestion());
      const correctlyAnswered = this.props.questions.shift();
      correctQueue.push(correctlyAnswered);
      this.props.queueA.push(correctlyAnswered);
      // alert('Correct!');
    } else {
      this.message = 'Sorry, try again later!';
      this.props.dispatch(incrementQuestion());
      const wrongQuestion = this.props.questions.shift();
      this.props.questions.push(wrongQuestion);
      // alert('Sorry, try again later!');
    }
  }
  render () {
    let questions = this.props.questions.map((val, index) => {
      return (<li key={index}>{val.question}</li>);
    });
    let message = 'Correct!';
    return (
          <div className={'center col-md-12'}>
            <Navbar className={'col-md-12'}/>
            <div className = "card" >
              <img className = "image" src={require('./dragons.jpg')} width = '150'/>
                <div className="container2">
                  <h1 className={'question'}>{questions[0]}</h1>
                </div>
              </div>
            <form className = 'userInput' onSubmit={e => this.submitGuess(e)}>
              <div className={'row'}><input type="text" name="userGuess" id="userGuess" autoComplete="off"
                  className={'text col-md-offset-2 col-md-8'} placeholder="The meaning is..." required
                  ref={input => this.input = input} /></div>
              <Modal className={'col-md-4'} status={message} answer={'answer'}/>
              {/*<button type="submit" >{status}</button>*/}
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
  questionIndex: state.questionIndex,
  questionCount: state.questionCount
});

export default connect(mapStateToProps)(QuestionPage);

// import React from 'react';
// // import * as Cookies from 'js-cookie';
// import { connect } from 'react-redux';
// // import AnswerForm from '../answer-form/answer-form';
// import Navbar from '../navbar/Navbar';
// import QuestionsQueue from './questions-queue';
// import { fetchQuestion, fetchQuestionIndex, makeGuess, incrementScore } from '../../actions';
// import './question-page.css'
//
// export class QuestionPage extends React.Component {
//   constructor (props) {
//     super(props);
//     this.state = {
//       queue: [],
//       index: 0,
//       questionsQueue: [],
//       qIndex: 0,
//       flag: false,
//       flag2: false,
//       qCurrentQuestion: ''
//     };
//   }
//
//   componentWillMount () {
//     this.props.dispatch(fetchQuestion());
//   }
//
//   componentWillReceiveProps(nextProps) {
//     console.log('NEXTPROPS', nextProps);
//       if (nextProps.questions.length) {
//         nextProps.questions.forEach((question, index) => {
//           this.state.queue.push(index, question);
//         });
//         // console.log('IN WILLRECEIVEPROPS', this.state.queue);
//         return this.state.queue;
//       }
//     }
// //create a function
// updateQuestionQIndex(){
//   this.setState({})
// }
//     submitGuess (e) {
//       e.preventDefault();
//       let status = 'Submit';
//       const value = this.input.value;
//
//       this.props.dispatch(makeGuess(value));
//       this.input.value = '';
//
//       const questionsQueue = [];
//       for (let i=0; i < this.props.questions.length; i++) {
//         questionsQueue.push(this.props.questions[i]);
//       }
//       const correctQueue = [];
//
//       this.props.dispatch(fetchQuestionIndex());
//       const question = this.props.questions[this.props.questionIndex];
//       // console.log('APPSTATE QINDEX', this.props.questionIndex);
//       // console.log('VALUE', value);
//       // console.log('QUESTION.ANSWER', question.answer);
//       this.setState({index:this.state.index + 1});
//       // console.log('INDEX', this.state.index);
//
//       if (this.props.questions.length - 1 === this.props.questionIndex) {
//         console.log('HERE');
//         this.setState({flag: true})
//         this.setState({qCurrentQuestion: this.state.questionsQueue[this.state.qIndex].question})
//         console.log(this.state.questionsQueue[this.state.qIndex])
//         this.setState({qIndex: this.state.qIndex+1});
//       }
//
//       if (value === question.answer) {
//         //increment score
//         this.props.dispatch(incrementScore());
//         //dequeue
//         const currentQuestion = questionsQueue.shift();
//         console.log('**********', questionsQueue);
//         console.log('__________', correctQueue);
//         correctQueue.push(currentQuestion);
//         // this.props.dispatch(dequeue());
//         //requeue
//         // this.props.dispatch(requeue());
//
//         alert('Correct!');
//       } else {
//         //dequeue
//         //enqueue same question
//         const currentQuestion = questionsQueue.shift();
//         questionsQueue.push(currentQuestion);
//         console.log('WRONG ANSWER NEW QUEUE', questionsQueue)
//         alert('Sorry, try again later!');
//       }
//       status = 'Next';
//       this.setState({questionsQueue})
//       console.log('QUESTIONSQUEUE', this.state.questionsQueue)
//     }
// //STARTING WITH QUESTIONS QUEUE WHICH IS COPY OF QUESTIONS ARRAY IN APPSTATE
// //IF IT'S RIGHT, WE MOVE QUESTION TO CORRECTQUEUE
// //IF IT'S WRONG, WE MOVE QUESTION TO BACK OF QUESTIONSQUEUE
// //WHEN WE GO THROUGH LENGTH OF QUESTIONS ARRAY IN APPSTATE, THEN WE START QUESTIONSQUEUE
// //WHEN QUESTIONSQUEUE IS DONE, WE GO TO CORRECTQUEUE
//   render () {
//     const questions = this.props.questions.map((val, index) => {
//
//       // return this.props.dispatch(fillUpQueue(val.question));
//       return (<li key={index}>{val.question}</li>);
//     });
//     let status = 'Submit';
//     console.log('THIS IS THE STATE QUEUE', this.state.queue);
//     return (
//           <div>
//         {/*<button onClick={this.bind.populateQuestions(this)} />*/}
//             <Navbar />
//             <ul className="question-list">
//               {/*<li>{this.props.questions[0].question}</li>*/}
//
//               <div className = "card" >
//                 <img className = "image" src={require('./dragons.jpg')} width = '150'/>
//
//                 <div className="container2">
//                 {
//                 (this.state.flag)
//                 ? this.state.qCurrentQuestion
//                  :  questions[this.state.index]
//                 }
//               </div>
//             </div>
//           {/* {this.props.questions[fetchQuestionIndex()].question} */}
//           {/* {this.state.queue[this.props.questionIndex].question} */}
//             </ul>
//             <form className = 'userInput' onSubmit={e => this.submitGuess(e)}>
//               <input type="text" name="userGuess" id="userGuess" autoComplete="off"
//                   className="text" placeholder="The meaning is..." required
//                   ref={input => this.input = input} />
//               <button className="submit" type="submit" >{status}</button>
//             </form>
//           </div>
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
// export default connect(mapStateToProps)(QuestionPage);
