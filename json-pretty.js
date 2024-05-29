const fs = require('fs');
const fileName = 'Account-parsed';

const jsonstring = fs.readFileSync(`./${fileName}.json`, 'utf8');
const json = JSON.parse(jsonstring);
const out = JSON.stringify(json, null, 2);
fs.writeFileSync(`./${fileName}.json`, out, {encoding: "utf8"});
