
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
app.post('/signup', (req, res) => {
	let user = new User({
		userName: req.body.userName,
		email: req.body.email,
        password: req.body.password,
        
	});
	user.save();
    res.redirect(`/profile?userName=${req.body.userName}`); 
    
});

app.get('/profile', async(req, res) => {
    let user = await User.findOne({userName: req.query.userName}); 
    res.render('profile', {user: user.toObject()});
    
});

app.listen(3000, ()=> {
    console.log('server is running on port 3000');
});
// app.get('/login', (req, res) => {
//     res.render('login');
// })
// app.post('/login', (req, res) => {
// 	let user = new User({
// 		userName: req.body.userName,
// 		email: req.body.email,
//         password: req.body.password,
        
// 	});
// 	user.save();
//     res.redirect(`/profile?userName=${req.body.userName}`); 
    
// });


