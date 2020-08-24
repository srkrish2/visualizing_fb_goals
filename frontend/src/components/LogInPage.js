import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../style/LogInPage.css';
import axios from 'axios';
import swal from 'sweetalert';

//we need to have a page to handle a rejected user
class LogInPage extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.state = {
            mturk: '',
            valid_id: false,
            attempted: 0,

            //condition specific
            provider: this.props.provider,
            fbops: this.props.fbops,
            regulation: this.props.regulation,
        }
    }

    /**
     * handle change for input box in the forms and update state info
     * @param e
     */
    handleChange(e) {
        var value = e.target.value;
        this.setState({ [e.target.name]: e.target.value }, 
                () => { this.validateField(value) });
    }

    /**
     * call login function when press 'enter' key button
     * @param e
     */
    handleKeyPress(e) {
        if (e.key === 'Enter') {
            e.preventDefault(); //avoid refresh
            this.login(e);
        }
    }

    validateField(value) {
        var letterNumber = /^[0-9a-zA-Z]+$/;
        var valid_turkid = value.match(letterNumber);
        var this_valid_id = valid_turkid ? true : false;
        if(this.state.attempted === 0){
            this.setState({valid_id: this_valid_id, attempted: 1});
        } else {
            this.setState({valid_id: this_valid_id});
        }
    }

    /**
     * check login validation
     * @param e form event
     */
    login(e) {
        e.preventDefault();
        if(this.state.valid_id){
            const user = {
                userid: this.state.mturk,
                provider_condition: this.state.provider,
                fbops_condition: this.state.fbops,
                regulation_condition: this.state.regulation,
            };

            axios.post('/user/create', user)
                .then(res => this.reroute_user(res.data));
        } else {
            console.log("not sending request");
        }
    }

    reroute_target(target_page_num){
        console.log(target_page_num)
        var target_page;
        switch(target_page_num){
            case 0:
                target_page = "/overview"
                break;
            case 1:
                target_page = "/initialSurvey/1"
                break;
            case 2:
                target_page = "/initialSurvey/2"
                break;
            case 3:
                target_page = "/task0"
                break;
            case 4: //no more quiz bc its too hard
                target_page = "/task1"
                break;
            case 5:
                target_page = '/task2'
                break;
            case 6:
                target_page = '/task3'
                break;
            case 7:
                target_page = "/midSurvey"
                break;
            case 8:
                target_page = "/finalSurvey";
                break;
            case 9:
                target_page ='/ending';
                break;
            case 100: //rejected because of quiz result
                target_page = "/invalid";
                break;
            case 101: //rejected because of plagairism
                target_page = "/invalid";
                break;
            default: 
                //pageIdx == 99, successfull completion of task!
                //pageIdx == 98, has one piece of writing
                target_page = "/didnotfinish"
        }
        console.log(target_page)
        console.log(this.state.mturk)
        this.props.history.push({pathname: target_page, state: { user: this.state.mturk }});
    }

    reroute_user(data){
        console.log(data);
        if(data == "1"){
            //old user, so reroute to correct page
            swal("Welcome back!", "You will be directed to the page you ended last time.", "success")
            .then(() => {
                axios.get('/user/getpage/'+this.state.mturk)
                .then(res => this.reroute_target(res.data));
            });
        } else {
            //else new user was created, so no need to change target page
            // this.reroute_target('/overview')
            this.props.history.push({pathname: '/overview', state: { user: this.state.mturk }});
        }
    }

    warning_invalid_id(){
        if(this.state.attempted === 1 && this.state.valid_id === false){
            return <Form.Label className="label" style={{color: 'red'}}>
                       Please provide a valid MTurk ID
                   </Form.Label>
        } else {
            return <div/>
        }
    }

    render() {
        return (
            <div className="container">
                <Form className="formContainer">
                    <h1>Log In</h1>
                    <br/>
                    <Form.Group>
                        <Form.Label className="label">MTurk Account</Form.Label>
                        <Form.Control className="inputBox" value={this.state.mturk} 
                                      onChange={this.handleChange} onKeyPress={this.handleKeyPress}
                                        required type="username" name="mturk" placeholder="Enter your MTurk ID" />
                         {this.warning_invalid_id()}
                    </Form.Group>
                    <br/>
                    <Button type="submit" className="buttons" variant="outline-primary" onClick={this.login} disabled={!this.state.valid_id}>
                        Log In
                    </Button>
                </Form>
            </div>
        )
    }
}

export default withRouter(LogInPage);