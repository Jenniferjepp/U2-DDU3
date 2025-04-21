
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

// FRÅGOR: 
// ska man inte kunna se console.log i konsollen på webben också?
// varför ska jag köra test.js som om det vore en server??
