import mongoose from "mongoose";

const introducerSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    linkedIn_url:{
        type: String,
        require: true
    },
    mutual_connections:{
        type: [String],
        require: true
    }
});

module.exports = ("introducer", introducerSchema);