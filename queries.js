// const Pool = require('pg').Pool
// const pool = new Pool({
//   user: 'tevincheatham',
//   host: 'localhost',
//   database: 'E-commerce',
//   password: 'password',
//   port: 5432,
// });

// const getUsers = (request, response) => {
//     pool.query('SELECT * FROM users', (error, results) => {
//       if (error) {
//         throw error
//       }
//       response.status(200).json(results.rows)
//     });
//   };

// const getUserById = (request, response) => {
//     const id = parseInt(request.params.userId);
  
//     pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
//         if (error) {
//         throw error
//         }
//         response.status(200).json(results.rows)
//     });
// };

// module.exports = {
//     getUsers,
//     getUserById
// };