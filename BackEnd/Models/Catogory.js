const mongoose = require('mongoose')
const { model } = require('./User')
const { stringify } = require('uuid')




const catogotySchema = new mongoose.Schema({
    name : {
        type :String,
        required:true,
        trim:true,
	    unique : true
    }



},{timestamps : true})
 

module.exports = mongoose.model('Catogoty',catogotySchema) 