const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
        routes: {
            cors: { //membebaskan server manapun mengakses url/route kita
                origin: ['*'],
            },
        },
    })

    server.route(routes)

    await server.start()
    console.log(`server jalan di ${server.info.uri}`)
}

init()