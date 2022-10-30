const grpc = require('@grpc/grpc-js');
const serviceImpl = require('./service_impl');
const { GreetServiceService } = require('../proto/greet_grpc_pb');

const addr = 'localhost:50051';

function cleanup(server) {
	console.log('Cleaning up');

	if (server) {
		server.forceShutdown();
	}
}

function main() {
	const server = new grpc.Server();
	const creds = grpc.ServerCredentials.createInsecure();

	process.on('SIGINT', () => {
		console.log('Signal was interrupted');
		cleanup(server);
	});

	server.addService(GreetServiceService, serviceImpl);

	server.bindAsync(addr, creds, (err, _) => {
		if (err) {
			return cleanup(server);
		}

		server.start();
	});

	console.log(`Listening on port ${addr}`);
}

main();
