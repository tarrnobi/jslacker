# JSlacker
JS Implementation of Slacker Unit Tests for SQL Server (Ruby).


Intent:
  Basic Matching:
    - be able to run a basic parameterized query and compare it to JSON representations of the recordset
    - be able to run a basic parameterized query and compare it to a CSV
    - be able to wrap sets of tests in a transaction that is rolled back once completed.
  - be able to do expect(jslacker.query("SELECT A=1")).to.deep.equal(jslacker.fromCSV("dummy.csv"))
  - be able to do expect(jslacker.templates.get_people({age: 10}))
query().. will return a JSON object representing the query result set
[{a:1}]
fromCSV will return an array of JSON rows from the CSV
[{a:1}]
