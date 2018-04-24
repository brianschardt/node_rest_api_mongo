const fs              = require('fs');
const path            = require('path');
const mongoose        = require('mongoose');
const ENV             = require('../config/env');
let basename        = path.basename(__filename);
let models          = {};

if(ENV.db_host != ''){
    let files = fs
      .readdirSync(__dirname)
      .filter((file) => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
      .forEach((file) => {
        let filename = file.split('.')[0];
        let model_name = filename.charAt(0).toUpperCase() + filename.slice(1);
        models[model_name] = require('./'+file);
    });


    mongoose.Promise = global.Promise; //set mongo up to use promises

    let mongo_location;
    if(!ENV.db_url){
        mongo_location = `${ENV.db_host}:${ENV.db_port}/${ENV.db_name}`;
        if(ENV.db_user) mongo_location = `${ENV.db_user}:${ENV.db_password}@${mongo_location}`;
        mongo_location = 'mongodb://'+mongo_location;
    }else{
        mongo_location = ENV.db_url
    }

    mongoose.connect(mongo_location).catch((err)=>{
        console.log('*** Can Not Connect to Mongo Server:', mongo_location)
    })

    let db = mongoose.connection;
    module.exports = db;
    db.once('open', ()=>{
        console.log('Connected to mongo at '+mongo_location);
    })
    db.on('error', (error)=>{
        console.log("error", error);
    })
    // End of Mongoose Setup
}else{
    console.log("No Mongo Credentials Given");
}

module.exports = models;
