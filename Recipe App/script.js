
const meals = document.getElementById("meals");
const favMeals = document.getElementById('favmeals');

const searchTerm = document.getElementById('searchterm');
const searchBtn = document.getElementById('search');

const mealPopup = document.getElementById('meal-popup');
const popupCloseBtn = document.getElementById('close-popup');

const mealInfoEl = document.getElementById('meal-info');

getRandomMeal();
fetchFavMeals();
async function getRandomMeal() {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");

    const respData = await resp.json();
    const randomMeal = respData.meals[0];
    console.log(randomMeal);

    addMeal(randomMeal, true);
}

async function getMealById(id) {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id);

    const respData = await resp.json();
    const meal = respData.meals[0];

    return meal;
}

async function getMealsBySearch(term) {

    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + term);

    const respData = await resp.json();
    const meal = respData.meals;

    return meal;

}

function addMeal(mealData, random = false) {
    const meal = document.createElement('div');
    meal.classList.add('meal');
    meal.innerHTML = `
                <div class="meal-header">
                ${random ? `
                <span class="random">
                    Random Recipe
                </span>`: ''}
                <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
                </div>
                <div class="meal-body">
                    <h4>${mealData.strMeal}</h4>
                    <button class="fav-btn"><i class="fas fa-heart"></i></button>
                </div>
    `;
    const btn = meal.querySelector('.meal-body .fav-btn ');
    if(getMealFromLS()){
        btn.classList.add('active');
    }
    else{
        btn.classList.remove('active');
    }
    btn.classList.remove('active');
    btn.addEventListener('click', () => {
        if (btn.classList.contains('active')) {
            removeMealFromLS(mealData.idMeal);
            btn.classList.remove('active');
        }
        else {
            addMealToLS(mealData.idMeal);
            btn.classList.add('active');
        }
        fetchFavMeals();
    });
    meals.appendChild(meal);
    const mealheader = meal.querySelector('.meal-header');
    mealheader.addEventListener('click',()=>{
        showMealInfo(mealData);
    })
}

function addMealToLS(mealId) {
    const mealIds = getMealFromLS();
    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]));

}

function removeMealFromLS(mealId) {
    const mealIds = getMealFromLS();

    localStorage.setItem('mealIds', JSON.stringify(mealIds.filter((id) => id !== mealId)));
}

function getMealFromLS() {
    const mealIds = JSON.parse(localStorage.getItem('mealIds'));

    return mealIds === null ? [] : mealIds;
}

async function fetchFavMeals() {

    favMeals.innerHTML = '';
    const mealIds = getMealFromLS();

    for (let i = 0; i < mealIds.length; i++) {
        const mealId = mealIds[i];

        const meal = await getMealById(mealId);

        addMealToFav(meal);

    }
}

function addMealToFav(mealData) {
    const favMeal = document.createElement('li');
    favMeal.innerHTML = `
            <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}"><span class='mealname'>${mealData.strMeal}</span>
            <button class='clear'><i class="fas fa-window-close"></i></button>
            <span class='mealtoast'>${mealData.strMeal}</span>    
    `;

    const btn = favMeal.querySelector('.clear');
    btn.addEventListener('click',()=>{
        removeMealFromLS(mealData.idMeal);
        fetchFavMeals();
        meals.innerHTML = '';
        addMeal(mealData,true);
    });

    favMeals.appendChild(favMeal);

    const favimg = favMeal.querySelector('img');
    favimg.addEventListener('click',()=>{
        showMealInfo(mealData);
    })
}

searchBtn.addEventListener('click',async ()=>{
    const search = searchTerm.value;

    const mealssearch = await getMealsBySearch(search);
    if(mealssearch){
        meals.innerHTML = '';
        mealssearch.forEach((meal) => {
            
            addMeal(meal);
        });
    }
    else{
        const noresult = document.createElement('div');
        noresult.innerHTML = `<h5>No Meals found</h5>`;
        meals.innerHTML = '';
        meals.appendChild(noresult);
    }
})

popupCloseBtn.addEventListener('click',()=>{
    mealPopup.classList.add('hidden');
})

function showMealInfo(mealData){

    const ingredients = [];
    for(let i=1;i<=20;i++){
        if(mealData['strIngredient'+i] && mealData['strMeasure'+i]){
            ingredients.push(`${mealData['strIngredient'+i]} - ${mealData['strMeasure'+i]}`);
        }
        else{
            continue;
        }
    }

    const mealEl = document.createElement('div');

    mealEl.innerHTML = `
                <h3>${mealData.strMeal}</h3>
                <img src="${mealData.strMealThumb}" alt="">
                <p>
                    ${mealData.strInstructions}
                </p>
                <h4>Ingredients with Measures</h4>
                <ul>
                    ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
                </ul>
    `;

    mealInfoEl.innerHTML = '';
    mealInfoEl.appendChild(mealEl);

    mealPopup.classList.remove('hidden');
}