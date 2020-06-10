
const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const User = require('./models/userModel');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://1charofficial:Password0161@cluster0-y8zuw.azure.mongodb.net/users?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.engine('.hbs',hbs({
    defaultLayout: 'layout',
    extname: '.hbs'
}));

app.set('view engine','.hbs');


app.get('/', (req, res) => {
    res.render('signup');
});
app.post('/signup', async (req, res) => {
    if (!req.body.userName || !req.body.email || !req.body.password) {
		res.render('signup', {err: "Please provide details."});
		return;
    }

	let user = new User({
		userName: req.body.userName,
		email: req.body.email,
        password: req.body.password,
       
    });

    let isDuplicate = false;

	await user.save().catch((reason) => {
        res.render('signup', {err: "A user with this user name or password already exists"});
        console.log(reason);

        isDuplicate = true;
        return
    });
    
	if (isDuplicate) {
		return;
	}

    res.redirect(`/profile?userName=${req.body.userName}`);    
    
});


app.get('/profile', async(req, res) => {
    let user = await User.findOne({userName: req.query.userName}); 

    if (user == null) {
        res.render('profile', {err: `that user doesn't exist`});		
    
    return;	
    
    res.render('profile', {user: user.toObject()};
});

app.listen(3010, ()=> {
    console.log('server is running on port 3010');
});


app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/login', async (req, res) => {

    let user = await User.findOne({userName: req.query.userName}); 

    if(user) {
        let user = await User.findOne({password: req.query.password}); 
        res.render('profile');	
        return;	
    
    }

    //if (!req.body.userName || !req.body.password) OR if(user != user) OR
    if (user == null) {
        res.render('login', {err: "Please provide username and password."});
		return;
    }
    else {
        res.redirect(`/profile?userNames=${req.body.userName}`);         
    }


    
});
