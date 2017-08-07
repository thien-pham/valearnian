import React from 'react';

export default class QuestionsQueue extends React.Component {
constructor(props) {
  super(props);
  this.state = {

  }
}

render () {
  // const question = this.props.questions ? this.props.questions.map((ele, i) => {
  //   return <li key={i}>{ele.question} </li>}) : ''
  const question = this.props.questions ? this.props.questions.filter((ele, i) => {
    if (i === this.props.qIndex) {
      return <li key={i}>{ele.question} </li>
    }
     }) : ''

  return (
    <div>
      {question}
    </div>
    )
}
}
