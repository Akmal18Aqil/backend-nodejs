const Hapi = require('@hapi/hapi');
const got = require('got');

const {
    ORDER_SERVICE_PORT = 4000,
    USER_SERVICE_PORT = 5000,
    } = process.env;
     
    const orderService = `http://localhost:${ORDER_SERVICE_PORT}`;
    const userService = `http://localhost:${USER_SERVICE_PORT}`;
 
const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
  });
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};
init();