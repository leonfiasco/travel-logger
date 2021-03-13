const express = require('express');
const app = express();
const morgan = require('morgan');
//removes certains headers to prevent attacks to my server
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const middlewares = require('./src/middlewares');
const logs = require('./src/routes/logs');

mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});

app.use(morgan('common'));
app.use(helmet());
app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
	})
);

// body parser depricated so using express to parse req
app.use(express.json());

app.get('/', (req, res) => {
	res.json({
		message: 'Hello world',
	});
});

app.use('/logs', logs);

app.use(middlewares.notFound);
// error handling middleware
app.use(middlewares.errorHandler);

const port = process.env.PORT || 2402;
app.listen(port, () => {
	console.log(`listening to requests at ${port}`);
});
