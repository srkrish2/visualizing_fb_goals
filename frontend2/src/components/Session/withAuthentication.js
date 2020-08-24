import React from 'react';
 
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
 
const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
 
      this.state = {
        authUser: null,
        email: null,
        uid: null,
      };
    }
 
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          authUser
            ? this.setState({ authUser: authUser, email:authUser.email, uid:authUser.uid })
            : this.setState({ authUser: null });
        },
      );
      console.log(this.state)
    }
 
    componentWillUnmount() {
      this.listener();
    }
 
    render() {
      console.log(this.props)

      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} authUser={this.state.authUser} />
        </AuthUserContext.Provider>
      );
    }
  }
 
  return withFirebase(WithAuthentication);
};
 
export default withAuthentication;