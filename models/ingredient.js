import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
    name: { type: String },
    size: { type: Number},
    measurement: { type: String },
    calories: { type: Number },
    protein: { type: Number },
    carbs: { type: Number },
    fat: { type: Number }
});

const Ingredient = mongoose.model('ingredient',ingredientSchema)

export default Ingredient