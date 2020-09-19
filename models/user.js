const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1')

let userSchema = new mongoose.Schema({
    name: {
        type : String,
        required: true,
        maxlength: 32,
        trim: true
    },
    lastName: {
        type: String,
        required: false,
        maxlength: 32,
        trim: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    encryPassword: {
        type: String,
        required: true
    },
    userInfo: {
        trim: true,
        type: String,
    },
    salt: String,
    role: {
        type: Number,
        default: 0,
    },
    purchases: {
        type: Array,
        default: [],
    }
});

userSchema.virtual("password")
    .set(function(password){
        this._password = password;
        this.salt = uuidv1();
        this.encryPassword = this.securePassword(password);
    })
    .get(function(){
        return this._password;
    })

userSchema.methods = {
    securePassword: function(plainPassword) {
        if(!plainPassword)  
            return "";
        try {
            return crypto.createHmac('sha256', this.salt)
            .update(plainPassword)
            .digest('hex');
        } catch(err) {

        }
    },
    authenticate: function(plainPassword) {
        return this.securePassword(plainPassword) === this.encryPassword;
    }
}, {timestamps: true};


module.exports = mongoose.model("User", userSchema); // M
