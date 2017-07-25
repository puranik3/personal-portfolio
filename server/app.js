let express = require('express');
let cors = require('cors')
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

let nodemailer  = require( 'nodemailer' ); // https://github.com/nodemailer/nodemailer
let auth        = require( './data/email-auth' );

let jwt = require('./services/jwt');

let User = require( './models/User' );
let Message = require( './models/Message' );

let app = express();

app.use(cors({
    credentials: true,
    origin: true
}));

app.set('mongodb_uri', (process.env.MONGODB_URI || 'mongodb://localhost/personal-portfolio'));
app.set('port', (process.env.PORT || 3000));

app.use(express.static('public'));
app.use(bodyParser.json());

app.all('*', authenticate);

function authenticate(req, res, next) {
    function sendError() {
        res.status(401).send({
            message: 'You are not authorized to view this'
        });
    }

    if ( req.path === '/login' || ( req.path === '/messages' && req.method.toUpperCase() === 'POST' ) || ( req.path === '/reply' && req.method.toUpperCase() === 'POST' ) ) return next();

    if (!req.headers.authorization) {
        return res.status(401).send({
            message: 'You are not authorized to view this'
        });
    }

    let token = req.headers.authorization.split(' ')[1];
    
    let payload;
    try {
        payload = jwt.decode(token, 'shhh...');
    } catch (err) {
        return sendError();
    }

    if (!payload || !payload.sub) {
        return sendError();
    }

    res.locals.payload = payload;

    next();
}

app.post('/login', function (req, res) {
    let body = req.body;

    User.findOne(
        {
            email: body.email,
            password: body.password
        },
        function (err, result) {
            if (err) { return err; }

            if (!result) {
                return res.status(401).send({
                    message: 'Incorrect email or password - Authentication failed.'
                });
            }

            let payload = {
                iss: req.hostname,
                sub: '' + result._id
            };

            let token = jwt.encode(payload, 'shhh...');

            res.json({
                email: body.email,
                authToken: token
            });
        }
    );
});

app.get('/messages', function (req, res) {
    Message.find(
        function (err, results) {
            if (err) { return res.status(500).json(err); }

            res.json(results);
        }
    );
});

app.post('/messages', function (req, res) {
    let body = req.body;

    let message = new Message({
        received: new Date,
        name: body.name,
        email: body.email,
        phone: body.phone,
        message: body.message
    });

    message.save(function (err) {
        if (err) { return err; }
        res.status(200).json(message);
    });
});

app.put('/messages', function (req, res) {
    let body = req.body;
    let _id = body._id;

    if (!_id) {
        return res.status(400).json({
            message: "_id not specified"
        });
    }

    Message.findById(
        _id,
        function (err, curMessage) {
            if (err) { return res.status(500).json(err); }

            curMessage.received = new Date;
            curMessage.name = body.name || curMessage.name;
            curMessage.email = body.email || curMessage.email;
            curMessage.phone = body.phone || curMessage.phone;
            curMessage.message = body.message || curMessage.message;

            curMessage.save(function (err, savedMessage) {
                if (err) { return res.status(500).json(err); }
                
                res.status(200).json(savedMessage);
            });
        }
    );
});

app.delete('/messages', function (req, res) {
    let _id = req.body._id;

    if (!_id) {
        return res.status(400).json({
            message: "_id not specified"
        });
    }

    Message.findByIdAndRemove(
        _id,
        function (err, todo) {  
            var response = {
                message: "Message successfully deleted",
                id: _id
            };
            res.status(200).json(response);
        }
    );
});

app.post('/reply', function (req, res) {
    let body = req.body;

    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: auth
    });

    console.log(body.text);    
    // setup e-mail data with unicode symbols
    let mailOptions = {
        from: auth.user,
        to: body.to,
        subject: body.subject,
        text: body.text
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            res.send('Oops! Something went wrong sending the reply. Try again.');
            return console.log(err);
        }
        console.log('Reply sent: ' + info.response);
        res.send('Reply to the message was successfully sent to user');
    });
});

mongoose.connect(app.get('mongodb_uri'));

let server = app.listen(app.get('port'), function (err) {
    if (err) { return console.log('Error starting web server'); }

    console.log('Web server listening on port', server.address().port);
});