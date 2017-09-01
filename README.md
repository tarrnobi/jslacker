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

# Features
## CSV Loading
JSlacker will scan the `artefacts\csv` directory and pull a reference for each file in to the csv object. By calling a function for the file name a promise will be returned that will resolve to the csv data within. For example;

```
File Structure:
artefacts
|-CSV
  |- dummy.csv
  |- leap_years.csv

--------
spike.js:
--------
var js = require('jslacker');

js.csv.leap_years().then((data) => {
  console.log(data);
});
```
Will return the output:
```
[ { Year: '1988', Age: '2' },
  { Year: '1992', Age: '6' },
  { Year: '1996', Age: '10' },
  { Year: '2000', Age: '14' },
  { Year: '2004', Age: '18' },
  { Year: '2008', Age: '22' },
  { Year: '2012', Age: '26' },
  { Year: '2016', Age: '30' } ]
```

## Template Loading
JSlacker allows a parameterised template of code to be created. It will scan the `artefacts\templates` sub-directory for all .sql files and pull them in to a templates object. A template can then be returned from the file and have its parameters intialized as follows:

```
File Structure:
artefacts
|-templates
  |- MyAgeIs.sql
--------
MyAgeIs.sql
--------
DECLARE @MyAge VARCHAR(10) = '$(MyAge)';
SELECT Msg = 'My Age Is: ' + @MyAge;

--------
spike.js
--------
const template = js.templates.MyAgeIs({age: 20});
console.log(template);
```

Will return the output:
```
DECLARE @MyAge VARCHAR(10) = '20';
SELECT Msg = 'My Age Is: ' + @MyAge;
```
