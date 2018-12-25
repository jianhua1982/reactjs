import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import Util from "../Util";
// import auth0Client from '../Auth';

class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isLoading: this.props.isLoading
    };

    // this.showLoading = this.showLoading.bind(this);
    // this.dismiss = this.dismiss.bind(this);
  }

  componentDidMount() {

  }

  // showLoading() {
  //   this.setState({
  //     isLoading: true
  //   });
  // }
  //
  // dismiss() {
  //   this.setState({
  //       isLoading: false
  //   });
  // }

  render()  {
    // this.props.isLoading
    const styles = {
      loading: {
        width: '48px'
      }
    };

    const cssShow = this.props.isLoading  ? 'display: "block"' : 'display: none';

    let classNames = "modal fade bd-example-modal-lg";
    this.props.isLoading && (classNames += ' show');

    return (
      <div className={classNames} data-backdrop="static" data-keyboard="false" tabIndex="-1"
           // style={{display: "block"}} >
           // style={{cssShow}} >
           style={{display: this.props.isLoading  ? "block" : "none"}} >

        <div className="modal-dialog modal-sm">
          <div className="modal-content" style={{width: '48px'}}>
            <span className="fa fa-spinner fa-spin fa-3x"></span>
          </div>
        </div>
      </div>
    );
  }
}

export default Popup;
