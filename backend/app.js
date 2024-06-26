const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');

const port = process.env.PORT || 8080;
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app
.use(bodyParser.json()).use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'origin, x-Requested-With, Content-Type, Accept, z-Key');
    next();
    })
.use('/', require('./routes'));

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