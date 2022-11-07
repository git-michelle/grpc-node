const { SumResponse } = require('../proto/sum_pb');
const { PrimesResponse } = require('../proto/primes_pb');

exports.calculator = (call, callback) => {
	console.log('Calculator was invoked');

	const res = new SumResponse().setTheSum(
		call.request.getFirstInt() + call.request.getSecondInt()
	);

	// null for err and res
	callback(null, res);
};

exports.primes = (call, _) => {
	console.log('Primes has been invoked');

	// The client will send one number (120) and the server will respond with a stream of (2,2,2,3,5), because 120=2*2*2*3*5
	// 120/2 = 60. 60/2 = 30. 30/2 = 15. 15/3 = 5. 5/5 = 1. end

	let currentNumber = call.request.getPrimeNumber();
	let divisor = 2;
	const res = new PrimesResponse();

	while (currentNumber > 1) {
		if (currentNumber % divisor === 0) {
			res.setPrimeResult(divisor);
			call.write(res);
			currentNumber /= divisor;
		} else {
			++divisor;
		}
	}

	call.end();
};
