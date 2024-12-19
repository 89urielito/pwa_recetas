const urlParams = new URLSearchParams(window.location.search);
const index = urlParams.get('index');

if (index !== null) {
    const recipe = recipes[index];
    document.getElementById("recipe-title").innerText = recipe.title;
    document.getElementById("recipe-image").src = recipe.image;
    document.getElementById("recipe-description").innerText = recipe.description;
} else {
    document.getElementById("recipe-details").innerHTML = "<p>Receta no encontrada.</p>";
}