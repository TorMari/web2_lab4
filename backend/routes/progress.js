const express = require('express');
const router = express.Router();
const Progress = require('../models/progress')

router.post('/add', async (req, res) => {
  try {
    const progress = new Progress(req.body);
    await progress.save();
    res.status(200).send(progress);
  } catch (error) {
    console.error(error);
    //res.status(400).send({ error: e.message })
    res.status(500).send(error);
  }
});

router.get('/records', async (req, res) => {
   try {
     const progress = await Progress.find({});
     res.send(progress);
   } catch (error) {
     res.status(500).send(error);
   }
 });

 router.delete('/delete/:id', async (req, res) => {
   try {
     const progress = await Progress.findByIdAndDelete(req.params.id);
     if (!progress) {
       res.status(404).send();
     } else {
       res.send(progress);
     }
   } catch (error) {
     res.status(500).send(error);
   }
 });

 router.get('/find/:id', async (req, res) => {
   try {
     const progress = await Progress.findById(req.params.id);
     if (!progress) {
       res.status(404).send();
     } else {
       res.send(progress);
     }
   } catch (error) {
    res.status(500).send(error);
   }
 });
 
 router.put('/edit/:id', async (req, res) => {
   try {
     const id = req.params.id;
     const updatedProgress= await Progress.findByIdAndUpdate(id, req.body/*, { new: true }*/);
     if (!updatedProgress) {
       return res.status(404).send('Project in progress not found');
     }
     res.send(updatedProgress);
   } catch (error) {
     console.error(error);
     res.status(500).send(error);
   }
 });

module.exports = router;

