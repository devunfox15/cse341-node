const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'CSE 341 Backend API',
        description: 'Project 1 part 2 User API'
    },
    host: 'localhost:8080',
    schemes: ['http, https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc)