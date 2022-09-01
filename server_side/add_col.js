
import fs from 'fs';

export const addCol = (colName,colValue) => {
    console.log("inside addCol");
    const data = JSON.parse(fs.readFileSync('data_ex.json'));

    for (var i = 0; i < data.length; ++i) {
        data[i][colName] = colValue;
    }
    //console.log(data)
    const datajson = JSON.stringify(data);
    fs.writeFileSync('data_ex.json',datajson);

    console.log("colName in addCol",colName);
    console.log("colValue in addCol",colValue);
};

export default addCol;









