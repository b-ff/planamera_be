const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlanSchema = new Schema({
    title: String,
    description: String,
    userId: Number,
    deadline: Date,
    year: String,
    targetValue: Number,
    progress: Number,
    isFinished: Boolean,
    isPrivate: Boolean,
    likes: Array,
    dislikes: Array
});

module.exports = mongoose.model('Plan', PlanSchema);