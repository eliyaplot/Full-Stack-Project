import fs from 'fs';

export const deleteFromJson = async (id) => {
    console.log('inside deleteFromJson');
    const data = JSON.parse(fs.readFileSync('data_ex.json'));
    const index = data.findIndex(obj =>obj.id == id)
    if (index == -1){
        return;
    }

    data.splice(index,1);
    const datajson = JSON.stringify(data);
    fs.writeFileSync('data_ex.json',datajson);

    console.log("index",index);
    console.log("id",id);
    //console.log(data);

};

export default deleteFromJson;





