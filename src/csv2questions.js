/*
 *   Copyright (c) 2021 
 *   All rights reserved.
 */
const fs = require('fs');
const csv = require('csvtojson')
csv({
    noheader: true,
    delimiter: ";"
}).fromFile('./miko-hispanski-1.csv')
    .then((jsonObj) => {
        const output = jsonObj.map(({ field1, field2 }, index) => ({
            "id": index,
            "instruction_text": field2,
            "answer": field1
        }));
        const data = {
            "quiz_questions": output
        };
        fs.writeFileSync('./quiz_data.json', JSON.stringify(data));
        /**
         * [
         * 	{a:"1", b:"2", c:"3"},
         * 	{a:"4", b:"5". c:"6"}
         * ]
         */
    })