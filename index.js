const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    let newRecipe = {
      title: "Tortilla de patata",
      level: "Easy Peasy",
      ingredients: [
        "8 huevos",
        "1kg de patatas",
        "Aceite de oliva",
        "1 cebolla",
        "Sal (al gusto)",
      ],
      cuisine: "Española",
      dishType: "other",
      image:
        "https://lacocinadefrabisa.lavozdegalicia.es/wp-content/uploads/2019/05/tortilla-espa%C3%B1ola.jpg",
      duration: 30,
      creator: "Ariadna",
    };

    return Recipe.create(newRecipe)

  }).then((createdRecipe) => {

    console.log("createdDoc ->", createdRecipe);

    return Recipe.insertMany(data)

  }).then((insertedRecipes) => {
    for (let i = 0; i < insertedRecipes.length; i++) {
      console.log(insertedRecipes[i].title);
    }
    const newDuration = Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { $set: {duration: 100} },
      { new: true }
    )
    return newDuration

  }) .then((newDuration) => {
    console.log(`Recipe has been updated ->`, newDuration)
    const deletedRecipe = Recipe.deleteOne({ name: "Carrot Cake" })
    return deletedRecipe
  })
  .then((deletedRecipe) => {
    console.log("Recipe was deleted ->", deletedRecipe);

   const closeMongoose = mongoose.connection.close()
        return closeMongoose
  }).then(closeMongoose =>{
      console.log("close mongoose")
    }).catch(error => {
    console.error("Error connecting to the database", error);
  });