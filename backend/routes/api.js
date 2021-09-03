require('dotenv').config();

const express = require('express');
const router = express.Router();
const axios = require('axios');
const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    'app8ZbcPx7dkpOnP0'
);

router.get('/:name', async (req, res) => {
    try {
        // Retrieve entered student
        res.setHeader('Access-Control-Allow-Origin', '*');
        const URL = 'http://api.airtable.com/v0/app8ZbcPx7dkpOnP0/students';
        const query = '?filterByFormula=';
        const filterBy = `SEARCH("${req.params.name}", {Name} )`;
        const link = `${URL}${query}${filterBy}`;

        const KEY = process.env.AIRTABLE_API_KEY;
        const headers = {
            headers: {
                Authorization: `Bearer ${KEY}`
            }
        }

        const { data } = await axios.get(`${link}`, headers);
        const records = data.records;
        console.log("Object by record:", records);

        const classes = records[0].fields['Classes'];
        console.log("Classes by record:", classes);

        let classNames = [];
        let studentIds = [];
        let otherStudents = [];
        let zippedData = [];
        let resultData;

        // Swap class codes for class names
        for (let i = 0; i < classes.length; i++) {
            base('Classes').find(classes[i], function (err, record) {
                if (err) { console.error(err); return; }
                classNames.push(record.fields.Name);
            });
        }

        // Retrieve other student codes per class associated to chosen student
        for (let i = 0; i < classes.length; i++) {
            base('Classes').find(classes[i], function (err, record) {
                if (err) { console.error(err); return; }
                studentIds.push(record.fields['Students']);
            });
        }

        // Associate other student codes to associated student names. Zip data to send to Reducer.
        setTimeout(async function () {
            for (let i = 0; i < studentIds.length; i++) {
                let newTempArr = [];
                for (let j = 0; j < studentIds[i].length; j++) {
                    base('Students').find(studentIds[i][j], function (err, record) {
                        if (err) { console.error(err); return; }
                        newTempArr.push(record.fields.Name);
                    });
                }
                otherStudents.push(newTempArr);
            }
        }, 700);

        setTimeout(function () {
            for (let i = 0; i < classNames.length; i++) {
                let newTempArr = [];
                newTempArr.push(classNames[i]);
                for (let j = 0; j < otherStudents[i].length; j++) {
                    newTempArr.push(otherStudents[i][j] + ", ");
                }
                zippedData.push(newTempArr);
            }
        }, 1000);

        setTimeout(function () {
            console.log("Class names: ", classNames);
            console.log("Records of other students by class:", studentIds);
            console.log("Records of other student names:", otherStudents);
            console.log("Zipped array:", zippedData);

            resultData = { zippedData: zippedData, name: req.params.name.toString(), loading: false };
            console.log(resultData);
            res.send(resultData);
        }, 1010);
    } catch (err) {
        return res.send({ zippedData: [["Name/class do not exist in Airtable database", "Associated students do not exist in Airtable database"]], name: "Error", loading: false });
    }
})

module.exports = router;