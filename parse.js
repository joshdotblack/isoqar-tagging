const fs = require('fs');
const partition = require('lodash.partition');

const sourceFileName = process.argv[2];
const testMode = !!process.argv[3];

const filters = require(`./${sourceFileName}-filters.json`);

const filtersOrder = [
    'certificatesSafe',
    'otherSafe',
    'reportsSafe',
    'other',
    'reports',
    'certificates',
    'zips',
];

// const filterName = filters[filterType][filterIndex];

// if (!filterName) { throw Error('No filter index supplied or filter out of bounds'); }

const matchDateDottedFile = (item) => { 
    const filename = item.Filename;
    const substring = filename.slice(-27);
    if ((substring.includes('.17') || substring.includes('.18') || substring.includes('.19') || substring.includes('.20') || substring.includes('.21') || substring.includes('.22') || substring.includes('.23')) && (substring.includes('.pdf') || substring.includes('.doc') )) { 
        return true;
    } else {
        return false;
    }
}

const getFilterTypeGroup = (filterType) => { 
    if (filterType == 'otherSafe' || filterType == 'other') return 'other';
    if (filterType == 'reportsSafe' || filterType == 'reports') return 'reports';
    if (filterType == 'certificatesSafe' || filterType == 'certificates') return 'certificates';
    if (filterType == 'zips' ) return 'zips';
}

// const filterType = process.argv[2];

filtersOrder.forEach(filterType => {
    const filterGroup = filters[filterType];
    filterGroup.forEach(filterName => {
        const filterNameUppercase = filterName.toUpperCase();
    
        const matchFilename = (item) => item.Filename.toUpperCase().includes(filterNameUppercase);
        
        let initialObject = JSON.parse(fs.readFileSync(`./TestFiles/${sourceFileName}-parsed.json`, 'utf8'));
        let filterFunction = filterName == '<DOTTED_DATE>' ? matchDateDottedFile : matchFilename;
    
        const itemsToFilter = initialObject.unfilteredItems || initialObject;
        const [ matchedItems, unmatchedItems ] = partition(itemsToFilter, filterFunction);
    
        console.log(`Filter: ${filterType} ${filterName}, Total: ${itemsToFilter.length}, Matched: ${matchedItems.length}, Unmatched ${unmatchedItems.length} `);

        if (testMode) {
            if (!initialObject.unfilteredItems) { initialObject = {}; }
            if (!initialObject.otherSafe) { initialObject.otherSafe = {} };
            if (!initialObject.other) { initialObject.other = {} };
            if (!initialObject.reportsSafe) { initialObject.reportsSafe = {} };
            if (!initialObject.reports) { initialObject.reports = {} };
            if (!initialObject.certificatesSafe) { initialObject.certificatesSafe = {} };
            if (!initialObject.certificates) { initialObject.certificates = {} };
            if (!initialObject.certificatesUnsafe) { initialObject.certificatesUnsafe = {} };
            if (!initialObject.zips) { initialObject.zips = {} };
        
            initialObject.unfilteredItems = unmatchedItems;
            initialObject[filterType][filterName] = matchedItems; 
        } else {
            const filterTypeGroup = getFilterTypeGroup(filterType);

            if (!initialObject.unfilteredItems) { initialObject = { 
                unfilteredItems: [],
                other: [],
                reports: [],
                certificates: [],
                zips: [],
            }};
    
            initialObject.unfilteredItems = unmatchedItems;
            initialObject[filterTypeGroup] = initialObject[filterTypeGroup].concat(matchedItems);
        }
    
        const out = JSON.stringify(initialObject, null, 2);
    
        fs.writeFileSync(`./TestFiles/${sourceFileName}-parsed.json`, out, {encoding: "utf8"});
    })
});

if (!testMode) {
    let finalObject = JSON.parse(fs.readFileSync(`./TestFiles/${sourceFileName}-parsed.json`, 'utf8'));
    console.log(`unfilteredItems: ${finalObject.unfilteredItems.length}, other: ${finalObject.other.length}, reports: ${finalObject.reports.length}, certificates: ${finalObject.certificates.length}, zips: ${finalObject.zips.length},`);
    fs.writeFileSync(`./ResultFiles/${sourceFileName}/unfilteredItems.json`, JSON.stringify(finalObject.unfilteredItems, null, 2), {encoding: "utf8"});
    fs.writeFileSync(`./ResultFiles/${sourceFileName}/other.json`, JSON.stringify(finalObject.other, null, 2), {encoding: "utf8"});
    fs.writeFileSync(`./ResultFiles/${sourceFileName}/reports.json`, JSON.stringify(finalObject.reports, null, 2), {encoding: "utf8"});
    fs.writeFileSync(`./ResultFiles/${sourceFileName}/certificates.json`, JSON.stringify(finalObject.certificates, null, 2), {encoding: "utf8"});
    fs.writeFileSync(`./ResultFiles/${sourceFileName}/zips.json`, JSON.stringify(finalObject.zips, null, 2), {encoding: "utf8"});
}


















// try {
//     // Second run through filtering
//     const unfilteredItems = initialObject.unfilteredItems;
//     const [ iso9001, filteredItems ] = partition(initialObject, (item) => item.Filename.includes(filters[filterIndex]));

//     const out = JSON.stringify({ filters[filterIndex]: iso9001, unfilteredItems: filteredItems });
//     fs.writeFileSync('./Work-Order-0-parsed.json', out, {encoding: "utf8"})
// } catch {
//     // First run through filtering
//     const unfilteredItems = initialObject;
//     const [ iso9001, filteredItems ] = partition(initialObject, (item) => item.Filename.includes(filters[filterIndex]));

//     const out = JSON.stringify({ filters[filterIndex]: iso9001, unfilteredItems: filteredItems });
//     fs.writeFileSync('./Work-Order-0-parsed.json', out, {encoding: "utf8"})
// }



// const iso9001 = initialObject.filter(item => {
//     const matchesFilter = item.Filename.includes('9001');
//     if (matchesFilter) initialObject

//     return matchesFilter;
// });
// const iso9001IDs = iso9001.map(item => item.ID);



// iso9001.forEach(item => initialObject.find(element));

// console.log(initialObject.length);
// console.log(iso9001.length);
// console.log(filtered.length);

// iso9001.map

// console.log(obj[0]);