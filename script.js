const input = document.getElementById("recipe-id");
const button = document.getElementById("get-btn");
const statusText = document.getElementById("status");
const recipeArea = document.getElementById("recipe");

const dishInput = document.getElementById("dish-name");
const postButton = document.getElementById("post-btn");
const postStatus = document.getElementById("post-status");
const savedArea = document.getElementById("saved");

async function loadRecipe() {
  recipeArea.textContent = "";

  if (!input.value || isNaN(input.value) || input.value <= 0) {
    statusText.textContent = "Please enter a valid recipe number.";
    return;
  }

  try {
    const url = "https://dummyjson.com/recipes/" + input.value;
    statusText.textContent = "Loading...";
    const response = await fetch(url);

    if (!response.ok) {
      statusText.textContent = "No recipe with that number. Try 1 to 50.";
      return;
    }

    const recipe = await response.json();
    console.log(recipe);
    statusText.textContent = "";

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

    input.value = "";
  } catch (error) {
    console.error(error);
    statusText.textContent = "Can't reach the recipe server. Check your internet.";
  }
}

async function addDish() {
  savedArea.textContent = "";

  if (dishInput.value === "") {
    postStatus.textContent = "Type a dish name first.";
    return;
  }

  try {
    postStatus.textContent = "Sending...";
    const response = await fetch("https://dummyjson.com/recipes/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: dishInput.value })
    });

    if (!response.ok) {
      postStatus.textContent = "The server didn't add it. Try again.";
      return;
    }

    const newDish = await response.json();
    console.log(newDish);
    postStatus.textContent = "";

    const message = document.createElement("p");
    message.className = "alert alert-success";
    message.textContent = 'Added "' + newDish.name + '" as recipe #' + newDish.id + " (practice server: not really saved)";
    savedArea.appendChild(message);

    dishInput.value = "";
  } catch (error) {
    console.error(error);
    postStatus.textContent = "Can't reach the recipe server. Check your internet.";
  }
}

button.addEventListener("click", loadRecipe);
postButton.addEventListener("click", addDish);