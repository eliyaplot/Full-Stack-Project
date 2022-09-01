import React, { useState, useEffect,useRef } from 'react';
import './App.css';
import logo from "./logo.png";
import ReadAOnlyRow from "./components/ReadOnlyRow";
import EditTableRow from "./components/EditTableRow";
import InfiniteScroll from 'react-infinite-scroll-component';

function App() {
  console.warn = () => {};
  const [ColName, setColName] = useState('');
  const [ColValue, setColValue] = useState('');
  const [headers, setHeaders] = useState([]);
  const [promotions, setPromotions] = useState(JSON.parse("[]"));
  const [num_of_promotions_toload, setNum_of_promotions_toload] = useState(15);
  const [editFormData, setEditFormData] = useState({});
  const [buttonText, setButtonText] = useState('Load Promotions');
  const [num_of_promotions, setNum_of_promotions] = useState(0);

  const resAsJson = useRef(null);
  //request to server for promotions data
  useEffect(() => {
    const t = async () => {
      const res = await fetch('http://localhost:5002/get_promotions')
      resAsJson.current = await res.json()
      setPromotions(resAsJson.current)
      setHeaders(Object.keys(resAsJson.current[0]).slice(1).concat("ACTIONS"))
      setNum_of_promotions(Object.values(resAsJson.current).length)
    }
    t()
  }, [])

  //lazy loading
  const fetchItems = () => {
    setTimeout(() => {
      setNum_of_promotions_toload(num_of_promotions_toload + 10)
    }, 100);
  }

  //EDIT
  //clicking EDIT

  const handleEditClick = (event, val) => {
    console.log("handleEditClick")
    event.preventDefault();
    setEditPromoId(val.id);;
    const formValues = {};
    for (let i =1; i<Object.keys(val).length; i++) { 
      formValues[Object.keys(val)[i]] = Object.values(val)[i];
    }

    setEditFormData(formValues);
    console.log(formValues);
    console.log(editFormData); //empty right now
  };

  //starting to write inside the cell

  const handleEditFormChange = (event) => {
    event.preventDefault();
    console.log("handleEditFormChange")
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue; //assign new values
    //console.log(editFormData) //old values
    console.log(newFormData)
    setEditFormData(newFormData);
  };

  const [editPromoId, setEditPromoId] = useState(null);
  
  //clicking SAVE button

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    console.log("handleEditFormSubmit")
    
    const index = promotions.findIndex((val)=>val.id === editPromoId);
    console.log(editFormData)
    
    //send new values to server
    fetch(`http://localhost:5002/?id=${editPromoId}&editFormData=${JSON.stringify(editFormData)}`, {
      method: 'POST' 
    }).then(() =>{
      console.log("edit-row", index);
    })
    window.location.reload(false);
  };


  //DELETE button

  const handleDeleteClick = async (promoId) => { 
    function deleteAsync(){
      return new Promise((resolve,reject)=>{
        //send req to server  
        fetch(`http://localhost:5002/?id=${promoId}`, {
          method: 'DELETE' 
        }).then(() =>{
        console.log("delete_by_id", promoId);
        })
        setTimeout(()=>{
          console.log("Hello from inside the testAsync function");
          window.location.reload(false); 
          resolve();
        ;} , 1000
        );
      });
    }  
  
    async function callerFun(){
      console.log("Caller");
      await deleteAsync();
      console.log("After waiting");
    }
    callerFun();
  };
    
  //DUPLICATE row
  const handleDupClick = (promoId) => {
    function dupAsync(){
      return new Promise((resolve,reject)=>{
        // send req to server to duplicate row
        fetch(`http://localhost:5002/?id=${promoId}`, {
          method: 'PATCH'
        }).then(() =>{
          console.log("dup_by_id", promoId);
        })
    
        setTimeout(()=>{
          console.log("Hello from inside the testAsync function");
          window.location.reload(false);
          resolve();
      ;} , 100
      );
    });
  }
  
  async function callerFun(){
    console.log("Caller");
    await dupAsync();
    console.log("After waiting");
  }
  callerFun();
};

  //ADD COL
  const handleAddClick = event => {
    function addAsync(){
      return new Promise((resolve,reject)=>{
        console.log("handleAddClick")
        event.preventDefault();
        console.log(ColName)
        console.log(ColValue)
        //send req to server to add col     
        fetch(`http://localhost:5002/?ColName=${ColName}&ColValue=${ColValue}`, {
          method: 'PUT'
        }).then(() =>{
          console.log("adding col request to server", ColName);
        })

        //window.location.reload(false); 
        setColName('')
        setColValue('')

        setTimeout(()=>{
          window.location.reload(false); 
          console.log("Hello from inside the testAsync functionindex");
          resolve();
        ;} , 100
        );
      });
    }
  
  async function callerFun(){
    console.log("Caller index");
    await addAsync();
    console.log("After waiting index");
  }
  callerFun();
};


  //promotions
  const promotions_for_load = promotions.map((val,index) => (
    
    <div key={index}>
      { editPromoId === val.id ? ( 
        <EditTableRow 
        editFormData = {editFormData} 
        handleEditFormChange = {handleEditFormChange} 
        handleEditFormSubmit={handleEditFormSubmit} 
        /> 
      ):

      (
        <ReadAOnlyRow
        val={val}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
        handleDupClick={handleDupClick}
        />
      )
      }     
    </div>        
  )).slice(0,num_of_promotions_toload)

  //loader message
  const loader = (
    <div key="loader" className="loader">
      <h2>Loading ...</h2>
    </div>
  );

  //load promotions button
  const handleLoadClick = () => {
    function testAsync(){
      setButtonText('Loading...');
      return new Promise((resolve,reject)=>{
        fetch(`http://localhost:5002/`, {
          method: 'GET' 
        }).then(() =>{
          console.log("load promotions");
        })
        setTimeout(()=>{
          console.log("Hello from inside the testAsync function");
          window.location.reload(false); 
          resolve();
        ;} , 1000
        );
      });
  }
      async function callerFun(){
      console.log("Caller");
      await testAsync();
      console.log("After waiting");
      }
      callerFun();
  };


  return (
  <div className="App">
  <div className="image-container">
  <img src={logo}></img>
  <button type = "button" className = 'center' onClick={() => handleLoadClick()}> {buttonText} </button>
  </div>
  <h1>Promotions</h1>
  <p className='top_right'>Promotions Counter: {num_of_promotions}</p>
  <div className = "topcorner">
  <fieldset>
  <h2>Columns Controller</h2>
    <form onSubmit = {handleAddClick}>
      <label>
        <p className = 'p_col'>Column Name</p>
        <input
        required = "required"
        id = "column_name"
        name = "column_name"
        type = "text"
        onChange = {event => setColName(event.target.value)}
        value = {ColName}
        />
      </label>
      <label>
        <p className='p_col'>Default Value</p>
        <input
        required = "required"
        id = "column_value"
        name = "column_value"
        type = "text"
        value = {ColValue}
        onChange = {event => setColValue(event.target.value)}
        />
      </label>
    <button type = "submit">Add</button>
    </form>
  </fieldset>
  </div>
      
  <div className='table_div'>
    <table>
      <thead>
        <tr>
          {
         headers.map(header => {
          return <th>{header.toUpperCase()}</th>
        })
        }
        </tr>
      </thead>  
    </table>
    <InfiniteScroll
        next = {fetchItems}
        hasMore = {promotions_for_load.length<promotions.length}
        loader = {loader}
        dataLength = {promotions_for_load.length}
        endMessage = {
          <p style={{ textAlign: 'center' }}>
            <b>....</b>
          </p>
        }
        >
        {promotions_for_load}
    </InfiniteScroll>
    </div>
    </div>
  );
}

export default App;