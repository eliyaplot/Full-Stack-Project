import fs from 'fs';

export const EditFromJson = (id,editFormData) => {
   console.log("reached Edit");
   
   const formData = JSON.parse(editFormData)
   const data = JSON.parse(fs.readFileSync('data_ex.json'));
   const index = data.findIndex(obj =>obj.id == id)

   for (let j = 0; j < Object.keys(formData).length; j++) {
   const col_name = Object.keys(formData)[j]
   data[index][col_name] = Object.values(formData)[j];
   //console.log(col_name)
   }

   const datajson = JSON.stringify(data);
   fs.writeFileSync('data_ex.json',datajson);
   
   console.log("index",index)
   console.log("editFormData",editFormData);
   console.log("formData",formData);

};

export default EditFromJson;







