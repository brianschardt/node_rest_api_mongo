const mongoose 			= require('mongoose');
const bcrypt 			= require('bcrypt');
const bcrypt_p 			= require('bcrypt-promise');
const jwt           	= require('jsonwebtoken');

let UserSchema = mongoose.Schema({
    first:      {type:String},
    last:       {type:String},
    phone:	    {type:String, lowercase:true, trim: true, index: true, unique: true, sparse: true},//sparse is because now we have two possible unique keys that are optional
    email:	    {type:String, lowercase:true, trim: true, index: true, unique: true, sparse: true},
    password:   {type:String},

}, {timestamps: true});

UserSchema.virtual('companies', {
    ref: 'Company',
    localField: '_id',
    foreignField: 'users.user',
    justOne: false,
});

UserSchema.pre('save', async function(next){

    if(this.isModified('password') || this.isNew){

        let err, salt, hash;
        [err, salt] = await to(bcrypt.genSalt(10));
        if(err) TE(err.message, true);

        [err, hash] = await to(bcrypt.hash(this.password, salt));
        if(err) TE(err.message, true);

        this.password = hash;

    } else{
        return next();
    }
})

UserSchema.methods.comparePassword = async function(pw){
    let err, pass
    if(!this.password) TE('password not set');

    [err, pass] = await to(bcrypt_p.compare(pw, this.password));
    if(err) TE(err);

    if(!pass) TE('invalid password');

    return this;
}

UserSchema.virtual('full_name').set(function (name) {
    var split = name.split(' ');
    this.first = split[0];
    this.last = split[1];
});

UserSchema.virtual('full_name').get(function () { //now you can treat as if this was a property instead of a function
    if(!this.first) return null;
    if(!this.last) return this.first;

    return this.first + ' ' + this.last;
});

UserSchema.methods.getJWT = function(){
    let expiration_time = parseInt(CONFIG.jwt_expiration);
    return "Bearer "+jwt.sign({user_id:this._id}, CONFIG.jwt_encryption, {expiresIn: expiration_time});
};

let User = module.exports = mongoose.model('User', UserSchema);


