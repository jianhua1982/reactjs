import auth0 from 'auth0-js';

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      // the following three lines MUST be updated

      // domain: 'bk-tmp.auth0.com',
      // audience: 'https://bk-tmp.auth0.com/userinfo',
      // clientID: 'PVafIu9Q5QN65DiPByAFvCCJryY7n432',

      domain: 'youzhuo.auth0.com',
      audience: 'https://youzhuo.auth0.com/userinfo',
      clientID: 'xR7RG0nOdN7MFg9PLjlm2pANf6H3TjvC',

      redirectUri: 'http://localhost:3000/callback',
      responseType: 'id_token',
      scope: 'openid profile'
    });

    this.getProfile = this.getProfile.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  getProfile() {
    console.log(this.profile);
    return this.profile;
  }

  getIdToken() {
    return this.idToken;
  }

  isAuthenticated() {
    // mock
    // return true;
    return new Date().getTime() < this.expiresAt;
  }

  signIn() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.setSession(authResult);
        resolve();
      });
    })
  }

  setSession(authResult) {
    this.idToken = authResult.idToken;
    this.profile = authResult.idTokenPayload;
    // set the time that the id token will expire at
    this.expiresAt = authResult.idTokenPayload.exp * 1000;
  }

  signOut() {
    this.auth0.logout({
      returnTo: 'http://localhost:3000',
      clientID: 'PVafIu9Q5QN65DiPByAFvCCJryY7n432',
    });
  }

  silentAuth() {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
        if (err) return reject(err);
        this.setSession(authResult);
        resolve();
      });
    });
  }
}

const auth0Client = new Auth();

export default auth0Client;