const axios = require('axios');
const product = require('../models/product.model'); 
const myBaseURL = require('../config/database');


  const create = async(key, data) => {
		instance.post(`${myBaseURL.local.urlDataBase}/${key}.json`, data)
		.then(function (response) {
		  console.log(response);
		})
		.catch(function (error) {
		  console.log(error);
		});
		}



const list = async(key) =>{
    axios.get('mongodb://localhost:27017/storeDataBase/products')
    .then(function(res){
		console.log(res.data)
    })
    .catch(function(err){
        console.log(err);
    })
}
/* 
const  remove = async(key, id) => {
	await axios.delete(baseURL.local.urlDataBase + key + '/'+ id+'.json')
	return true
}

const get = async(key, id) => {
	const content = await axios.get(`${baseURL.local.urlDataBase}/${key}/${id}.json`)
	return {
		id: id,
		...content.data
	}
}

const update = async(key, id, data) => {
	await axios.put(`${baseURL.local.urlDataBase}/${key}/${id}.json`, data)
	return true
}

const headers = {
  'Content-Type': 'application/json',
}
const create = async(key, data) => {
axios.post(`${baseURL.local.urlDataBase}/${key}.json`, data, {
    headers: headers
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}
 */ /* const create = async(key, data) =>{
	await axios.post(`${baseURL.local.urlDataBase}/${key}.json`, data)
	return true
}  */

module.exports = { create, list }

