const mongoose = require('mongoose');

const MernSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    daySince:{
        type: Number,
        required:true,
    },
});


const Mern = mongoose.model("mernData", MernSchema)
//Aşağıda yazılan mern yukarda tanımlanan değişken olan mern
module.exports = Mern