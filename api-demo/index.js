
 
const config = require('config');   // Configuration package
const debugApp = require('debug')('api-demo:app'); // Debug package. Application workspace
// const debugDB = require('debug')('api-demo:db'); // Debug package. DB workspace
const express = require('express'); // Web service package
const helmet = require('helmet'); // Provide additional security to process http request
const morgan = require('morgan'); // 

// User defined internal packages
const routerApiDemo = require('./routes/api-demo-router');


// Custom-defines Packages
const logger = require('./logger.js'); // Log functionalities.

// Initialize web service to listen requests and activate some additinal middleware functions.
    const app = express();
    app.use(express.json()); // Configured to receive JSON files request.
    app.use(express.static('public')); // folder public used for static content
    app.use(helmet()); // Initialize helmet protection
    app.use('/api/demo',routerApiDemo); // Define router for all /api/demo requests.


    // Deve environment we activate the morgan logger function.
    if (app.get('env')==='development') { 
        app.use(morgan('tiny'));
        debugApp('Morgan enabled.');
    }
    app.use(logger); // User defined middleware function to log information when webservice receives request

    // Middleware function that could be used for authentication. I don´t know yet how to implement it.
    app.use(function (res,req,next) {
        debugApp('Executing Authentication..');
        next();
    });

    app.set('view engine','pug'); // Template engine
    app.set('views','./views'); // Default values. We don´t needt to change it.
// ----------- Web service initialized ---------





// Router for the root of the application
app.get('/', (req, res)=> {

    //res.send('Primeira mensagem !!!');
    res.render('index',{
        title: config.get('appName'), 
        message:'Primeira mensagem !!!',
        mail_host: config.get('appMail.host')
    });
});



const currentDate = new Date().toLocaleString();
const port = process.env.PORT || 3000;

debugApp(config.get('appName'));
debugApp('Mail host: ' + config.get('appMail.host'));
app.listen(port,() => debugApp('Listening on port ' + port + '. From '+ currentDate));

