# JSlacker
JS Implementation of Slacker Unit Tests for SQL Server (Ruby).


Intent:

be able to do expect(query("SELECT A=1")).to.equal(jslacker.fromCSV("dummy.csv"))

query().. will return a JSON object representing the query result set
[{a:1}]
fromCSV will return an array of JSON rows from the CSV
[{a:1}]
