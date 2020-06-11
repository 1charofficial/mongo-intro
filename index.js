
const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
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

app.use('/', userRouter);



app.listen(3010, ()=> {
    console.log('server is running on port 3010');
});