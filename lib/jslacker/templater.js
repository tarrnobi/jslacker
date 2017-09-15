const fs = require('fs');
const path = require('path');

const templateFilePath = `${process.cwd()}\\artefacts\\templates\\`;
function parameterise(input, params) {
  let str = input;
  for (const key in params) {
    str = input.replace(`$(${key})`, params[key]);
  }
  return str;
}

function loadTemplate(fileName, parameters) {
  return new Promise((resolve, reject) => {
    const fileLocation = `${templateFilePath}${fileName}`;
    fs.readFile(fileLocation, 'utf8', (err, data) => {
      if (err) reject(err);
      // console.log(parameters);
      // console.log(data);
      resolve(parameterise(data, parameters));
    });
  });
}

function prepareAllSQLTemplates() {
  const filePath = `${process.cwd()}\\artefacts\\templates`;
  const templates = {};

  const items = fs.readdirSync(filePath);
  for (const item of items) {
    templates[path.basename(item, path.extname(item))] = params =>
      loadTemplate(path.basename(item), params);
  }

  return templates;
}


exports.prepareAllSQLTemplates = prepareAllSQLTemplates;
exports.parameterise = parameterise;
