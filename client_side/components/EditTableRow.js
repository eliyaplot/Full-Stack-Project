import React from "react";

const EditTableRow = ({ editFormData, handleEditFormChange, handleEditFormSubmit }) => {
    return (
        <form onSubmit={handleEditFormSubmit}>
        <table> 
            
        <tbody> 
        <tr>
        {promo(editFormData,Object.keys(editFormData).length,handleEditFormChange)}
        <td>
            <button type = "submit">
                Save
            </button>
        </td>         
        </tr>
        </tbody>
           
        </table>
        </form>
    );
};
export default EditTableRow;

const promo = (editFormData,length,handleEditFormChange) => { 

   let arr = new Array(length)
   for(let i = 0;i<length;i++){
        const name = Object.keys(editFormData)[i]
        arr[i] = <td className="td_edit">
                <input type="text" required="required" name={name} value={Object.values(editFormData)[i]} onChange={handleEditFormChange}></input>
                </td>
   }
   return [arr]
}

