import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import auth0Client from '../Auth';

function NavBar(props) {
  const signOut = () => {
    auth0Client.signOut();
    props.history.replace('/');
  };

  const profile = auth0Client.getProfile();
  const style = {
    width: '45px',
    height: '45px'
  };

  return (
    <nav className="navbar navbar-dark bg-primary fixed-top">
      <Link className="navbar-brand" to="/">
        Q&App
      </Link>
      {
        !auth0Client.isAuthenticated() &&
        <button className="btn btn-dark" onClick={auth0Client.signIn}>Sign In</button>
      }
      {
        auth0Client.isAuthenticated() &&
        <div className="mr-3">
          <label className="align-middle mr-2 text-white">{profile.name}</label>
          {
            profile.picture && <img className="rounded " src={profile.picture} style={style}/>
          }
        </div>
      }
    </nav>
  );
}

export default withRouter(NavBar);
