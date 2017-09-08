const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shortUrlSchema = new Schema({
	url: String,
	shortUrl: Number
});

const shortUrl = mongoose.model('shorturl', shortUrlSchema);

module.exports = shortUrl;