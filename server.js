/* -------------------- imports and gloal variables -------------------- */
import express from "express"
import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose"
import Ingredient from "./models/ingredient.js"
import methodOverride from "method-override"
const port = 3000
const app = express()

/* -------------------- `app.use` and connect to MongoDB -------------------- */
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))

mongoose.connect(process.env.MONGODB_URI)

/* -------------------- get routes -------------------- */

app.get('/', async (req, res) => {
    res.render("index.ejs")
})

app.get("/ingredients", async (req, res) => {
    const ingredients = await Ingredient.find()
    res.render("ingredients/index.ejs", { ingredients: ingredients })
})

app.get("/ingredients/new", async (req, res) => {
    res.render("ingredients/new.ejs")
})

app.get("/ingredients/:ingredientID", async (req, res) => {
    const ingredient = await Ingredient.findById(req.params.ingredientID)
    res.render("ingredients/show.ejs", {ingredient: ingredient})
})

/* -------------------- post cycle -------------------- */

app.post("/ingredients", async (req, res) => {
    await Ingredient.create(req.body)
    res.redirect("/ingredients")
})

/* -------------------- put cycle -------------------- */

app.get("/ingredients/:ingredientID/edit", async (req, res) => {
    const ingredient = await Ingredient.findById(req.params.ingredientID)
    res.render("ingredients/edit.ejs", {ingredient: ingredient})
})

app.put("/ingredients/:ingredientID", async (req, res) => {
    await Ingredient.findByIdAndUpdate(req.params.ingredientID, req.body)
    res.redirect(`/ingredients/${req.params.ingredientID}`)
})

/* -------------------- delete --------------------*/

app.delete("/ingredients/:ingredientID", async (req, res) => {
    await Ingredient.findByIdAndDelete(req.params.ingredientID)
    res.redirect("/ingredients")
})

/* -------------------- port -------------------- */
app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})

/* -------------------- mongoDB event listener -------------------- */

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})