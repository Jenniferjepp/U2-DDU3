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




// SKAPA CITY-ELEMENT med delete-knapp:
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

    // DELETE BUTTON
    deleteB.addEventListener("click", async function deleteCity () {
        const userConfirmed = confirm(`Are you sure you want to delete ${city.name}?`);

        if (!userConfirmed) {
            return; // Avbryt om användaren klickar "Cancel"
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

            // 🔍 Hämta uppdaterad lista från servern
            const updatedResponse = await fetch("http://0.0.0.0:8000/cities");
            const updatedCities = await updatedResponse.json();
            console.log("Uppdaterad lista efter delete:", updatedCities);
            
        } else {
            console.log("responsen blev inte 200 och staden raderades inte..")
        }
    });
}



// DIV 1
async function getCities () {
    const request = new Request("http://0.0.0.0:8000/cities");

    const response = await fetch(request);
    const cities = await response.json();

    for (let city of cities) {
        createCityElement(city);
    }
}


// DIV 2
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

        addNameInput.value = "";
        addCountryInput.value = "";

        // 🔍 Hämta uppdaterad lista från servern
        const updatedResponse = await fetch("http://0.0.0.0:8000/cities");
        const updatedCities = await updatedResponse.json();
        console.log("Uppdaterad lista efter POST:", updatedCities);

    } else if (response.status === 409) {
        messagePDOM.textContent = "City already exists and cant be added";

        addNameInput.value = "";
        addCountryInput.value = "";

    } else if (response.status === 400) {
        messagePDOM.textContent = "Cityname or country is missing :( try again"

        addNameInput.value = "";
        addCountryInput.value = "";
    }
})

// Tömmer båda inputfälten när man börjar skriva något nytt i dem
addNameInput.addEventListener("input", () => {
    messagePDOM.textContent = "";
});

addCountryInput.addEventListener("input", () => {
    messagePDOM.textContent = "";
});



searchBDOM.addEventListener("click", async function searchCities () {

    // Spread operatorn (...) tar ett array-liknande objekt (som en HTMLCollection aka alla element som är barn till searchedCitiesDivDOM i detta fall) och gör om det till en riktig array.
    [...searchedCitiesDivDOM.children].forEach(child => {
        if (child.id !== "no-found-cities-message-p") {
            child.remove();
        }
    });
    

    const textInput = searchTextInput.value.toLowerCase();
    const countryInput = searchCountryInput.value.toLowerCase();

    const request = new Request(`http://0.0.0.0:8000/cities/search?text=${textInput}&country=${countryInput}`);

    const response = await fetch(request);
    const filteredCities = await response.json();  // resursen aka arrayen med filtrerade städer

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

        searchTextInput.value = "";
        searchCountryInput.value = "";

        console.log("inne i status 200");

    } 
    
    else if (response.status === 400) {
        console.log("inne i status 400");
        
        noFoundCitiesMessageP.textContent = "No cities found :(";
        noFoundCitiesMessageP.hidden = false;

        searchTextInput.value = "";
        searchCountryInput.value = "";
    }
})


getCities();



// FRÅGOR:
// får man ha kommentarer?
// hur skicka in? lägga upp på webben?