// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// const port = 3000;
// const db = require('./queries');

// app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );

// app.get('/', (request, response) => {
//     response.send('Hello World!');
// });

// app.get('/users', db.getUsers);
// app.get('/users/:userId', db.getUserById);


// app.listen(port, () => {
//     console.log(`Listening to port: ${port}`);
// });