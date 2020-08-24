import React, { Component } from 'react';
 
import { withAuthorization } from './Session';
 
// const HomePage = () => (
//   <div>
//     <h1>Home Page</h1>
//     <p>The Home Page is accessible by every signed in user.</p>

//     <p> {this.state.authUser} </p>

//     <p> {this.state.email} </p>/
//   </div>
// );

class HomePage extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {
            authUser: this.props.authUser,
            email: this.props.email,
            uid: this.props.uid,
        }
    }

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          authUser
            ? this.setState({ authUser: authUser, email:authUser.email, uid:authUser.uid })
            : this.setState({ authUser: null });
        },
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
    	return (
	    	<div>
			    <h1>Home Page</h1>
			    <p>The Home Page is accessible by every signed in user.</p>
			    <p> {this.state.uid} </p>
			</div>
		)
    }

}
 
const condition = authUser => !!authUser;
 
export default withAuthorization(condition)(HomePage);
