import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import NavBar from './NavBar/NavBar';
// import Popup from './Popup/Popup';
import FilterableProductTable from './Products/Products';
import QuestionsApp from './QuestionsApp';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import Questions from "./Questions/Questions";
import Question from "./Question/Question";
import Callback from "./Callback";

// TODO
// https://react-bootstrap.github.io/


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }


  render() {
    const apps = [
      {
        path: '/questions',
        component: QuestionsApp
      },

      {
        path: '/products',
        component: FilterableProductTable
      }
    ];


// ReactDOM.render(
//   <FilterableProductTable products={PRODUCTS} />,
//   document.getElementById('container')
// );


    // const apps = [
    //   {
    //     path: '/questionsApp',
    //     component: QuestionsApp
    //   }
    // ];

    const list = [];

    apps.forEach(app => {
      console.log(app);
      list.push(
      <ListGroupItem href={app.path} key={app.path}>
        {/*<Route path={app.path} component={app.component}>*/}
          {app.path}
        {/*</Route>*/}
      </ListGroupItem>
      );
    });


    return (
        <div>
            <NavBar/>
            <Route exact path='/questions' component={QuestionsApp} />

            <Route exact path='/products' component={FilterableProductTable} />

            <Route exact path='/questions' component={Questions} />
            <Route exact path='/callback' component={Callback}/>

            {/*<Route exact path='/' component={FilterableProductTable} >*/}
            {/*<FilterableProductTable products={PRODUCTS} />*/}
            {/*</Route>*/}

            {/*<FilterableProductTable products={PRODUCTS} />*/}

            <ListGroup>
                {list}
            </ListGroup>
        </div>
    );
  }
}

export default withRouter(App);
