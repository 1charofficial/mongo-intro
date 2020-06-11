const User = require('../models/userModel');




exports.getSignup = async(req, res) => {

    res.render('signup')
}


exports.postSignUp = async(req, res) => {
    if(!req.body.userName || !req.body.password) {
        res.render('signup', {err: "Please enter correct details"})

        return
    }
    const user = new User ({

        userName:req.body.userName,
        email: req.body.email,
        password: password.body.password
    })

    await user.save()
    .then(success => res.redirect(`/profile/?userName=${req.body.userName}`))
    .catch(error => {
        res.render('signup', {err: 'username already exits'});
    })

}


//////////////////////////////////----------------------------------------------------


exports.getLogIn = async(req, res) => {
    res.render('login')
}



exports.postLogIn = async(req,res) => {
    res.render('login')
    if (! req.body.userName || ! req.body.password) {
        res.render('login', {err: "Please provide username and password."});

		return;
    }
    let logINs = {
       userName: req.body.userName,
       password = password.body.password}
    
    let checkLogINs = await User.findOne({userName: logINs.userName});
    if((logINs.userName == checkLogINs.userName && logINs == checkLogINs.password == logINs.password)) {
        res.redirect(`/profile?userNames=${req.body.userName}`); 

    }
    else {
        res.render('/login', {err: 'Incorrect username or password'});         
    }
    console.log(logINs.userName);
    console.log(logINs.password);
    console.log(checkLogINs);
}



///////////////---------------------------------------------------------

exports.getProfile = async(req, res) => {
    let user = await user.findOne({userName: req.query.userName})

    if(user == null) {
        res.render('profile', {user: user.toObject()});
    }
}

exports.postProfile = async(req, res) => {
    res.render('profile')

}