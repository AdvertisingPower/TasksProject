let ex = require('express');
let path = require('path');
let bd = require('body-parser')
let ccors = require('cors');
let app = ex()
app.use(ccors());
app.use(bd.json({ limit: '50mb', extended: true }));
app.use(bd.urlencoded({
    limit: '50mb',
    extended: true
}));
var router = ex.Router();
let options = ccors.CorsOptions = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    preflightContinue: false
};
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    //  res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
var taskAction = require('../action/task')

app.use('/tasks', taskAction);

app.get('/', (req, res) => res.send('welcome to our project'))
app.listen(3020, () => {
    console.log('localhost:3020')
})
module.exports = app