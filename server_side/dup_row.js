
import fs from 'fs';

export const dupFromJson = (id) => {
    console.log("inside dupFromJson");
    const data = JSON.parse(fs.readFileSync('data_ex.json'));
    const index = data.findIndex(obj =>obj.id == id)
    if (index == -1){
        return;
    }
    const dup_object =  JSON.parse(JSON.stringify(data[index]));//deep copy
    dup_object.id = data[index]['id'] + Date.now();
    const tempAraay = [dup_object];
    const dup_data = tempAraay.concat(data);
    const datajson = JSON.stringify(dup_data);
    fs.writeFileSync('data_ex.json',datajson);

    console.log("dup_object",dup_object);
};

export default dupFromJson;









