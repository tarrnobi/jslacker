import { CSVParser } from '../lib/jslacker';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const expect = chai.expect;

describe('CSVParser', () => {
  describe('CSVParser/fromCSV()', () => {
    it('returns an error message if file does not exist', async () => {
      const expectedResults = [{ errorMessage: 'Error: File not exists' }];
      const results = await CSVParser.fromCSV('non-existant-file.csv');
      expect(results).to.deep.equal(expectedResults);
    });
    it('loads the file given a path', async () => {
      const expectedResults = [{ Year: '1986', Age: '0' }];
      const results = await CSVParser.fromCSV('dummy.csv');
      expect(results).to.deep.equal(expectedResults);
    });
  });
  describe('CSVParser/prepareAllCSVFiles()', () => {
    it('returns an object with a function call for all csv artefacts', () => {
      const csv = CSVParser.prepareAllCSVFiles();
      return expect(csv).to.have.property('leap_years');
    });
    it('returns json data from the leap_years function when called', async () => {
      const expectedResults = [
        { Year: '1988', Age: '2' },
        { Year: '1992', Age: '6' },
        { Year: '1996', Age: '10' },
        { Year: '2000', Age: '14' },
        { Year: '2004', Age: '18' },
        { Year: '2008', Age: '22' },
        { Year: '2012', Age: '26' },
        { Year: '2016', Age: '30' },
      ];
      const csv = CSVParser.prepareAllCSVFiles();
      const results = await csv.leap_years();
      return expect(results).to.deep.equal(expectedResults);
    });
  });
});
