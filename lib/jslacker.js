var CSVParser     = require('./jslacker/CSVParser');
var SQLConnector  = require('./jslacker/SQLCOnnector');

exports.csv = CSVParser.prepareAllCSVFiles();
exports.CSVParser = CSVParser;
exports.SQLConnector = SQLConnector;
