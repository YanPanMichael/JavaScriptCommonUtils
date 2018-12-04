//var csv is the CSV file with headers
const csvToJSON = (csv) => {
  const lines = csv.split("\r\n");
  let result = [];
  const headers = lines[0].split(",");

  for(let i=1; i<lines.length; i++){
	  let obj = {};
	  const currentline = lines[i].split(",");

	  for(let j=0; j<headers.length; j++){
		  obj[headers[j]] = currentline[j];
	  }
	  result.push(obj);
  }
  
  //return result; //JavaScript object
  return JSON.stringify(result); //JSON
}

/*
 * Convert a CSV String to JSON
 */
const csvToJSON2 = (csvString) => {
  let json = [];
  let csvArray = csvString.split("\r\n");

  // Remove the column names from csvArray into csvColumns.
  // Also replace single quote with double quote (JSON needs double).
  let csvColumns = JSON
          .parse("[" + csvArray.shift().replace(/'/g, '"') + "]");

  csvArray.forEach((csvRowString) => {
      const csvRow = csvRowString.split(",");

      // Here we work on a single row.
      // Create an object with all of the csvColumns as keys.
      jsonRow = new Object();
      for ( let colNum = 0; colNum < csvRow.length; colNum++) {
          // Remove beginning and ending quotes since stringify will add them.
          let colData = csvRow[colNum].replace(/^['"]|['"]$/g, "");
          jsonRow[csvColumns[colNum]] = colData;
      }
      json.push(jsonRow);
  });

  return JSON.stringify(json);
};

export {
  csvToJSON,
  csvToJSON2
}