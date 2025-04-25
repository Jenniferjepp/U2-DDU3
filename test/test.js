
async function getOriginalCities () {
    const request = new Request("http://0.0.0.0:8000/cities");

    const response = await fetch(request);
    const cities = await response.json();

   console.log("Request 1:", cities);
}
getOriginalCities();


async function postMalmo () {

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


async function deleteId2 () {
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


async function getUppdatedCities () {
    const request = new Request("http://0.0.0.0:8000/cities");

    const response = await fetch(request);
    const cities = await response.json();

    console.log("Request 4:", cities);
}


async function getId43 () {
    const request = new Request("http://0.0.0.0:8000/cities/43");
    
    const response = await fetch(request);
    const resource = await response.json();

    console.log("Request 5:", resource);
}


async function getCitiesThatIncludesTextEN () {
    const request = new Request("http://0.0.0.0:8000/cities/search?text=en");

    const response = await fetch(request);
    const resource = await response.json();

    console.log("Request 6:", resource);
}


async function getCitiesThatIncludesTextENandSweden () {
    const request = new Request("http://0.0.0.0:8000/cities/search?text=en&country=Sweden");

    const response = await fetch(request);
    const resource = await response.json();

    console.log("Request 7:", resource);
}



async function runInOrder() {
    await postMalmo(); 
    await deleteId2(); 
    await getUppdatedCities(); 
    await getId43(); 
    await getCitiesThatIncludesTextEN(); 
    await getCitiesThatIncludesTextENandSweden(); 
}
runInOrder();  



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



const request13 = new Request("http://0.0.0.0:8000/cities/search");

const responsePromise13 = fetch(request13);
responsePromise13.then(handleResponse13);

function handleResponse13 (response13) {
    console.log("Request 13:", response13.status);
}



const options14 = {
    method: "DELETE"
}

const request14 = new Request("http://0.0.0.0:8000/cities/mordor", options14);

const responsePromise14 = fetch(request14);
responsePromise14.then(handleResponse14);

function handleResponse14 (response14) {
    console.log("Request 14:", response14.status);
}