const notFound = (req, res, next) => {
	const error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);
	// if request fails in middleware it'll go straight to next
	next(error);
};

const errorHandler = (error, req, res, next) => {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	res.status(statusCode);
	res.json({
		message: error.message,
		// stops from hackers being able to see the stack when deployed
		stack: process.env.NODE_ENV === 'production' ? '🏀' : error.stack,
	});
};

module.exports = {
	notFound,
	errorHandler,
};
