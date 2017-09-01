const fs = require('fs');
const path=require('path');

const csv=require('csvtojson');

function fromCSV(fileName){
  const loc = `${process.cwd()}\\artefacts\\${fileName}`;
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
  const file_path = `${process.cwd()}\\artefacts\\`
  const funcs = {}
  var items = fs.readdirSync(file_path);
  for (var i=0; i < items.length; i++){
    var file = file_path + '\\' + items[i];
    var fileName = path.basename(file, path.extname(file));
    var fileNameWithExt = path.basename(file);
    funcs[fileName] = () => {
      const csv = fileNameWithExt;
      console.log(csv);
      return fromCSV(csv);
    }
  }
  return funcs
}

exports.prepareAllCSVFiles = prepareAllCSVFiles;
exports.fromCSV = fromCSV;
