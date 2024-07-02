const express = require('express');
const bodyParser = require('body-parser');
const dotEnv = require('dotenv');
const mongodb = require('./db/connect');
const passport = require('passport');
const session = require('express-session');
const GithubStrategy = require('passport-github2').Strategy; 

const cors = require('cors');

const port = process.env.PORT || 8080;
const app = express();

// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app
.use(bodyParser.json())
.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
}))
.use(passport.initialize())
.use(passport.session())
.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'origin, x-Requested-With, Content-Type, Accept, z-Key, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    next();
})
.use(cors({ methods: ['GET','HEAD','PUT','PATCH','POST','DELETE'] }))
.use(cors({origin: '*'}))
.use('/', require('./routes/index.js'));


passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL:  process.env.CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done) {
        return done(null, profile);
        }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged out')});

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false }),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    });

// error handler
process.on('uncaughtException', (err, origin) => {
console.log(process.stderr.id, `Caught exception: ${err}\n`+ `Exception origin: ${origin}\n` );
})

mongodb.initDb((err) => {
    if (err) {
    console.log(err);
    } else {
    app.listen(port, () => {
        console.log(`Connected to DB and listening on ${port}`);
    }
    );
    }
});