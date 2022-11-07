const grpc = require('@grpc/grpc-js');
const { CalculatorServiceClient } = require('../proto/calculator_grpc_pb');
const { SumRequest } = require('../proto/sum_pb');
const { PrimesRequest } = require('../proto/primes_pb');
const { AverageRequest } = require('../proto/average_pb');

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

function calculatePrimes(client) {
	console.log('primes client was invoked');

	const req = new PrimesRequest().setPrimeNumber(45);

	const call = client.primes(req);

	call.on('data', (res) => {
		console.log(`${res.getPrimeResult()} is a prime`);
	});
}

function calculateAverage(client) {
	console.log('average client was invoked');

	const nums = [8, 9, 10, 15, 44, 19, 32];

	const call = client.average((err, res) => {
		if (err) {
			return console.log(err);
		}

		console.log(`Average: ${res.getAverageResult()}`);
	});

	nums
		.map((num) => {
			return new AverageRequest().setInputNumber(num);
		})
		.forEach((req) => call.write(req));

	call.end();
}

function main() {
	const creds = grpc.ChannelCredentials.createInsecure();
	const client = new CalculatorServiceClient('localhost:50051', creds);

	// calculateSum(client);
	// calculatePrimes(client);
	calculateAverage(client);
	client.close();
}

main();
