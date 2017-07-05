import React, { Component } from 'react';
import * as Cookies from 'js-cookie';
import { connect } from 'react-redux';
import AnswerForm from '../answer-form/answer-form';

class QuestionPage extends Component {
  // constructor (props) {
  //   super(props);
  // }
  componentDidMount () {
    const accessToken = Cookies.get('accessToken');
    fetch('/api/questions', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(res => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    }).then(questions =>
            this.setState({
              questions
            })
        );
  }

  showQuestions () {
    return this.props.questions.map((item) => {
      return (<li key={item.question}>{item.question}</li>);
    });
  }
  render () {
    return (
      <div>
        <ul className="question-list">
          {this.showQuestions}
        </ul>
        <AnswerForm />
        <a href={'/api/auth/logout'}>Log Out</a>
        </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    questions: state.questions
  };
}

export default connect(mapStateToProps)(QuestionPage);
