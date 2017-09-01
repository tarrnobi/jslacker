var CSVParser     = require('./jslacker/CSVParser');
var SQLConnector  = require('./jslacker/SQLCOnnector');
var templater     = require('./jslacker/templater');

exports.csv          = CSVParser.prepareAllCSVFiles();
exports.templates    = templater.prepareAllSQLTemplates();

//raw object access
exports.CSVParser    = CSVParser;
exports.SQLConnector = SQLConnector;
exports.templater    = templater;
