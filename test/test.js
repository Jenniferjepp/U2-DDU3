
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

    const options = {
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
    const options = {
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



// Request 4:
async function R4 () {
    const request = new Request("http://0.0.0.0:8000/cities");

    const response = await fetch(request);
    const cities = await response.json();

    console.log("Request 4:", cities);
}



// Request 5:
async function R5 () {
    const request = new Request("http://0.0.0.0:8000/cities/43");
    
    const response = await fetch(request);
    const resource = await response.json();

    console.log("Request 5:", resource);
}



// Request 6:
async function R6 () {
    const request = new Request("http://0.0.0.0:8000/cities/search?text=en");

    const response = await fetch(request);
    const resource = await response.json();

    console.log("Request 6:", resource);
}



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



// En POST-förfrågan till endpoint /cities
// Body: Ett JSON-formaterad objekt:
// name: ”Dresden”,
// country: ”Germany”,
// }
// Förväntat response-status: 409


// Request 8:
const options8 = {
    method: "POST", 
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
        name: "Dresden",
        country: "Germany" 
    })
}

const request8 = new Request("http://0.0.0.0:8000/cities", options8);

const responsePromise8 = fetch(request8);
responsePromise8.then(handleResponse8);

function handleResponse8 (response8) {
    console.log("Request 8:",response8.status);
}


// En POST-förfrågan till endpoint /cities
// Body: Ett JSON-formaterad objekt:
// name: ”Ystad”,
// }
// Förväntat response-status: 400

// Request 9:
const options9 = {
    method: "POST", 
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
        name: "Ystad" 
    })
}

const request9 = new Request("http://0.0.0.0:8000/cities", options9);

const responsePromise9 = fetch(request9);
responsePromise9.then(handleResponse9);

function handleResponse9 (response9) {
    console.log("Request 9:", response9.status);
}


// En DELETE-förfrågan till endpoint /cities
// Body: Ett JSON-formaterad objekt:
// { id: 56 }
// Förväntat response-status: 404

// Request 10:
const options10 = {
    method: "DELETE", 
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
        id: 56 
    })
}

const request10 = new Request("http://0.0.0.0:8000/cities", options10);

const responsePromise10 = fetch(request10);
responsePromise10.then(handleResponse10);

function handleResponse10 (response10) {
    console.log("Request 10:", response10.status);
}



// En DELETE-förfrågan till endpoint /cities
// Body: Ett JSON-formaterad objekt: {}
// Förväntat response-status: 400

// Request 11:
const options11 = {
    method: "DELETE", 
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({})
}

const request11 = new Request("http://0.0.0.0:8000/cities", options11);

const responsePromise11 = fetch(request11);
responsePromise11.then(handleResponse11);

function handleResponse11 (response11) {
    console.log("Request 11:", response11.status);
}



// En POST-förfrågan till endpoint /messages
// Body: Ett JSON-formaterad objekt:
// {
// from: 2,
// to: 1,
// password: ”pass”
// }
// Förväntat response-status: 400


// Request 12:
const options12 = {
    method: "POST", 
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
        from: 2,
        to: 1,
        password: "pass"
    })
}

const request12 = new Request("http://0.0.0.0:8000/cities/message", options12);

const responsePromise12 = fetch(request12);
responsePromise12.then(handleResponse12);

function handleResponse12 (response12) {
    console.log("Request 12:", response12.status);
}



// 13) En GET-förfrågan till endpoint /cities/search

// Request 13:
const request13 = new Request("http://0.0.0.0:8000/cities/search");

const responsePromise13 = fetch(request13);
responsePromise13.then(handleResponse13);

function handleResponse13 (response13) {
    console.log("Request 13:", response13.status);
}



// 14) En DELETE-förfrågan till endpoint /mordor
// Förväntat response-status: 400 (no matched endpoint)

// Request 14:
const options14 = {
    method: "DELETE",
    headers: {"Content-Type": "application/json"}
}

const request14 = new Request("http://0.0.0.0:8000/cities/mordor", options14);

const responsePromise14 = fetch(request14);
responsePromise14.then(handleResponse14);

function handleResponse14 (response14) {
    console.log("Request 14:", response14.status);
}



