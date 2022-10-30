const grpc = require('@grpc/grpc-js');
const { CalculatorServiceClient } = require('../proto/calculator_grpc_pb');
const { SumRequest } = require('../proto/sum_pb');

function calculateSum(client) {
	console.log('calculator was invoked');

	const req = new SumRequest().setFirstInt(10).setSecondInt(3);

	client.calculator(req, (err, res) => {
		if (err) {
			return console.log(err);
		}

		console.log(`The sum is ${res.getTheSum()}`);
	});
}

function main() {
	const creds = grpc.ChannelCredentials.createInsecure();
	const client = new CalculatorServiceClient('localhost:50051', creds);

	calculateSum(client);
	client.close();
}

main();
