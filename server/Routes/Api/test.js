const express = require('express');
const mernModel = require('../../models/Mern')
const app = express();
app.post('/insert', async (req, res) => {
    const name = req.body.name
    const daySince = req.body.daySince
    const mern = new mernModel({ name: name, daySince: daySince });
    try {
        await mern.save();
    } catch (err) {
        console.log(err);
    }
});
app.get("/read", async (req, res) => {
    mernModel.find({}, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.send(result);
    })
});
app.put('/update',async (req, res) => {
    console.log(req.body);
    try {
        const a = await mernModel.findByIdAndUpdate(req.body.id,{
            name:req.body.newName,
            daySince:parseInt(req.body.newDaysince)
        })
    } catch (err) {
        console.log(err);
    }

    res.json("Başarılı")

});

app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id);
    await mernModel.findByIdAndRemove(id).exec();
    res.send("Silindi");

});

module.exports = app;