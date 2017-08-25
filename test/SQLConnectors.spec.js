var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

var expect = chai.expect;

import {SQLConnector} from '../lib/jslacker'
import {CSVParser} from '../lib/jslacker'
const sql = require('mssql');
const dotenv = require('dotenv');

describe ('SQLConnectors', () =>{
  describe('SQLConnects/query()', () =>{
    it('returns a recordset when a simple query is executed', ()=>{
      const sqlQuery        = "SELECT Msg = 'Hello World';";
      const expectedResults = [{Msg: 'Hello World'}];
      return expect(SQLConnector.query(sqlQuery)).to.eventually.deep.equal(expectedResults);
    })
    it('returns an error when an error is raised from the database', ()=>{
      const sqlQuery = "RAISERROR('This should fail', 16,1);";
      const expectedResults = 'This should fail';
      return expect(SQLConnector.query(sqlQuery)).to.eventually.be.rejectedWith(expectedResults);
    });

    it('returns a recordset when a parameterised query is passed in', () =>{
      const sqlQuery = "SELECT Msg = @Msg, Name = @Name, Priority = @Priority";
      const parameters =  [
                            {name: 'Msg', type: sql.VarChar(50), value: 'Hello'},
                            {name: 'Name', type: sql.VarChar(50), value: 'Brendan'},
                            {name: 'Priority', type: sql.Int, value: 1}
                          ];
      const expectedResults = [{Msg: 'Hello', Name: 'Brendan', Priority: 1}];
      return expect(SQLConnector.query(sqlQuery, parameters)).to.eventually.deep.equal(expectedResults);

    });
    it('returns an error when a parameter is missing from the query', () =>{
      const sqlQuery = "SELECT Msg = @Msg, Name = @Name"
      const parameters = [
        {name: 'Msg', type: sql.VarChar(50), value: 'Hello'}
      ];
      const expectedResults = 'Must declare the scalar variable "@Name"';
      return expect(SQLConnector.query(sqlQuery, parameters)).to.eventually.be.rejectedWith(expectedResults);
    })
  });

    // it('Can return SQL and compare to a CSV', ()=>{
    //   var fileData = CSVParser.fromCSV("dummy.csv");
    //   var queryData = SQLConnector.dummyQuery();
    //   return Promise.all([
    //     queryData, fileData
    //     // SQLConnector.dummyQuery(),
    //     // CSVParser.fromCSV("dummy.csv")
    //   ]).then(results =>{
    //     expect(results[0].recordset).to.deep.equal(results[1]);
    //   })
    // });
})
