const fs = require('fs');
const partition = require('lodash.partition');

const sourceFileName = process.argv[2];

const matchFilename = (item) => item.Filename.toUpperCase().includes('.PDF');

let initialObject = JSON.parse(fs.readFileSync(`./TestFiles/${sourceFileName}-parsed.json`, 'utf8'));

const itemsToFilter = initialObject.unfilteredItems || initialObject;
const [ matchedItems, unmatchedItems ] = partition(itemsToFilter, matchFilename);

console.log(`Filter: .pdf, Total: ${itemsToFilter.length}, Matched: ${matchedItems.length}, Unmatched ${unmatchedItems.length} `);

if (!initialObject.unfilteredItems) { initialObject = { 
    unfilteredItems: [],
    pdfs: [],
}};

initialObject.unfilteredItems = unmatchedItems;
initialObject.pdfs = matchedItems;

console.log(`unfilteredItems: ${initialObject.unfilteredItems.length}, pdfs: ${initialObject.pdfs.length},`);
fs.writeFileSync(`./ResultFiles/${sourceFileName}/unfilteredItems.json`, JSON.stringify(initialObject.unfilteredItems, null, 2), {encoding: "utf8"});
fs.writeFileSync(`./ResultFiles/${sourceFileName}/pdfs.json`, JSON.stringify(initialObject.pdfs, null, 2), {encoding: "utf8"});
