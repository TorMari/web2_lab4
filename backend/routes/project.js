const express = require('express');
const router = express.Router();
const Project = require('../models/project')

router.post('/add', async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(200).send(project);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
    //res.status(400).send({ error: e.message })
  }
});

router.get('/records', async (req, res) => {
   try {
     const projects = await Project.find({});
     res.send(projects);
   } catch (error) {
     res.status(500).send(error);
   }
 });

 router.delete('/delete/:id', async (req, res) => {
   try {
     const project = await Project.findByIdAndDelete(req.params.id);
     if (!project) {
       res.status(404).send();
     } else {
       res.send(project);
     }
   } catch (error) {
     res.status(500).send(error);
   }
 });

 router.get('/find/:id', async (req, res) => {
   try {
     const project = await Project.findById(req.params.id);
     if (!project) {
       res.status(404).send();
     } else {
       res.send(project);
     }
   } catch (error) {
     res.status(500).send(error);
   }
 });
 
 router.put('/edit/:id', async (req, res) => {
   try {
     const id = req.params.id;
     const updatedProject= await Project.findByIdAndUpdate(id, req.body/*, { new: true }*/);
     if (!updatedProject) {
       return res.status(404).send('Project not found');
     }
     res.send(updatedProject);
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

