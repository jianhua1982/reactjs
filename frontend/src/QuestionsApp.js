import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import auth0Client from './Auth';
import NavBar from './NavBar/NavBar';
import Question from './Question/Question';
import Questions from './Questions/Questions';
import Callback from './Callback';
import NewQuestion from './NewQuestion/NewQuestion';
import SecuredRoute from './SecuredRoute/SecuredRoute';
// import Popup from './Popup/Popup';
// import Products from '/Products/Products';
// import {ListGroup, ListGroupItem} from 'react-bootstrap';

// TODO
// https://react-bootstrap.github.io/


class QuestionsApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkingSession: true,
      isLoading: false
    }
  }

  async componentDidMount() {
    if (this.props.location.pathname === '/callback') {
      this.setState({checkingSession:false});
      return;
    }
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error !== 'login_required') console.log(err.error);
    }
    this.setState({checkingSession:false});
  }

  render() {
    return (
      <div>
        <NavBar/>

        {/*<Route exact path='/questions' component={Questions} />*/}
        {/*<Route exact path='/question/:questionId' component={Question}/>*/}
        {/*<Route exact path='/callback' component={Callback}/>*/}
        {/*<SecuredRoute path='/new-question'*/}
                      {/*component={NewQuestion}*/}
                      {/*checkingSession={this.state.checkingSession} />*/}

        {/*<Popup />*/}
        {/*<Popup isLoading={true}> </Popup>*/}
      </div>
    );
  }
}

// export default withRouter(QuestionsApp);
export default QuestionsApp;
