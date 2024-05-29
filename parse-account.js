const fs = require('fs');
const partition = require('lodash.partition');

const fileName = 'Account-parsed';
const testMode = false;

const filtersOrder = [
    'certificatesSafe',
    'otherSafe',
    'reportsSafe',
    'other',
    'reports',
    'certificates',
    'zips',
];

const filters = {
    certificatesSafe: [
        '- Headline -',
    ],
    certificatesUnsafe: [
    ],
    certificates: [
        '- Additional Sites',
        '- Additional Site',
        '- Upgrade Site',
        '- New Annex',
        '- New Site',
        '- Headline',
        '-  Headline',
        '- Annex',
        'Certitficate',
        'Certificate',
        'Certifcate',
        'Certficate',
        'Certfcate',
        'SERTIFIKAT',
        ' Cert Issue',
        'Site Cert',
        '- Certs',
        '- Cert',
        ' Certs',
        ' Cert',
        'Cert, ',
        'ISO 45003',
        'ISO45003',
        'ISO-45003',
        'ISO 20000',
        'ISO20000',
        'ISO-20000',
        'ISO 22301',
        'ISO22301',
        'ISO-22301',
        'ISO 50000',
        'ISO50000',
        'ISO-50000',
        'ISO 50001',
        'ISO50001',
        'ISO-50001',
        'ISO 41001',
        'ISO41001',
        'ISO-41001',
        'ISO 27701',
        'ISO27701',
        'ISO-27701',
        'ISO 22716',
        'ISO22716',
        'ISO-22716',
        'ISO 22000',
        'ISO22000',
        'ISO-22000',
        'ISO 9002',
        'ISO9002',
        'ISO-9002',
        'ISO 9001',
        'ISO9001',
        'ISO-9001',
        'ISO 20000',
        'ISO20000',
        'ISO-20000',
        'ISO 55001',
        'ISO55001',
        'ISO-55001',
        'ISO 27017',
        'ISO27017',
        'ISO-27017', 
        'ISO 27018',
        'ISO27018',
        'ISO-27018',
        'EN 1090',
        'EN1090',
        'EN-1090',
        'BS 10012',
        'BS10012',
        'BS-10012',
        'PAS 3002',
        'PAS3002',
        'PAS-3002',
        'NHSS',
        'BAFE',
        '45001',
        '45003',
        '27701',
        '27001',
        '55001',
        '50001',
        '20000',
        '41001',
        '22301',
        '22000',
        '18001',
        '14001',
        '10012',
        '1090',
        '9001',
        '- Site',
        'Site.',
        '- Sites',
        'Sites.',
        '- SSIP',
        'SSIP.',
        '- New',
        'Additional sites',
        'Additional site',
        'Addtional Sites',

        // 'change in adress.pdf' - is letter

        // 'site 2.pdf', 'site 3.pdf', 'site 4.pdf'

        // '- 001.docx', '- 001.pdf'

        // 'Site 002.docx', 'Site 002.pdf'
        // ' 002.pdf', '- 002.pdf'
        // '(002).pdf' - caught at least one report
        
        // 'OHS.pdf', 'EMS QMS.pdf', 'QMS EMS.pdf', 'EMS HAS QMS.pdf'
        // 'EMS-001.doc'

        // 'Site annex,', 'Site annex' 
        // 'site .pdf'

        // 'Annex -'
        // 'Annex, '

        // 'QMS Annex', 'OHS Annex', 'EMS Annex'


        // '- 2022 Annex -'

        // '- Recertification.docx', '- Recertification.pdf' - catches at least 1 report

        // '- reissue .pdf', '- Reissue.docx', '- Reissue.pdf'

        // '- Appendixes -', 'Appendix.docx', 'Appendix.pdf'

        // '- Upgrade.docx', '- Upgrade.pdf'
        // '- Change in Name.docx', '- Change in Name.pdf', 
        // '- Change of Address.docx', '- Change of Address.pdf', '- Change of Address .docx', '- Change of Address .pdf'

        // '9474 Euro Environmental Group Limited ANnex 14 9.doc'
        // '9474 Euro Environmental Group Limited Annex 14 9.pdf'
        // 'Annex Following Site Dereg.docx', 'Annex Following Site Dereg.pdf'

        '- ISO Headline -', 
        '- ISO Annex -',
        'Recertification 2021 pdf.pdf',
        'Recertification 2021.pdf',
        'Recertification 2021.docx',
        '27017 and 27108.pdf',
        'Recert 2022.pdf',
        '2022 Recert.zip',
        'Reissue 2022.zip',
        'Recert 2023.pdf',
        '2023 Recert.zip',
        'Reissue 2023.zip',
        '- Change of Address Reissue-',
        '- Accredited Headline -',
        '- Address Change Headline -',
        '- Upgrade Annex -',
        '- Upgrade Headline -',
        'Headline    .pdf',
        'Headline .pdf',
        'Headline.pdf',
        'Headline.docx',
        'Headline -',
        'Annex .pdf',
        'Annex.pdf',
        'Annex.docx',
        'Annex1.docx',
        'headline and annex.zip',

        "_Cert_",
        "Cert_",
        "_Cert_Annex",
        "Cert_Annex",
        "Cert_2019",
        "Cert_2020",
        "Cert_2021",
        "Cert_2022",
        "Cert_2023",
        "Certyfikat",
        "- CHANGE OF NAME -",
        "Cert OHS",
        "Cert QMS",
        "Cert EMS",
        "Headline",

        // 'QMS.docx'
        // - EMS -
        // - QMS -
        
        
        // 'Certs',
        // 'Cert',
        // ' Reissue' - might get other stuff?
        // ' Recertification' - might get other stuff?, gets letters too
        // ' Recert' - might get other stuff?
        // 'Change in Name' - might get other stuff?
        // 'Change of Address' - might get other stuff?
        // 'Headline',
        // 'Annex',
    ],
    reportsSafe: [
        'Surveillance and',
        'and Recert Planning',
        '- Surveillance -',
        '- Surv -',
        '- Surveillance',
        '- Surv',
        '_Surv',
        '- Sur',
        '_Sur',
        'Remote Audit Feasibility',
        
    ],
    reports: [
        'AMENDED REPORT',
        'Feesability Report',
        'Feasibility Report',
        'corrective action report',
        'Corrective Action',
        'Corrective_Action',
        'Report KQF',
        'ETS Report',
        'report-template',
        'audit report',
        'auditreport',
        'audit_report',
        'test report',
        'testreport',
        'test_report',
        'report_final',
        'Updated Report -',
        'Report - ',
        ' Report-',
        'Report – ',
        'Report-',
        'Report -',
        'Reports -',
        'Report 2024 - ',
        'Report 2023 - ',
        'Report 2022 - ',
        'Report 2021 - ',
        'Report 2020 - ',
        'Report 2019 - ',
        'Report 2018 - ',
        'Report 2017 - ',
        'Report 2016 - ',
        'Report 2015 - ',
        'Report 2014 - ',
        'Report 2013 - ',
        'Report 2012 - ',
        'Report 2011 - ',
        'Report 2010 - ',
        'Report.pdf',
        'Report.docx',
        'Report.doc',
        'Report',

        
        'Remote Audit',
        'Audit Schedule',
        'Audit - ',
        // 'Audit',
        'Stage 1',
        'Stage1',
        'Stage_1',
        'Stage-1',
        'Stage 2',
        'Stage2',
        'Stage_2',
        'Stage-2',

        'Review Confirmed Scopes',
        'Review',
        'Attendance',
        'Surveillance',
        'OVERSEAS AUDIT',
        'OVERSEAS_AUDIT',
        'OVERSEAS-AUDIT',
        'AUDIT SUMMARY',
        'AUDIT-SUMMARY',
        'AUDIT_SUMMARY',
        'AUDIT _SUMMARY',

        "Audit Doc",
        "Surv01",
        "Surv-01",
        "Surv 01",
        "Surv02",
        "Surv-02",
        "Surv 02",
        "Surv03",
        "Surv-03",
        "Surv 03",
        "Executive Summary",
        "audit_raport",
        "audit raport",
        "RAPPORTO",

        '<DOTTED_DATE>',
    ],
    zips: [
        '.zip',
    ],
    otherSafe: [
        '.xlsx',
        '.xls',
        '.msg',
        '.txt',
        '.htm',
        'Initial Registration Letter',
        'INITIAL REG LETTER',
        'Registration Letter',
        'Transfer Letter',
        'Reissue Letter',
        'Re-issue Letter',
        'Recert Letter',
        'Recertification Letter',
        'New Certificates Letter',
        'Extension to Scope Letter',
        'ETS Letter',
        'ETS  Letter',
        'Address change Letter',
        'Change of Address Letter',
        'New Address Letter',
        'Name change letter',
        'Change of Name letter',
        'New Name Letter',
        'Change of Name and Address Letter',
        'Change Of Address and Name Letter',
        'Certification Letter',
        'Minor Change of Scope Letter',
        'Change of Scope Letter',
        'New Scope Letter',
        'Letter of Intent',
        'Letter of Recertification',
        'Letter of Certification',
        'Certificate Letter',
        'Certificate Issue Letter',
        'Apology letter',
        'Upgrade Letter',
        'Initial letter',
        'Extra Standard Letter',
        'Additional Standard Letter',
        'Reinstatement Letter',
        'Covering Letter',
        'Dereg Letter',
        'BS EN 1090 Letter',
        'audit letter',
        'Cert Letter',
        '9001 Letter',
        '27001 Letter',
        '- Letter',
        ' Latter',
        'Letter.pdf',
        'Letter.docx',
        'Letter.doc',
        'Letter,',
        'Letterhead.docx',
    ],
    other: [
        'checklist',
        'Change of name form',
        'Recert planning',
        'ReCertPlan',
        'Recertification Planning Review',
        'Recertification Planning Form',
        'Recertification Planning',
        'Planning Form',
        'audit review form',
        'Planning Review',
        'review comments',
        'Application review',
        'ApplicationReview',
        'App review',
        'AppReview',
        'Audit plan',
        'Audit_plan',
        'Audit Schedule',
        'AuditSchedule',
        'Audit-Schedule',
        'Audit_Schedule',
        'Application Form',
        'ApplicationForm',
        'App Form',
        'AppForm',
        'ISOQAR Questionnaire',
        'ISOQARQuestionnaire',
        'Questionnaire Signed',
        'QuestionnaireOnly',
        'Client Questionnaire',
        'QuotationAuthorisationForm',
        'QuoteOnly',

        'Letter',
        'New Address or Name',
        'Deregistration',
        'De-registration',
        'De_registration',
        'Minor Change of Scope',
        'Questionnaire',
        'quotation',
        'Next visit',
        'Next_visit',
        'Next-visit',
        'logbook',
        'audit review',

        ".onetoc2",
        ".one",
        ".onebak",
        ".mht",
        ".odt",
        ".jpg",
        ".jpeg",
        "Press release",
        "Auditor note",
        "Audit Notes",
        "Audit_nots",
        "Audit nots",
        "Inspection Record",
        "Log book",
        "Training Record",
        "QUESTIONARIO",
        "quotazione",
        "Recert and Upgrade",
        "VISIT PLAN",
        "De-regsitration form ",
        "Deregsitration form ",
        "Dereg form ",
        "De-reg.pdf",
        "Alcumus Application",
        "Application Form",
        "Application_Form",
        "Application From",
        "Application.pdf",
        "Application ",
        "New name form",
        "New address form",
        "Change of name application",
        "Change of address application",
        "Change of name and address application",
        "Change of address form",
        "Change of name form",
        "Change of name and address form",
        "Change of name and address",
        "Postponement",
        "attedance",
        "Signed Contract",
        "Application Documents",
        "Pre Audit Docs",
        "Pre-audit docs",
        "Visit Plan",
        "Sales Handover",
        "Signed App",
        "Visit1",
        "Visit 1",
        "Visit2",
        "Visit 2",
        "Visit3",
        "Visit 3",
        "Visit4",
        "Visit 4",
        "Visit5",
        "Visit 5",
        "Visit6",
        "Visit 6",
        "Visit7",
        "Visit 7",
        "Visit8",
        "Visit 8",
        "Visit9",
        "Visit 9",
        "Proposal",
        "Purchase",
        "Evidence",
        "Contract",
        "NOTES",
        "- Change of Name - ",
        'New Address Certificate.pdf',

        'Change of Name - AME Group Associates Limited',
        'Change of Scope - UK Forks.pdf',
        '10352 - Stonepack Ltd - Change of Scope.pdf',
        '12550 - Blease Engineering Limited - ISO 9001 Change of Scope.pdf',
        'Blue Chyp Limited Change of Address.docx',
        'Change Of Address - Citi Logik.pdf',
        'Change of Address - RSP Consulting Engineers LLP.docx',
        '19494 - New Address',
        '21080 - SPLHV Limited - ISO 9001 New Address and name.pdf',
        'New Address - Ontrack International Ltd',
        'New Address - Curo Construction Ltd.pdf',
        'New Address Likezero Limited 21027.pdf',
        
        // 'New Address', - might get other stuff?
        // 'change in adress', - might get other stuff?
        // 'Change of Address' - might get other stuff?
        // 'Change of Name', - might get other stuff?
    ],
}

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
        
        let initialObject = JSON.parse(fs.readFileSync(`./${fileName}.json`, 'utf8'));
        console.log(`initialObject: ${initialObject.length}`);
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
    
        fs.writeFileSync(`./${fileName}.json`, out, {encoding: "utf8"});
    })
});

















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