const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: 'localhost',
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