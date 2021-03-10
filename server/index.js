const express = require('express');
const morgan = require('morgan');
//removes certains headers to prevent attacks to my server
const helmet = require('helmet');
const cors = require('cors');

const middlewares = require('./src/middlewares');

const app = express();
app.use(morgan('dev'));
app.use(helmet());
app.use(
	cors({
		origin: 'http://localhost:3000',
	})
);

app.get('/', (req, res) => {
	res.json({
		message: 'Hello world',
	});
});

app.use(middlewares.notFound);
// error handling middleware
app.use(middlewares.errorHandler);

const port = process.env.PORT || 8000;
app.listen(port, () => {
	console.log(`listening to requests at ${port}`);
});
