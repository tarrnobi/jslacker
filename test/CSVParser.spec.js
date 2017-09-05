var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

var expect = chai.expect;

import {CSVParser} from '../lib/jslacker'


describe('CSVParser', () =>{
  describe('CSVParser/fromCSV()',() =>{
    it('returns an error message if file does not exist', () =>{
      const expectedResults = 'Error: File not exists'
      return expect(CSVParser.fromCSV('non-existant-file.csv')).to.eventually.be.rejectedWith(expectedResults);
    });
    it('loads the file given a path', ()=>{
      const expectedResults = [{Year:'1986', Age:'0'}];
      return expect(CSVParser.fromCSV('dummy.csv')).to.eventually.deep.equal(expectedResults);
    });
  });
  describe('CSVParser/prepareAllCSVFiles()', () =>{
    it('returns an object with a function call for all csv artefacts', () =>{
      const csv = CSVParser.prepareAllCSVFiles();
      return expect(csv).to.have.property('leap_years');
    });
    it('returns json data from the leap_years function when called', ()=>{
      const expectedResults = [
        {Year: '1988', Age:'2'},
        {Year: '1992', Age:'6'},
        {Year: '1996', Age:'10'},
        {Year: '2000', Age:'14'},
        {Year: '2004', Age:'18'},
        {Year: '2008', Age:'22'},
        {Year: '2012', Age:'26'},
        {Year: '2016', Age:'30'}
      ]
      const csv = CSVParser.prepareAllCSVFiles();
      return expect(csv.leap_years()).to.eventually.deep.equal(expectedResults);
    });
  });
})
