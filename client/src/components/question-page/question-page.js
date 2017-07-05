import React from 'react';
import * as Cookies from 'js-cookie';
import { connect } from 'react-redux';
import AnswerForm from '../answer-form/answer-form';
import { fetchQuestion } from '../../actions';
export class QuestionPage extends React.Component {
  constructor (props) {
    super(props);
    // this.state = {
    //   questions: []
    // };
    // this.showQuestions = this.showQuestions.bind(this);
  }

  componentWillMount () {
    this.props.dispatch(fetchQuestion());
    // const accessToken = Cookies.get('accessToken');
    // fetch('/api/questions', {
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`
    //   }
    // }).then(res => {
    //   if (!res.ok) {
    //     throw new Error(res.statusText);
    //   }
    //   return res.json();
    // }).then(question =>
    //   this.props.dispatch(fetchQuestion(question))
    //   );
  }

  // showQuestions () {
  //   return this.props.questions.map((val, ind) => {
  //     return (
  //       <li key={ind}>{val.question}</li>
  //     );
  //   });
  // }


  render () {
    let { questions } = this.props;
    console.log('RS', questions);
    // const questions = this.props.questions.map((question, index) => {
    //   return (<li key={index}>{question}</li>);
    // }
    //     );


    return (
          <div>

            <ul className="question-list">
              <li>{this.props.questions[0].question}</li>
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
