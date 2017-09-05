var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

var expect = chai.expect;
import {templater} from '../lib/jslacker'

describe('templater', ()=>{
  describe('templater/prepareAllSQLTemplates()', ()=>{
    it('returns an object with a property for each template in ./artefacts/templates', () =>{
      const templates = templater.prepareAllSQLTemplates();
      return expect(templates).to.have.property('MyAgeIs');
    });
    it('returns the template file data when no parameters are passed', () =>{
      const expectedResults = "SELECT Msg = 'My Age Is: ' + '$(MyAge)';";
      const templates = templater.prepareAllSQLTemplates();
      return expect(templates.MyAgeIs()).to.eventually.include(expectedResults);
    });
    it('returns the parameterised template when loaded with values', () =>{
      const expectedResults = "SELECT Msg = 'My Age Is: ' + '30';";
      const templates = templater.prepareAllSQLTemplates();
      return expect(templates.MyAgeIs({MyAge:'30'})).to.eventually.include(expectedResults);
    })
  });
  describe('templater/parameterise', () =>{
    it('returns the parameterised template when loaded with values', () =>{
      const input           = "SELECT Msg = 'My Age Is: ' + '$(MyAge)';"
      const expectedResults = "SELECT Msg = 'My Age Is: ' + '30';";
      return expect(templater.parameterise(input, {MyAge: '30'})).to.include(expectedResults);
    });
  });
});
