const fs = require('fs');
const path = require('path');

const csv = require('csvtojson');

const csvFilePath = `${process.cwd()}\\artefacts\\csv\\`;

function fromCSV(fileName) {
  const loc = `${csvFilePath}${fileName}`;
  const jsonData = [];
  // throw new Error('Error: File not exists');
  const p = new Promise((resolve) => {
    csv().fromFile(loc).on('json', (data) => {
      jsonData.push(data);
    })
      .on('done', (error) => {
        if (error) {
          jsonData.push({ errorMessage: error.toString() });
        }
        resolve(jsonData);
      });
  });
  return p;
}
/*
  Scan artefacts directory; get all CSV files.
    - For each, get the name, add it as a function that
    calls fromCSV to an object
    - Return object, so that any csv can be grabbed via
    jslacker.csv.CSVNAME
*/
function prepareAllCSVFiles() {
  const filePath = csvFilePath;
  const funcs = {};
  const items = fs.readdirSync(filePath);
  items.forEach((item) => {
    // var fileName = path.basename(item, path.extname(item));
    // const fileNameWithExt = path.basename(item);
    funcs[path.basename(item, path.extname(item))] = () => {
      const csvFile = path.basename(item);
      return fromCSV(csvFile);
    };
  });
  return funcs;
}

exports.prepareAllCSVFiles = prepareAllCSVFiles;
exports.fromCSV = fromCSV;
