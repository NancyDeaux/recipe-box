const input = document.getElementById("recipe-id");
const button = document.getElementById("get-btn");
const statusText = document.getElementById("status");
const recipeArea = document.getElementById("recipe");

async function loadRecipe() {
  const url = "https://dummyjson.com/recipes/" + input.value;

  recipeArea.textContent = "";   // clear the old recipe first

  const response = await fetch(url);
  const recipe = await response.json();
  console.log(recipe);

  const card = document.createElement("div");
  card.className = "card p-3";

  const title = document.createElement("h2");
  title.className = "h4";
  title.textContent = recipe.name;
  card.appendChild(title);

  const cuisine = document.createElement("p");
  cuisine.textContent = "Cuisine: " + recipe.cuisine;
  card.appendChild(cuisine);

  const time = document.createElement("p");
  time.textContent = "Ready in " + recipe.prepTimeMinutes + " minutes";
  card.appendChild(time);

  recipeArea.appendChild(card);

  input.value = "";   // clear the box for the next number
}

button.addEventListener("click", loadRecipe);