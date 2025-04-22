
// Request 1:
async function R1 () {
    const request = new Request("http://0.0.0.0:8000/cities");

    const response = await fetch(request);
    const cities = await response.json();

    if (response.status === 200) {
        console.log("Request 1", cities);
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

    console.log("Request 2", resource);
}

R2();



// FRÅGOR: 

// varför ska jag köra test.js som om det vore en server??
