require('dotenv').config();
const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000

// Create the server
const app = express()

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'frontend/build')))
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

//Routes
const user = require('./routes/user_route.js');
// const userbackground = require('./routes/userbackground');
// const postfeedback = require('./routes/postfeedback');
// const finalsurvey = require('./routes/final_survey');
// const fearevalsurvey = require('./routes/fear_eval');
// const feedback = require('./routes/feedback');
// const writing = require('./routes/writing_route');
app.use('/user', user);
// app.use('/background', userbackground);
// app.use('/postfeedback', postfeedback);
// app.use('/finalsurvey', finalsurvey);
// app.use('/feareval', fearevalsurvey);
// app.use('/feedback', feedback);
// app.use('/writing', writing);

// Anything that doesn't match the above, send back the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/frontend/build/index.html'))
})

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/feedback_goal_viz');
const db_connection = mongoose.connection;
db_connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

// Choose the port and start the server
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`)
})