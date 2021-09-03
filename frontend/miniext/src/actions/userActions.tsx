import { ERROR, LOGIN, LOGOUT, REQUEST } from '../constants/constants';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import axios from 'axios';
import { RootState } from '../app/store';
require('dotenv').config();

var Airtable = require('airtable');
var base = new Airtable({ apiKey: '' }).base('app8ZbcPx7dkpOnP0'); // ADD API KEY HERE

export const login = (name: string): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
    async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>): Promise<void> => {
        try {
            const loadState = { name: name, loading: true };

            dispatch({
                type: REQUEST,
                payload: loadState
            })

            // Retrive entered student
            const URL = 'https://api.airtable.com/v0/app8ZbcPx7dkpOnP0/students';
            const query = '?filterByFormula=';
            const filterBy = `SEARCH("${name}", {Name} )`;
            const link = `${URL}${query}${filterBy}`;

            const KEY = ''; // ADD API KEY HERE
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

            let classNames: Array<string> = [];
            let studentIds: Array<Array<string>> = [];
            let otherStudents: Array<Array<string>> = [];
            let zippedData: Array<Array<any>> = [];

            // Swap class codes for class names
            for (let i = 0; i < classes.length; i++) {
                await base('Classes').find(classes[i], function (err: any, record: any) {
                    if (err) { console.error(err); return; }
                    classNames.push(record.fields.Name);
                });
            }

            // Retrieve other student codes per class associated to chosen student
            for (let i = 0; i < classes.length; i++) {
                await base('Classes').find(classes[i], function (err: any, record: any) {
                    if (err) { console.error(err); return; }
                    studentIds.push(record.fields['Students']);
                });
            }

            // Associate other student codes to associated student names. Zip data to send to Reducer.
            setTimeout(async function () {
                for (let i = 0; i < studentIds.length; i++) {
                    let newTempArr: Array<string> = [];
                    for (let j = 0; j < studentIds[i].length; j++) {
                        await base('Students').find(studentIds[i][j], function (err: any, record: any) {
                            if (err) { console.error(err); return; }
                            newTempArr.push(record.fields.Name);
                        });
                    }
                    otherStudents.push(newTempArr);
                }
            }, 500);

            setTimeout(function () {
                for (let i = 0; i < classNames.length; i++) {
                    let newTempArr: Array<any> = [];
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

                const resultData = { zippedData: zippedData, name: name, loading: false };

                dispatch({
                    type: LOGIN,
                    payload: resultData
                });
            }, 1500);

        } catch (err: any) {
            const resultData = { zippedData: [["Name/class do not exist in Airtable database", "Associated students do not exist in Airtable database"]], name: "Error", loading: false };
            setTimeout(function () {
                dispatch({
                    type: LOGIN,
                    payload: resultData
                });
            }, 2000)
        }
    }

export const logout = (): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
    async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>): Promise<void> => {
        try {
            dispatch({
                type: LOGOUT,
                payload: null
            })
        } catch (err: any) {
            dispatch({
                type: ERROR,
                payload: err.response && err.response.data.message ? err.response.data.message : err.message
            })
        }
    }