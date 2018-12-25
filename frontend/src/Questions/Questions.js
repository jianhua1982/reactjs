import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import auth0Client from "../Auth";
import Popup from '../Popup/Popup';

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: null,
      isLoadingInProgress: false
    };

    this.handleRemoveAction = this.handleRemoveAction.bind(this);
    this.saveData = this.saveData.bind(this);
  }

  async componentDidMount() {
    const questions = (await axios.get('http://localhost:8081/')).data;
    this.setState({
      questions,
    });
  }

  async handleRemoveAction(question) {
    // request to backend
    const id = question.id;

    await axios.post(`http://localhost:8081/delete/${id}`, null, {
      headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
    }).then(response =>{
      console.log(response);

      // if success
      let questions = this.state.questions;

      const index = questions.indexOf(question);
      questions.splice(index, 1);
      this.setState({
        questions,
      });

    }).catch(err =>{
      console.log(err);
    });

  }

  async saveData() {
    // show loading
   this.setState({
     // questions: null,
     isLoadingInProgress: true
   });

    await axios.post(`http://localhost:8081/save`, null, {
      headers: {'Authorization': `Bearer ${auth0Client.getIdToken()}`}

    }).then(response => {
      // if success
      console.log("save success");
      // dismiss loading
      this.setState({
        isLoadingInProgress: false
      });

    }).catch(err => {
      console.log(err);
      this.setState({
        isLoadingInProgress: false
      });
    });

  }

  render() {
    const style4Btn = {
      // marginTop: '20px',
      // marginLeft: 'auto',
      // marginRight: 'auto',
      margin: '30px auto',
      display: 'block'
    };

    return (
      <div className="container">
        {/*{}*/}
        <Popup isLoading={this.state.isLoadingInProgress}> </Popup>

        <div className="row">
          <Link to="/new-question">
            <div className="card text-white bg-secondary mb-3">
              <div className="card-header">Need help? Ask here!</div>
              <div className="card-body">
                <h4 className="card-title">+ New Question</h4>
                <p className="card-text">Don't worry. Help is on the way!</p>
              </div>
            </div>
          </Link>

          {this.state.questions === null && <p>Loading questions...</p>}

          {
            this.state.questions && this.state.questions.map(question => (
              <div key={question.id} className="col-sm-12 col-md-4 col-lg-3">
                <Link to={`/question/${question.id}`}>
                  <div className="card text-white bg-success mb-3">
                    <div className="card-header">
                      Answers: {question.answers}

                      {/*<button type="button" className="close" aria-label="Close" onClick={this.handleRemoveAction}>*/}

                      <button type="button" className="close" aria-label="Close" onClick={(e) => {
                        e.preventDefault();
                        this.handleRemoveAction(question);
                      }}>
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="card-body">
                      <h4 className="card-title">{question.title}</h4>
                      <p className="card-text">{question.description}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          }
        </div>

        {
          // show save btn
          <div>
            {/*<button className="btn btn-lg btn-primary" type="button" onClick={this.saveData} style={style4Btn}>Save Data</button>*/}
            <button className="btn btn-lg btn-primary mt-3 mb-3 mx-auto" type="button" onClick={this.saveData} style={style4Btn}>Save Data</button>
          </div>
        }

      </div>
    )
  }
}

export default Questions;
