const exphbs = require('express-handlebars');
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const homeR = require('./routes/home.r')
require('dotenv').config()

const app = express()
app.engine('hbs', exphbs.engine({ extname: 'hbs', defaultLayout: 'main.hbs', layoutsDir: 'views/layouts' }));
app.use(express.static(path.join(__dirname, "public")))
app.set('view engine', 'hbs');
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.use('/', homeR)
port = 200

app.listen(port, () => {
    console.log('Server running at port http://localhost:' + port);
});