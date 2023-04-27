const express = require('express');
const router = express.Router();
const Doer = require('../models/project_doer')

router.post('/add', async (req, res) => {
  try {
    const doer = new Doer(req.body);
    await doer.save();
    res.status(200).send(doer);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
    //res.status(400).send({ error: e.message })
  }
});

router.get('/records', async (req, res) => {
   try {
     const doers = await Doer.find({});
     res.send(doers);
   } catch (error) {
     res.status(500).send(error);
   }
 });

 router.delete('/delete/:id', async (req, res) => {
   try {
     const doer = await Doer.findByIdAndDelete(req.params.id);
     if (!doer) {
       res.status(404).send();
     } else {
       res.send(doer);
     }
   } catch (error) {
     res.status(500).send(error);
   }
 });

 router.get('/find/:id', async (req, res) => {
   try {
     const doer = await Doer.findById(req.params.id);
     if (!doer) {
       res.status(404).send();
     } else {
       res.send(doer);
     }
   } catch (error) {
     res.status(500).send(error);
   }
 });
 
 router.put('/edit/:id', async (req, res) => {
   try {
     const id = req.params.id;
     const updatedDoer = await Doer.findByIdAndUpdate(id, req.body/*, { new: true }*/);
     if (!updatedDoer) {
       return res.status(404).send('Doer not found');
     }
     res.send(updatedDoer);
   } catch (error) {
     console.error(error);
     res.status(500).send(error);
   }
 });

module.exports = router;
