<<<<<<< HEAD
import React, { Component } from 'react';
import * as Cookies from 'js-cookie';
=======
import React from 'react';
// import * as Cookies from 'js-cookie';
>>>>>>> 6e966660be0cf1409fde9afc8243ce1cf33fb343
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

<<<<<<< HEAD
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

=======
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

  lister () {
    return this.props.questions.map((val, i) => {
      return <li key={i}>{val.question}</li>;
    });
  }


  render () {
    console.log(this.props.questions);
    // const questions = this.props.questions.map((question, index) => {
    //   return (<li key={index}>{question}</li>);
    // }
    //     );


    return (
          <div>
            <Navbar />
            <ul className="question-list">
              {/*<li>{this.props.questions[0].question}</li>*/}
              {this.lister()}
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

>>>>>>> 6e966660be0cf1409fde9afc8243ce1cf33fb343
export default connect(mapStateToProps)(QuestionPage);
