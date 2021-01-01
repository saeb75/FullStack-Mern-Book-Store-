const mongoose = require('mongoose')
const crypto = require('crypto')
const { v1: uuidv1 } = require('uuid');
const { type } = require('os')

const userSchema = new mongoose.Schema ({

        name : {
            type : String,
            required : true,
            trim : true,
            maxlength : 32
        },
        email : {
            type : String,
            required : true,
            trim :true,
            unique:true,
        },
        hashed_password : {
            type : String,
            required : true,

        },
        salt:String,
        about : {
            type :String,
            trim : true
        },
        role : {
            type : Number,
            default : 0
        },
        history : {
            type : [],
            default : []
        },

},{timestamps : true})

userSchema.virtual("password")
.set(function(password){
    this._password = password
    this.salt = uuidv1()
    this.hashed_password = this.encryptoPassword(password)
})
.get(function(){
    return this._password
})

userSchema.methods ={
    authenticate : function(plainText){
        return this.encryptoPassword(plainText) === this.hashed_password; 
    },

    encryptoPassword : function(password){
        if(!password) return '';
        try {
            return crypto.createHmac('sha1',this.salt)
                            .update(password)
                            .digest('hex')
        } catch(err){
            return ''
        }
    }
}

module.exports = mongoose.model('User' , userSchema)

