const express = require('express');
const mongoose = require('mongoose');
const test = require('./Routes/Api/test')
const cors = require('cors');
const bodyParser = require("body-parser")
const app = express();
app.use(cors());
mongoose.connect("mongodb+srv://gurkan:Grkn0987%3F.@mern.fqr7u.mongodb.net/mern?retryWrites=true&w=majority", {
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then((res) =>{
    console.log("bağlandı");
}).catch((res)=>{
    console.log(res);
});


app.use(
    bodyParser.urlencoded({
      extended: false,
    })
  );
  app.use(bodyParser.json());

app.use("/", test);

app.listen(3001,() =>{
    console.log("çalışıyor");
})

