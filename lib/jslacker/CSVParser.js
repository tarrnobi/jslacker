const fs = require('fs');
const csv=require('csvtojson');

export function fromCSV(fileName){
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
