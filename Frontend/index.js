
const citiesDivDOM = document.querySelector("#cities-div");

const addBDOM = document.querySelector("#addB");
const addNameInput = document.querySelector("#add-name-input");
const addCountryInput = document.querySelector("#add-country-input");
const messagePDOM = document.querySelector("#message-p");

const searchBDOM = document.querySelector("#searchB");
const searchTextInput = document.querySelector("#search-text-input");
const searchCountryInput = document.querySelector("#search-country-input");
const searchedCitiesDivDOM = document.querySelector("#searched-cities");
const noFoundCitiesMessageP = document.querySelector("#no-found-cities-message-p");



function createCityElement (city) {
    let cityDiv = document.createElement("div");
    let cityP = document.createElement("p");
    cityP.textContent = `${city.name}, ${city.country}`;
    cityP.classList.add("city-p");
    cityDiv.classList.add("city-div")
    cityDiv.appendChild(cityP);
    citiesDivDOM.appendChild(cityDiv);


    const deleteB = document.createElement("button");
    deleteB.textContent = "delete";
    deleteB.classList.add("delete-b");
    cityDiv.appendChild(deleteB);

    deleteB.addEventListener("click", async function deleteCity () {

        const userConfirmed = confirm(`Are you sure you want to delete ${city.name}?`);
        if (!userConfirmed) {
            return;
        }

        const options = {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id: city.id})
        }

        const request = new Request("http://0.0.0.0:8000/cities", options);
        const response = await fetch(request);
        
        if (response.status === 200) {
            cityDiv.remove();
        }
    });
}


function resetAddInputs() {
    addNameInput.value = "";
    addCountryInput.value = "";
}  

function resetSearchInputs() {
    searchTextInput.value = "";
    searchCountryInput.value = "";
}

function clearAddMessage() {
    messagePDOM.textContent = "";
}

addNameInput.addEventListener("input", clearAddMessage);
addCountryInput.addEventListener("input", clearAddMessage);





async function getCities () {
    const request = new Request("http://0.0.0.0:8000/cities");

    const response = await fetch(request);
    const cities = await response.json();

    for (let city of cities) {
        createCityElement(city);
    }
}



addBDOM.addEventListener("click", async function addCity () {

    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name: addNameInput.value.toLowerCase(),
            country: addCountryInput.value.toLowerCase()
        })
    }

    const request = new Request("http://0.0.0.0:8000/cities", options);
    const response = await fetch(request);

    if (response.status === 200) {

        const newCity = await response.json();
        createCityElement(newCity);

        resetAddInputs();

    } else if (response.status === 409) {
        messagePDOM.textContent = "City already exists and cant be added";

        resetAddInputs();

    } else if (response.status === 400) {
        messagePDOM.textContent = "Cityname or country is missing :( try again"

        resetAddInputs();
    }
})




searchBDOM.addEventListener("click", async function searchCities () {

    [...searchedCitiesDivDOM.children].forEach(child => {
        if (child.id !== "no-found-cities-message-p") {
            child.remove();
        }
    });
    

    const textInput = searchTextInput.value.toLowerCase();
    const countryInput = searchCountryInput.value.toLowerCase();

    const request = new Request(`http://0.0.0.0:8000/cities/search?text=${textInput}&country=${countryInput}`);

    const response = await fetch(request);
    const filteredCities = await response.json();

    if (response.status === 200) {
        if (filteredCities.length === 0) {
            noFoundCitiesMessageP.hidden = false;
            noFoundCitiesMessageP.textContent = "No cities found :(";
        } else {
            noFoundCitiesMessageP.hidden = true;
            for (let city of filteredCities) {
                let filteredCityDiv = document.createElement("div");
                let filteredCityP = document.createElement("p");
                filteredCityP.textContent = `${city.name}, ${city.country}`;
                filteredCityP.classList.add("city-p");
                filteredCityDiv.classList.add("city-div")
                filteredCityDiv.appendChild(filteredCityP);
                searchedCitiesDivDOM.appendChild(filteredCityDiv);
    
                filteredCityDiv.style.backgroundColor = "#E4F4E1"
            }
        }

        resetSearchInputs();
    } 
    
    else if (response.status === 400) {
        
        noFoundCitiesMessageP.textContent = "No cities found :(";
        noFoundCitiesMessageP.hidden = false;

        resetSearchInputs();
    }
})


getCities();
