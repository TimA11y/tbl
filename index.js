#!/usr/bin/env node
const exec = require("child_process").exec;
const fs = require("fs");
const program = require("commander");
const os = require("os");

const EOL = os.EOL;

program
  .version("1.0")
  .option("-c, --columns [columns]", "Determines how many columns will be in the table.  The default is 3.")
  .option("-r, --rows [rows]", "Determines how many rows will be in the table.  The default is 3 rows.")
  .parse(process.argv);

let columns = 3;
let rows = 3;

if (program.columns) {
  columns = parseInt(program.columns);
} else {
  columns = 3;
} // end if else.

if (program.rows) {
  rows = parseInt(program.rows);
} else {
  rows = 3;
} // end if else.

console.log(`Columns: ${columns}, Rows: ${rows}`);

let table = `<table>${EOL}`;

for (let x = 0; x < columns; x++) {
  table = table + `  <tr>${EOL}`;
  for (let y = 0; y < rows; y++) {
    if (x === 0) {
      table = table + `    <th scope="col"></th>${EOL}`;
    } else if (y === 0) {
      table = table + `    <th scope="row"></th>${EOL}`;
    } else {
      table = table + `    <td></td>${EOL}`;
    } // end if else if else.
  } // end y.
  table = table + `  </tr>${EOL}`;
} // end x.
table = table + `</table>${EOL}`;

fs.writeFileSync(`${__dirname}/temp.txt`, table, {encoding: "utf8"});

let cmd = `type ${__dirname}\\temp.txt | clip`;
exec(cmd, function (err, stout, stderr) {
  if (err) {
    console.log(`${err}: ${stderr}`);
  } // end if
});