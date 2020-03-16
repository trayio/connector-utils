const { DDL, mustachedDDL } = require('../../../../../../lib');

module.exports = params =>
	params.mustache
		? mustachedDDL(
				params.arr,
				params.textPath,
				params.valuePath,
				params.options,
		  )
		: DDL(params.arr, params.textPath, params.valuePath, params.options);
