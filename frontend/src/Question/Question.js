import React, {Component} from 'react';
import axios from 'axios';
import SubmitAnswer from './SubmitAnswer';
import auth0Client from '../Auth';
// import _ from 'lodash';
import {} from '../Util'
import Util from "../Util";

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: null,
    };

    this.submitAnswer = this.submitAnswer.bind(this);
    this.removeAllAnswers = this.removeAllAnswers.bind(this);
  }

  async componentDidMount() {
    await this.refreshQuestion();
  }

  async refreshQuestion() {
    const {match: {params}} = this.props;

    // const question = (await axios.get(`http://localhost:8081/${params.questionId}`)).data;

    await axios.get(`http://localhost:8081/${params.questionId}`, null, {
      headers: {'Authorization': `Bearer ${auth0Client.getIdToken()}`}

    }).then(response => {
      // if success
      console.log(response);
      this.setState({
        question: response.data
      });

    }).catch(err => {
      console.log(err);
      console.log('set null response');
      this.setState({
        question: {}
      });
    });

  }

  async submitAnswer(answer) {
    await axios.post(`http://localhost:8081/answer/${this.state.question.id}`, {
      answer,
    }, {
      headers: {'Authorization': `Bearer ${auth0Client.getIdToken()}`}
    });
    await this.refreshQuestion();
  }

  async removeAllAnswers(question) {
    const id = question.id,
      id2 = this.state.question.id;

    if (id !== id2) {
      console.error('id mismatch...');
    }
    // console.log(id);
    // console.log(id2);

    await axios.post(`http://localhost:8081/answer/${id}/removeAll`, null, {
      headers: {'Authorization': `Bearer ${auth0Client.getIdToken()}`}

    }).then(response => {
      console.log(response);
      // if success
      const question = this.state.question;
      question.answers = [];

      this.setState({
        question,
      });

    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    const {question} = this.state;

    if (question === null) return <p>Loading ...</p>;
    if (Util.isEmpty(question)) return <p>Oop, not available</p>;

    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            <h1 className="display-3">{question.title}</h1>
            <p className="lead">{question.description}</p>
            <hr className="my-4"/>
            <SubmitAnswer questionId={question.id} submitAnswer={this.submitAnswer}/>

            <p>Answers:</p>
            {
              question.answers.map((answer, idx) => (
                <p className="lead" key={idx}>{answer.answer}</p>
              ))
            }

            {
              question.answers.length && <button className='btn btn-primary btn-danger' onClick={(e) => {
                this.removeAllAnswers(question);
              }
              }>Delete All</button> || ''
            }

          </div>
        </div>
      </div>
    )
  }
}

export default Question;
