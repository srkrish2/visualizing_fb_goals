var express = require('express');
var router = express.Router();
var user = require('../controllers/user_controller');

// Home page route.
router.get('/', function(req, res) {
	console.log(req);
	res.send();
});

router.get('/:userid', user.get_user);

// creates a new user
router.post('/create', user.create_user);

//update user page
router.post('/pagenum', user.change_page);

//update consent
router.post('/consent', user.update_consent);

router.post('/reject', user.reject_user);

module.exports = router;