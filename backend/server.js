require('dotenv').config();

const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    'app8ZbcPx7dkpOnP0'
);

base('Classes').select({
    view: 'Grid view'
}).firstPage(function (err, records) {
    if (err) { console.error(err); return; }
    records.forEach(function (record) {
        console.log('Retrieved', record.get('Name'));
    });
});