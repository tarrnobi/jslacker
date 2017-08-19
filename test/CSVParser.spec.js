import {expect} from 'chai';
import {CSVParser} from '../lib/jslacker'


describe('CSVParser', () =>{
  it('returns an error message if file does not exist', () =>{
    return CSVParser.fromCSV("non-existant-file.csv").catch(error => {
      expect(error).to.equal("Error: File not exists");
    });
  });
  it('loads the file given a path', ()=>{
    const expected_data = [{Year:'1986', Age:'0'}];
    return CSVParser.fromCSV("dummy.csv").then(data =>{
      expect(data).to.deep.equal(expected_data);
    })
  })
  it('returns json that represents the csv file passed in')
})
