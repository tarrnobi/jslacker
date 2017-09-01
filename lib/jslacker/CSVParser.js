const fs = require('fs');
const path=require('path');

const csv=require('csvtojson');
const csvFilePath = `${process.cwd()}\\artefacts\\csv\\`

function fromCSV(fileName){
  const loc = `${csvFilePath}${fileName}`;
  const p = new Promise((resolve, reject) =>{
    var jsonData = [];
    csv().fromFile(loc).on('json', (data)=>{
      jsonData.push(data);
    })
    .on('done', (error) =>{
      if (error) reject(error.toString());
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
function prepareAllCSVFiles(){
  const file_path = csvFilePath;
  const funcs = {}
  var items = fs.readdirSync(file_path);
  for (var item of items){
    // var fileName = path.basename(item, path.extname(item));
    var fileNameWithExt = path.basename(item);
    funcs[path.basename(item, path.extname(item))] = () => {
      const csv = path.basename(item);
      return fromCSV(csv);
    }
  }
  return funcs
}

exports.prepareAllCSVFiles = prepareAllCSVFiles;
exports.fromCSV = fromCSV;
