const { SumResponse } = require('../proto/sum_pb');

exports.calculator = (call, callback) => {
	console.log('Calculator was invoked');

	const res = new SumResponse().setTheSum(
		call.request.getFirstInt() + call.request.getSecondInt()
	);

	// null for err and res
	callback(null, res);
};
