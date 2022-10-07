const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// import
const Workout = require("../model/workoutModel");

// routes
// get all workouts
router.get('/search', async (req, res, next) => {
  const {workout} = req.query.workout

  try {
    const workouts = await Workout.find({workout});
    res.status(200).json(workouts);
    next()
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// get a workout
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'});
  }

  const workouts = await Workout.findById(id)
  if(!workouts){
    return res.status(404).json({error: 'No such workout'})
  }
  res.status(200).json(workouts)
});


// create a workout
router.post("/", async (req, res) => {
  const {muscleGroup, title, load, sets, reps, comments} = req.body;
  try {
    const newWorkout = await Workout.create({muscleGroup, title, load, sets, reps, comments})
    res.status(201).json({newWorkout});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// delete a workout
router.delete("/:id", async (req, res) => {
  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such workout'})
  }
  const workout = await Workout.findOneAndDelete({_id: id})
  
  if(!workout){
    return res.status(400).json({error: 'No such workout'})
  }
  res.status(200).json(workout)
});

// update a workout
router.put("/:id", async (req, res) => {
  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such workout'})
  }
  const workout = await Workout.findOneAndUpdate({_id: id}, {...req.body})
  
  if(!workout){
    return res.status(400).json({error: 'No such workout'})
  }
  res.status(200).json(workout)
});

module.exports = router;
