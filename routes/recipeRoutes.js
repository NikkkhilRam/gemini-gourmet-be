const express = require("express");
const router = express.Router();
const openai = require("openai");
const Recipe = require("../models/Recipe");
const { generate } = require("../services/geminiService");

openai.apiKey = process.env.OPENAI_API_KEY;

router.post("/generate", async (req, res) => {
  const {
    ingredients,
    cuisine,
    diet,
    calories,
    cookingTime,
    servingSize,
    apiKey,
  } = req.body;

  let prompt = `Generate a recipe using the following ingredients: ${ingredients.join(
    ", "
  )}.`;

  if (cuisine !== "any") {
    prompt += ` Preferably, it should be a ${cuisine} dish.`;
  }

  if (diet !== "any") {
    prompt += ` It should be a ${diet} recipe.`;
  }

  if (calories !== "") {
    prompt += ` The recipe should have around ${calories} calories per serving.`;
  }

  if (cookingTime !== "") {
    prompt += ` It should take approximately ${cookingTime} minutes to cook.`;
  }

  if (servingSize !== "") {
    prompt += ` The recipe should serve ${servingSize} people.`;
  }

  try {
    const recipe = await generate(prompt, apiKey);

    // Extracting recipe name from the generated recipe
    const recipeName = extractRecipeName(recipe);

    // const newRecipe = new Recipe({ ingredients, cuisine, diet, recipe });
    // await newRecipe.save();

    return res.status(200).json({ recipeName, recipe });
  } catch (error) {
    res.status(500).json({
      error: "Error generating recipe",
    });
  }
});

function extractRecipeName(recipe) {
  const lines = recipe.split("\n");

  for (const line of lines) {
    if (line.startsWith("**")) {
      const recipeName = line.substring(2, line.lastIndexOf("**")).trim();
      return recipeName;
    }
  }

  return "Recipe Name Not Found";
}

module.exports = router;
