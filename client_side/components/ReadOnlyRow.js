import React from "react";

const ReadOnlyRow =  ({ val, handleEditClick, handleDeleteClick, handleDupClick}) => {

    const options = [
        { label: '', value: '' },
        { label: 'Edit', value: 'Edit' },
        { label: 'Delete', value: 'Delete' },
        { label: 'Duplicate', value: 'Duplicate' },
      ];
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
        console.log(event.target.value)
        if (event.target.value == 'Edit'){
            console.log("lets edit")
            handleEditClick(event, val)
        }
        else if (event.target.value =='Delete'){
            console.log("lets delete")
            handleDeleteClick(val.id)
        }
        else if (event.target.value =='Duplicate'){
            console.log("lets dup")
            handleDupClick(val.id)
        }
    };
    return (
        
        <table>
        <tbody>
        <tr> 
        {promo(val,Object.keys(val).length)}

        <td>
        <select value={value} onChange={handleChange} >
            {options.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
        </td>

        </tr>
        </tbody>
        </table>  
    );
};
export default ReadOnlyRow;

const promo = (val, length) => { 
    let arr = new Array(length)
    for(let i = 0; i < length - 1; i++){
        arr[i] = <td>{Object.values(val)[i+1]}</td>
    }
    return [arr]
}


