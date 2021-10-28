'use strict';

//dependencies
const { app, mount, start } = require('@lykmapipo/express-common');
const keys = require('lodash/keys');
const { connect } = require('@lykmapipo/mongoose-common');
const { fileRouter, createModels } = require('@lykmapipo/file');
const { getString, getNumber } = require('@lykmapipo/env');
// const server = require('http').createServer(app);
// const io = require('socket.io').listen(server);

const MONGODB_URI = getString('MONGODB_URI');
const PORT = getNumber('PORT', 5000);

app.get('/', (req, res) => {
  res.send({ status: 'working' });
});

connect(MONGODB_URI, (error) => {
  if (error) throw new Error(error);

  createModels();

  mount([fileRouter, require('./Product/product.http.model')]);

  start(PORT, (err) => {
    if (err) {
      throw new Error(err);
    }

    // eslint-disable-next-line no-console
    console.log(`visit http://0.0.0.0:${PORT}/v1/`);
  });
});

// connect(MONGODB_URI, (error) => error);

// server.listen(app.get('port'), (error) => {
//   if (error) {
//     throw new Error(error);
//   }
//   createModels();

//   mount([fileRouter, require('./Product/product.http.model')]);

//   console.log(app.get('port'));

//   console.log('Worked');
// });

// var connectedUser = {};
// io.on('connection', (socket) => {
//   console.log('client connect...', socket.id);
//   console.log('Connected');

//   socket.on('register', (data) => {
//     connectedUser[data] = socket;
//     console.warn('ConnetecdNew', keys(connectedUser));
//   });

//   socket.on('consultation_request', (data) => {
//     const { requester, doctor } = data;
//     connectedUser[requester].emit('new_message', {
//       message: 'This for patient',
//     });
//     connectedUser[doctor].emit('new_message', {
//       message: 'This is for doctor',
//     });
//   });

//   socket.on('new_message', (data) => {
//     console.log(data);
//   });
// });
