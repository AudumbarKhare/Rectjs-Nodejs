require('dotenv').config();
const http = require('http');
const app = require('./index');

const server = http.createServer(app);
server.listen(process.env.PORT);

// const PORT = process.env.PORT || 3000;
// server.listen(PORT, ()=>{
// console.log(`Server running at hhtp://localhost:${PORT}`)
// });