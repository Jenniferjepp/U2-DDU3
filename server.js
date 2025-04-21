
const cities = [
  { id: 2, name: "Lille", country: "France"},
  { id: 3, name: "Nantes", country: "France"},
  { id: 5, name: "Bremen", country: "Germany"},
  { id: 10, name: "Dresden", country: "Germany"},
  { id: 11, name: "Heidelberg", country: "Germany"},
  { id: 12, name: "Venice", country: "Italy"},
  { id: 13, name: "Rome", country: "Italy"},
  { id: 16, name: "Graz", country: "Austria"},
  { id: 20, name: "Basel", country: "Switzerland"},
  { id: 21, name: "Lucerne", country: "Switzerland"},
  { id: 22, name: "Kraków", country: "Poland"},
  { id: 23, name: "Warsaw", country: "Poland"}, 
  { id: 24, name: "Poznań", country: "Poland"},
  { id: 28, name: "Ghent", country: "Belgium"},
  { id: 31, name: "Maastricht", country: "Netherlands"},
  { id: 38, name: "Maribor", country: "Slovenia"},
  { id: 42, name: "Strasbourg", country: "France"},
];


async function handler (request) {

  const url = new URL(request.url);
  const citiesToJSON = JSON.stringify(cities);  // formaterar arrayen cities till JSON-sträng

  // ENDPOINT --> /CITIES
  if (url.pathname === "/cities") {
    
    // GET
    if (request.method === "GET") {
      return new Response(citiesToJSON, 
        {status: 200,
        headers: {"Content-Type": "application/json"}
      });  // skickar arrayen som JSON-sträng, med status 200 och content-typ JSON som respons.
    }

    // POST
    if (request.method === "POST") {
      const contentType = request.headers.get("content-type");

      if (contentType === "application/json") {
        const requestCity = await request.json();  // denna packar upp requesten från webbläsaren ocg gör den till JAVASCRIPT!!
        console.log("requested city:", requestCity);

        // name/ country saknas som attribut:
        if (!requestCity.name || !requestCity.country) {
          console.log("name or country is missing!");
          return new Response("Missing name or country", {status: 400});
        }


        // leta upp namnet på staden i arrayen:
        const cityAlreadyExists = cities.find(city => city.name === requestCity.name);

        // staden finns redan i listan:
        if (cityAlreadyExists) {
          console.log("city already exists");
          return new Response("City already exists", {status: 409});

        // staden finns INTE i listan och ska läggas till i arrayen:
        } else {
          const maxId = Math.max(...cities.map(city => city.id));  
          const newId = maxId + 1;
          const requestCityWithId = {id: newId, name: requestCity.name, country: requestCity.country};
          cities.push(requestCityWithId);

          return new Response(JSON.stringify(requestCityWithId), {
            status: 200,
            headers: {"Content-Type": "application/json"} 
          });
        }
      }
    }

    // DELETE
    if (request.method === "DELETE") {
      const contentType = request.headers.get("content-type");

      if (contentType === "application/json") {
        const requestId = await request.json();  // denna packar upp requesten från webbläsaren ocg gör den till JAVASCRIPT!! 

        //  om attributet id saknas: 
        if (!requestId.id) {
          return new Response("Id is missing!", {status: 400});
        }


        // letar upp indexet i arrayen:
        const indexToDelete = cities.findIndex(city => city.id === requestId.id);

        // om indexet existerar i cities:
        if (indexToDelete !== -1) {  // findIndex returnerar -1 om det inte finns ngn matchning, så vi kollar om det faktiskt finns en matchning.
          cities.splice(indexToDelete, 1);
          return new Response("Delete OK!", {status: 200})

        // om indexet inte finns i cities:
        } else {
          return new Response("Id does not exist", {status: 404});
        }
      }
    }
  }


  //  ENDPOINT --> /CITIES/:ID
  const pathParts = url.pathname.split("/");  // delar upp pathname i en array baserat på "/" - alltså blir varje part av url:ens pathname egenskaper i en array.
  if (pathParts.length === 3 && pathParts[1] === "cities") {   // om arrayen av alla parts är 3 och första parten är cities ==>
    const idFromURL = Number(pathParts[2]);  // Hämta id från URL:en och gör till en siffra

    if (request.method === "GET") {
      const foundCity = cities.find(city => city.id === idFromURL);

      if (foundCity) {
        return new Response(JSON.stringify(foundCity), {
          status: 200,
          headers: {"Content-Type": "application/json"}
        });
      } else {
        return new Response("City with this Id does not exist :(", {status: 404});
      }
    }
  }

  // hantering av CORS
  const headersCORS = new Headers();  // skapar ett nytt Header-objekt som jag döper till headersCORS (eftersom att den ska hantera CORS-förfrågningar)
  headersCORS.set("Access-Control-Allow-Origin", "*");  // set lägget till headers i objektet. Dessa 2 tillsammans säger ge access till ALLA origins!

  if (request.method === "OPTIONS") {  // Webbläsaren skickar ibland en "preflight request" innan den gör en riktig begäran. Det är en OPTIONS-förfrågan som frågar: “Får jag lov att skicka den här typen av förfrågan?” -- 
    return new Response(null, {headers: headersCORS});  // Om servern får en OPTIONS-förfrågan, svarar den bara direkt med ett tomt svar (null) och skickar med CORS-headrarna. Det betyder: “Ja, det är okej att du skickar din riktiga förfrågan sen!”
  }


  // Om ingen endpoint matchar
  return new Response("Not found", { status: 404 });

}

Deno.serve(handler);