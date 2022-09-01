import fs from 'fs';
import main from './MongoDB.js'

export const generateJSON = () => {

    const promoName = ["SmallPromo","MediumPromo", "BigPromo", "XLPromo"]
    const typeArray = ["Basic","Common","Epic"]
    let temp = []
    const data = JSON.parse(fs.readFileSync('data_ex.json'))

    for (let i = 0; i < 10000; i++) {

        let ranType = Math.floor(Math.random() * 3);
        let ranPromo = Math.floor(Math.random() * 4);
        let ranDay = Math.floor(Math.random() * 30) + 1;
        let ranMonth = Math.floor(Math.random() * 12) + 1;
        
        let dup_object =  JSON.parse(JSON.stringify(data[0]));

        dup_object.id = i;
        dup_object.promotion_name = promoName[ranPromo] + Math.floor(Math.random() * 11);
        dup_object.type = typeArray[ranType];
        dup_object.start_date = (ranDay) +"."+(ranMonth) +".2022";
        dup_object.end_date = (ranDay + 1) +"."+(ranMonth) +".2022";
        dup_object.group_name = Math.floor(Math.random() * 5) + 1;

        temp = temp.concat(dup_object);
    }
        
    //console.log(temp)
    const datajson = JSON.stringify(temp);
    fs.writeFileSync('data_ex.json',datajson);

    //saving into mongoDB
    //main().catch(console.error);



};
export default generateJSON;

