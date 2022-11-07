const pb = require('../proto/greet_pb');

//unary
exports.greet = (call, callback) => {
	console.log('Greet was invoked');

	const res = new pb.GreetResponse().setTheSum(
		`Hello ${call.request.getFirstName()}`
	);

	callback(null, res);
};

// server streaming
exports.greetManyTimes = (call, _) => {
	console.log('GreetManyTimes has been invoked');
	const res = new pb.GreetResponse();

	for (let i = 0; i < 10; i++) {
		res.setResult(`Hello ${call.request.getFirstName()} - number ${i}`);
		call.write(res);
	}

	call.end();
};
