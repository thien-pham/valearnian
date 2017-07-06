import React from 'react';
// import * as Cookies from 'js-cookie';
import { connect } from 'react-redux';
import AnswerForm from '../answer-form/answer-form';
import Navbar from '../navbar/Navbar';
import { fetchQuestion } from '../../actions';
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


  render () {
    console.log(this.props.questions);
    const questions = this.props.questions.map((val, index) => {
      return (<li key={index}>{val.question}</li>);
    }
        );


    return (
          <div>
            <Navbar />
            <ul className="question-list">
              {/*<li>{this.props.questions[0].question}</li>*/}
              {questions[0]}
            </ul>
            <AnswerForm />
            <a href={'/api/auth/logout'}>Log Out</a>
          </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions
});

export default connect(mapStateToProps)(QuestionPage);
