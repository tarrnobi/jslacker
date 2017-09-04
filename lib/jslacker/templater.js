const fs = require('fs');
const path = require('path');

const templateFilePath = `${process.cwd()}\\artefacts\\templates\\`;
function loadTemplate(fileName, parameters){{
  return new Promise((resolve, reject) => {
    const fileLocation = `${templateFilePath}${fileName}`;
    fs.readFile(fileLocation, 'utf8', (err,data) =>{
      if (err) reject(err);
      resolve(data);
    });
  });
}}
function prepareAllSQLTemplates(){
  const file_path = `${process.cwd()}\\artefacts\\templates`
  const templates = {};

  var items = fs.readdirSync(file_path);
  for (var item of items){
    templates[path.basename(item, path.extname(item))] = (params) =>{
      return loadTemplate(path.basename(item), params);
    }
  }

  return templates;
}


exports.prepareAllSQLTemplates = prepareAllSQLTemplates;
