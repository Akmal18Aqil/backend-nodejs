const Hapi = require('@hapi/hapi');
/*
Setelah menetapkan nilai routes configuration, 
gunakan nilainya menggunakan method server.route() 
pada berkas server.js.
*/

const routes = require('./routes');
 
const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: 'localhost',
    });
    server.route(routes);
 
    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};
 
init();