import React from 'react';
// import * as Cookies from 'js-cookie';
import { connect } from 'react-redux';
import AnswerForm from '../answer-form/answer-form';
import Navbar from '../navbar/Navbar';
import { fetchQuestion, fillUpQueue } from '../../actions';
export class QuestionPage extends React.Component {
  // constructor (props) {
  //   super(props);
  //   // this.state = {
  //   //   questions: []
  //   // };
  //   // this.showQuestions = this.showQuestions.bind(this);
  // }

  componentWillMount () {
    this.props.dispatch(fetchQuestion());
  }

  // showQuestions () {
  //   return this.props.questions.map((val, ind) => {
  //     return (
  //       <li key={ind}>{val.question}</li>
  //     );
  //   });
  // }

  // lister () {
  //   return this.props.questions.map((val, i) => {
  //     return <li key={i}>{val.question}</li>;
  //   });
  // }
  populateQuestions (e) {
    e.preventDefault();
    this.props.dispatch(fillUpQueue());
    return;
  }

  render () {
    const questions = this.props.questions.map((val, index) => {
      this.props.dispatch(fillUpQueue(val.question));
      return (<li key={index}>{val.question}</li>);
    }
        );

    return (
          <div>
         {/*<button onClick={this.bind.populateQuestions(this)} />*/}
            <Navbar />
            <ul className="question-list">
              {/*<li>{this.props.questions[0].question}</li>*/}
              {questions[0]}
            </ul>
            <AnswerForm />
          </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions,
  queueA: state.queueA,
  queueB: state.queueB
});

export default connect(mapStateToProps)(QuestionPage);
