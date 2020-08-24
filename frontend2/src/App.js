// Check this tutorial out for Firebase authentication and session management: 
// https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial#react-application-setup-create-react-app

import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  withRouter
} from 'react-router-dom';

import * as ROUTES from './constants/routes';
import { withFirebase } from './components/Firebase';
import { withAuthentication } from './components/Session';

// import LandingPage from './component/LandingPage';
// import OverviewConsentPage from './component/OverviewConsentPage';
// import FeedbackSettingPage from './component/FeedbackSettingPage';
// import InitialSurveyPage from './component/InitialSurveyPage';
// import InitialSurveyPagePart2 from './component/InitialSurveyPage_Part2';
// import FinalSurveyPage from './component/FinalSurveyPage';
// import EndingPage from './component/EndingPage';
import Navigation from './components/Navigation';
import LogInPage from './components/LogInPage';
import SignUp from './components/SignUp'
import SignIn from './components/SignIn';
import HomePage from './components/HomePage'
import AccountPage from './components/Account'

// import Invalid from './component/Invalid';
// import Didnotfinish from './component/Didnotfinish';
// import MidSurveyPage from './component/SurveyAfterGettingFeedbackPage';
// import TaskQuiz from './component/task1'
// import SetFBGoal from './component/task2'
// import WritingTask from './component/task3
// import InitTask from './component/task0'
// import AdminFeedbackEntry from './component/AdminFeedbackEntry'
// import AwaitingFeedback from './component/AwaitingFeedback'
// import AdminRating from './component/AdminRating'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css"

const App = () => (
  <Router>
    <div>
      <Navigation />
 
      <hr />
 
      <Route path={ROUTES.SIGN_UP} component={SignUp} />
      <Route path={ROUTES.SIGN_IN} component={SignIn} />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
    </div>
  </Router>
);

export default withAuthentication(App);
