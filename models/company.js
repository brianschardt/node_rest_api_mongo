const mongoose 			= require('mongoose');

let CompanySchema = mongoose.Schema({
    name: {type:String},
    users:  [ {user:{type : mongoose.Schema.ObjectId, ref : 'User'}, permissions:[{type:String}]} ],
}, {timestamps: true});

let company = module.exports = mongoose.model('Company', CompanySchema);

