import React, {Component} from 'react';
// import {Route, withRouter} from 'react-router-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import NavBar from './NavBar/NavBar';
// import Popup from './Popup/Popup';
import FilterableProductTable from './Products/Products';
import QuestionsApp from './QuestionsApp';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import Questions from "./Questions/Questions";
import Question from "./Question/Question";
import Callback from "./Callback";
import NewQuestion from "./NewQuestion/NewQuestion";
import SecuredRoute from "./SecuredRoute/SecuredRoute";
import BasicExample from './BasicExample';

// TODO
// https://react-bootstrap.github.io/


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const apps = [{
                path: '/questions',
                component: QuestionsApp
            }, {
                path: '/products',
                component: FilterableProductTable
            }, {
                path: '/BasicExample',
                component: BasicExample
            }
        ];

        const rows = [];
        const routes = [];

        apps.forEach(app => {
            console.log(app);
            rows.push(
                <ListGroupItem href={app.path} key={app.path}>
                    <Link to={app.path}>
                        {app.path}
                    </Link>
                </ListGroupItem>
            );

            routes.push(
                <Route path={app.path} component={app.component}/>
            );
        });

        return (
            <Router>
                <div>
                    {/*<NavBar/>*/}

                    <ListGroup>
                        {rows}
                    </ListGroup>

                    <hr />

                    {routes}

                    <Route exact path='/questions' component={Questions} />
                    <Route exact path='/question/:questionId' component={Question}/>
                    <Route exact path='/callback' component={Callback}/>
                    <SecuredRoute path='/new-question'
                                  component={NewQuestion}
                                  checkingSession={this.state.checkingSession} />
                </div>
            </Router>
        );
    }
}

export default App;
