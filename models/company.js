const mongoose 			= require('mongoose');

let CompanySchema = mongoose.Schema({
    name: {type:String},
    users:  [ {user:{type : mongoose.Schema.ObjectId, ref : 'User'}, permissions:[{type:String}]} ],
}, {timestamps: true});

CompanySchema.virtual('id').set(function (id) {
    this._id = id;
});

CompanySchema.virtual('id').get(function () {
    return this._id
});

let company = module.exports = mongoose.model('Company', CompanySchema);

