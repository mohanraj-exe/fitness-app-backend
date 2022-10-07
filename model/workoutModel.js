const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({

    muscleGroup: {type: String, required: true},
    title: {type: String, required: true},
    load: {type: Number, required: true},
    sets: {type: Number, required: true},
    reps: {type: Number, required: true},
    comments: {type: String, required: true}

},{timestamps: true}
);

const Workout = mongoose.model('workout', workoutSchema);
module.exports = Workout;