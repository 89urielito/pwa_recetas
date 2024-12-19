const recipes = [
    {
        title: 'Ensalada de Quinoa',
        image: 'images/recipe1.jpg',
        details: 'Una deliciosa ensalada de quinoa con vegetales frescos.',
    },
    {
        title: 'Batido Verde',
        image: 'images/recipe2.jpg',
        details: 'Un batido saludable de espinacas, plátano y manzana.',
    }
];

function loadRecipes() {
    const recipeList = document.getElementById('recipe-list');
    recipes.forEach((recipe, index) => {
        const recipeItem = document.createElement('div');
        recipeItem.className = 'recipe-item';
        recipeItem.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
            <button onclick="viewRecipe(${index})">Ver Receta</button>
        `;
        recipeList.appendChild(recipeItem);
    });
}

function viewRecipe(index) {
    localStorage.setItem('selectedRecipe', JSON.stringify(recipes[index]));
    window.location.href = 'recipe.html';
}

function goBack() {
    window.history.back();
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('service-worker.js').then(function(registration) {
            console.log('ServiceWorker registrado con éxito: ', registration);
        }).catch(function(error) {
            console.log('Falló el registro del ServiceWorker: ', error);
        });
    });
}

loadRecipes();