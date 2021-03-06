const mongoose = require('mongoose');

const requiredNumber = {
	type: Number,
	required: true,
};

const logEntrySchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: { type: String, required: false },
		comments: { type: String, required: false },
		image: { type: String, required: false },
		rating: {
			type: Number,
			min: 0,
			max: 10,
			default: 0,
		},
		latitude: {
			...requiredNumber,
			min: -90,
			max: 90,
		},
		longitude: {
			...requiredNumber,
			min: -180,
			max: 180,
		},
		visitDate: {
			required: true,
			type: Date,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('LogEntry', logEntrySchema);
