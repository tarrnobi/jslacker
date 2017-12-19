const fs = require('fs');
const path = require('path');

const templateFilePath = `${process.cwd()}/artefacts/templates/`;
function parameterise(input, params = {}) {
  let str = input;
  Object.keys(params).forEach((key) => {
    str = str.replace(`$(${key})`, params[key]);
  });
  return str;
}

function loadTemplate(fileName, parameters) {
  return new Promise((resolve, reject) => {
    const fileLocation = `${templateFilePath}${fileName}`;
    fs.readFile(fileLocation, 'utf8', (err, data) => {
      if (err) reject(err);
      resolve(parameterise(data, parameters));
    });
  });
}

function prepareAllSQLTemplates() {
  const templates = {};

  const items = fs.readdirSync(templateFilePath);
  items.forEach((item) => {
    templates[path.basename(item, path.extname(item))] = params =>
      loadTemplate(path.basename(item), params);
  });

  return templates;
}


exports.prepareAllSQLTemplates = prepareAllSQLTemplates;
exports.parameterise = parameterise;
