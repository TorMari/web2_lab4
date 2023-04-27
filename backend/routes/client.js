const express = require('express');
const router = express.Router();
const Client = require('../models/client')

router.post('/add', async (req, res) => {
  try {
    const client = new Client(req.body);
    await client.save();
    res.status(200).send(client);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
    //res.status(400).send({ error: e.message })
  }
});

router.get('/records', async (req, res) => {
   try {
     const clients = await Client.find({});
     res.send(clients);
   } catch (error) {
     res.status(500).send(error);
   }
 });

 router.delete('/delete/:id', async (req, res) => {
   try {
     const client = await Client.findByIdAndDelete(req.params.id);
     if (!client) {
       res.status(404).send();
     } else {
       res.send(client);
     }
   } catch (error) {
     res.status(500).send(error);
   }
 });

 router.get('/find/:id', async (req, res) => {
   try {
     const client = await Client.findById(req.params.id);
     if (!client) {
       res.status(404).send();
     } else {
       res.send(client);
     }
   } catch (error) {
     res.status(500).send(error);
   }
 });
 
 router.put('/edit/:id', async (req, res) => {
   try {
     const id = req.params.id;
     const updatedClient = await Client.findByIdAndUpdate(id, req.body/*, { new: true }*/);
     if (!updatedClient) {
       return res.status(404).send('Client not found');
     }
     res.send(updatedClient);
   } catch (error) {
     console.error(error);
     res.status(500).send(error);
   }
 });
 
 

 /*router.put('/edit/:id', async (req, res) => {
   try {
     const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
     if (!updatedClient) {
       return res.status(404).send('Client not found');
     }
     res.send(updatedClient);
   } catch (error) {
     console.error(error);
     res.status(500).send(error);
   }
 });*/
 

module.exports = router;
