
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
  const citiesToJSON = JSON.stringify(cities);


  const headersCORS = new Headers();
  headersCORS.set("Access-Control-Allow-Origin", "*");
  headersCORS.set("Content-Type", "application/json");
  headersCORS.set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  headersCORS.set("Access-Control-Allow-Headers", "Content-Type");

  if (request.method === "OPTIONS") {  
    return new Response(null, {headers: headersCORS});
  }

  if (url.pathname === "/favicon.ico") {
    return new Response(null, { status: 204 });
  }



  if (url.pathname === "/cities") {
    
    if (request.method === "GET") {
      return new Response(citiesToJSON, 
        {status: 200,
        headers: headersCORS
      });
    }


    if (request.method === "POST") {
      const contentType = request.headers.get("content-type");

      if (contentType === "application/json") {
        const requestCity = await request.json();

        if (!requestCity.name || !requestCity.country) {
          return new Response(JSON.stringify("Missing name or country"), {
            status: 400,
            headers: headersCORS
          });
        }


        const cityAlreadyExists = cities.find(city => city.name.toLowerCase() === requestCity.name.toLowerCase());

        if (cityAlreadyExists) {
          console.log("city already exists");
          return new Response(JSON.stringify("City already exists"), {
            status: 409,
            headers: headersCORS
          });

        } else {
          const maxId = Math.max(...cities.map(city => city.id));  
          const newId = maxId + 1;
          const requestCityWithId = {id: newId, name: requestCity.name, country: requestCity.country};
          cities.push(requestCityWithId);

          return new Response(JSON.stringify(requestCityWithId), {
            status: 200,
            headers: headersCORS 
          });
        }
      }
    }


    if (request.method === "DELETE") {
      const contentType = request.headers.get("content-type");

      if (contentType === "application/json") {
        const requestId = await request.json();
 
        if (!requestId.id) {
          return new Response(JSON.stringify("Id is missing!"), {
            status: 400,
            headers: headersCORS});
        }


        const indexToDelete = cities.findIndex(city => city.id === requestId.id);

        if (indexToDelete !== -1) { 
          cities.splice(indexToDelete, 1);
          return new Response("Delete OK!", {
            status: 200,
            headers: headersCORS
          });

        } else {
          return new Response("Id does not exist", {
            status: 404,
            headers: headersCORS});
        }
      }
    }
  }


  const pathParts = url.pathname.split("/");
  if (pathParts.length === 3 && 
      pathParts[1] === "cities" && 
      !isNaN(Number(pathParts[2]))){   
    
      const idFromURL = Number(pathParts[2]);

    if (request.method === "GET") {
      const foundCity = cities.find(city => city.id === idFromURL);

      if (foundCity) {
        return new Response(JSON.stringify(foundCity), {
          status: 200,
          headers: headersCORS
        });
      } else {
        return new Response(JSON.stringify("City with this Id does not exist :("), {status: 404});
      }
    }
  }


  if (url.pathname === "/cities/search") {

    if (request.method === "GET") {
      const text = url.searchParams.get("text");
      const country = url.searchParams.get("country");

      if (!text) {
        return new Response(JSON.stringify("SearchParam TEXT needs to be included"), {
          status: 400,
          headers: headersCORS});
      } 


      let filteredCities = [];

      if(country) {
        filteredCities = cities.filter(city => 
          city.name.toLowerCase().includes(text.toLowerCase()) && 
          city.country.toLowerCase() === country.toLowerCase()
        );

      } else {
        filteredCities = cities.filter(city => 
          city.name.toLowerCase().includes(text.toLowerCase())
        );
      }
      
      return new Response(JSON.stringify(filteredCities), {
        status: 200, 
        headers: headersCORS
      });
    }
  }



  return new Response(JSON.stringify("No matched endpoint"), { 
    status: 400,
    headers: headersCORS });

}

Deno.serve(handler);