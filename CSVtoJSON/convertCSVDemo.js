const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'csvfile.csv');

//read csv file
let f = fs.readFileSync(filePath, {encoding: 'utf-8'},
  function(err){console.log(err);});

//split on row
f = f.split('\n');

//get first row for column headers
//const headers = f.shift().split(", "); //split() shift() splice(2, 0, 'add')

let json = [];
f.forEach(function(d){
  //loop through each row
  let tmp = {};
  let row = d.split(', ');
  tmp[row[0]] = row[1];

  //add object to list
  json.push(tmp);
});

const outPath = path.join(__dirname, 'jsonResult.json');
//convert object to string, and write json to file
fs.writeFileSync(outPath, JSON.stringify(json), 'utf8',
  function(err){console.log(err);});