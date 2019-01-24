var mongo = require('mongodb');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI);
var urlEntrySchema = new mongoose.Schema({
  "original_url":{type: String, required: true},
  "short_url":{type:String,required: true},
})
var urlEntries = mongoose.model("urlEntries",urlEntrySchema);

module.exports = urlEntries;
