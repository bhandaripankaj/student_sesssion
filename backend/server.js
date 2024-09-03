require("@babel/register")
const express = require('express');
const cors = require('cors');
const { validate, ValidationError} = require('express-validation')
const { apiRouter } = require("./src/routes");
const path = require('path');
const { formatJoiValidationError } = require("./src/utils/universalFunctions");
require('dotenv').config();
require('./config/dbConnection')
const app = express();

// app.use(cors({
//     origin: '' // Replace with your allowed domain(s)
// }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/api', apiRouter);

// error handler
app.use(function(err, req, res, next) {
    if (err instanceof ValidationError) {
        const formattedError = formatJoiValidationError(err);
        return res.status(err.statusCode).json(formattedError);
    }
    return res.status(500).json(err)
  })

app.set('port', (process.env.PORT || 8080));

app.get('/', function(request, response) {
    var result = 'App is running Now'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});

module.exports = app;


