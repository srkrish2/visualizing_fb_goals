var randomstring = require("randomstring");
var User = require('../schemas/user_schema');

// gets a user with some userid
exports.get_user = function(req, res) {
	User.findOne({mturkID: req.params.userid}, function (err, docs) {
    	if (err) return handleError(err);
    	res.send(docs);
    });
};

// creates a user
exports.create_user = function(req, res) {
	var uid = req.body.uid;
	var email = req.body.email;
	var exp_cond = req.body.exp_cond;

	var thisuser = new User({ uid: uid
							, email: email
							, exp_cond: exp_cond });

	User.findOne({uid: uid}).exec(function(err, user){
		if (err) return handleError(err);
	    if (user) { //user already exists with mturkid.
	    	if (user.uid == uid){
	    		res.send('1'); //user with same mturk id already exists
	    	} 
	    } 
	    else {
	    	User.create(thisuser, function (err, doc) {
				if (err) return handleError(err);
				res.send('0'); //created new user
			}); 
	    } //no users with that email NOR phone exist.
	});
};

exports.change_page = function(req, res) {
	var uid = req.body.uid;
	var page_num = req.body.page_num;

	User.updateOne({uid: uid, rejected:false}, {pageIdx: page_num}, function(err, doc){
		if(err) return handleError(err);
		res.send("page num updated");
	});
}

exports.update_consent = function(req, res){
	User.updateOne({mturkID: req.body.userid, rejected:false}, {consent: true, pageIdx: 3}, function(err, doc){
		if(err) return handleError(err);
		res.send("consent updated");
	});
};

exports.reject_user = function(req, res){
	User.updateOne({mturkID: req.body.userid, rejected:false}, {rejected: true, pageIdx: 100}, function(err, doc){
		if(err) return handleError(err);
		res.send("user rejected");
	});
}