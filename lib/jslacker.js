const CSVParser = require('./jslacker/CSVParser');
const SQLConnector = require('./jslacker/SQLConnector');
const templater = require('./jslacker/templater');

exports.csv = CSVParser.prepareAllCSVFiles();
exports.templates = templater.prepareAllSQLTemplates();

// raw object access
exports.CSVParser = CSVParser;
exports.SQLConnector = SQLConnector;
exports.templater = templater;
