import express  from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import fs from 'fs';
import deleteFromJson from './delete_row.js'
import dupFromJson from './dup_row.js'
import EditFromJson from './edit_row.js'
import addCol from "./add_col.js";
import generateJSON from "./generateJSON.js";

const app = express();

//setups
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(cors()); //security

//server will listem to port 5002
app.listen(5002, function () {
  console.log('App listening on port 5002!');
});

//only relevant lines from json will load into react
app.get('/get_promotions', (req, res) => {
  console.log("in get_promo")
  const data = JSON.parse(fs.readFileSync('data_ex.json'));
  res.send(data);
})

//delete request
app.delete('/', (req, res) => {
  console.log("before sending to deleteFromJson")
  deleteFromJson(req.query.id);
  console.log(req.query.id)
})

//update request 
app.post('/', (req, res) => {
  console.log("before sending to EditFromJson")
  EditFromJson(req.query.id,req.query.editFormData);
  console.log("id",req.query.id)
  console.log(req.query.editFormData)
})

//duplicate request 
app.patch('/', (req, res) => {
  console.log("before sending to dupFromJson")
  dupFromJson(req.query.id);
  console.log(req.query.id)
})

//add col request
app.put('/', (req, res) => {
  console.log("before sending to addCol")
  addCol(req.query.ColName,req.query.ColValue);
  console.log(req.query.ColName)
  console.log(req.query.ColValue)
})

//load promotions request
app.get('/', (req, res) => {
  console.log("load promotions request generateJSON")
  generateJSON()
})





