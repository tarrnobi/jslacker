import {expect} from 'chai';
import {SQLConnector} from '../lib/jslacker'
import {CSVParser} from '../lib/jslacker'

describe ('SQLConnectors', () =>{
  describe('SQLConnectors/General', () =>{
    it("Can Connect and return 'Hello World'", ()=>{
      const expected_result = [{A: 'Hello World'}]
      return SQLConnector.helloWorld().then(result =>{
        expect(result.recordset).to.deep.equal(expected_result)
      });
    })
    it('Can return SQL and compare to a CSV', ()=>{
      var fileData = CSVParser.fromCSV("dummy.csv");
      var queryData = SQLConnector.dummyQuery();
      return Promise.all([
        queryData, fileData
        // SQLConnector.dummyQuery(),
        // CSVParser.fromCSV("dummy.csv")
      ]).then(results =>{
        expect(results[0].recordset).to.deep.equal(results[1]);
      })
    });
  })
})
