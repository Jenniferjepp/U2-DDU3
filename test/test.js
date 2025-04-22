
// Request 1:
async function R1 () {
    const request = new Request("http://0.0.0.0:8000/cities");

    const response = await fetch(request);
    const cities = await response.json();

    if (response.status === 200) {
        console.log("Request 1:", cities);
    } else {
        console.log("Wrong status! It should be 200..")
    }
}

R1();


// Request 2:
async function R2 () {

    options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name: "Malmö",
            country: "Sweden"
        })
    }

    const request = new Request("http://0.0.0.0:8000/cities", options);

    const response = await fetch(request);
    const resource = await response.json();

    console.log("Request 2:", resource);
}



// Request 3:
async function R3 () {
    options = {
        method: "DELETE", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            id: 2
        })
    }

    const request = new Request("http://0.0.0.0:8000/cities", options);
    const response = await fetch(request);
    const resource = await response.text();

    console.log("Request 3:", resource);
}


/*
options3 = {
    method: "DELETE", 
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
        id: 2
    })
}
const request3 = new Request("http://0.0.0.0:8000/cities", options3);

const promiseResponse3 = fetch(request3);
promiseResponse3.then(handleResponse3);

function handleResponse3 (response3) {
    const promiseResource3 = response3.text();
    promiseResource3.then(handleResource3);
}

function handleResource3 (resource3) {
    console.log("Request 3:", resource3);
}
*/


// Request 4:
async function R4 () {
    const request = new Request("http://0.0.0.0:8000/cities");

    const response = await fetch(request);
    const cities = await response.json();

    console.log("Request 4:", cities);
}


/*
const request4 = new Request("http://0.0.0.0:8000/cities");

const responsePromise4 = fetch(request4);
responsePromise4.then(handleResponse4);

function handleResponse4 (response4) {
    const promiseResource4 = response4.text();
    promiseResource4.then(handleResource4);
}

function handleResource4 (resource4) {
    console.log("Request4:", resource4)
}
*/



// Request 5:
async function R5 () {
    const request = new Request("http://0.0.0.0:8000/cities/43");
    
    const response = await fetch(request);
    const resource = await response.json();

    console.log("Request 5:", resource);
}

/*
const request5 = new Request("http://0.0.0.0:8000/cities/43");

const responsePromise5 = fetch(request5);
responsePromise5.then(handleResponse5);

function handleResponse5 (response5) {
    const resourcePromise5 = response5.json();
    resourcePromise5.then(handleResource5);
}

function handleResource5 (resource5) {
    console.log("Request 5:", resource5);
}
*/



// Request 6:
async function R6 () {
    const request = new Request("http://0.0.0.0:8000/cities/search?text=en");

    const response = await fetch(request);
    const resource = await response.json();

    console.log("Request 6:", resource);
}


// En GET-förfrågan till endpoint /cities/search?text=en&country=Sweden
// Förväntat response-status: 200
// Förväntat response-body (eller resurs):
// []

// Request 7:
async function R7 () {
    const request = new Request("http://0.0.0.0:8000/cities/search?text=en&country=Sweden");

    const response = await fetch(request);
    const resource = await response.json();

    console.log("Request 7:", resource);
}




// 🧩 Kedja ihop dem
async function runInOrder() {
    await R2();  // Lägg till Malmö
    await R3();  // Radera stad med id 2
    await R4();  // Hämta och logga slutresultatet
    await R5();
    await R6();
    await R7();
}

runInOrder();  // Kör allt i ordnin



// FRÅGOR: 
// varför ska jag köra test.js som om det vore en server??
