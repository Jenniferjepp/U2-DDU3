const citiesDivDOM = document.querySelector("#cities-div");

const addBDOM = document.querySelector("#addB");

const addNameInput = document.querySelector("#add-name-input");
const addCountryInput = document.querySelector("#add-country-input");

const messagePDOM = document.querySelector("#message-p");


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

addBDOM.addEventListener("click", async function addCity () {
    messagePDOM.text = "";

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
    }
})

// Tömmer båda inputfälten när man börjar skriva något nytt i dem
addNameInput.addEventListener("input", () => {
    messagePDOM.textContent = "";
});

addCountryInput.addEventListener("input", () => {
    messagePDOM.textContent = "";
});


getCities();



// FRÅGOR:
// får man ha kommentarer?