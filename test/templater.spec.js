var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

var expect = chai.expect;

import {templater} from '../lib/jslacker'

describe('templater', ()=>{
  describe('templater/prepareAllSQLTemplates()', ()=>{
    it('returns an object with a property for each template in ./artefacts/templates');
    it('returns the template file data when no parameters are passed', () =>{
      const expectedResults = "SELECT Msg = 'My Age Is: ' + '$(MyAge)';";
      const templates = templater.prepareAllSQLTemplates();
      expect(templates.MyAgeIs()).to.eventually.equal(expectedResults);
    });
    it('returns the parameterized template when loaded with values')
  });
});
