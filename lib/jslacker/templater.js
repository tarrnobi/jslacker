const fs = require('fs');
const path = require('path');

function prepareAllSQLTemplates(){
  const file_path = `${process.cwd()}\\artefacts\\templates`
  const templates = {};

  var items = fs.readdirSync(file_path);
  for (var item of items){
    templates[path.basename(item, path.extname(item))] = () =>{
      return "hello world";
    }
  }

  return templates;
}


exports.prepareAllSQLTemplates = prepareAllSQLTemplates;
