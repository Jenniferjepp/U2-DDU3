
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


function handler (request) {

// hantering av CORS
const headersCORS = new Headers();  // skapar ett nytt Header-objekt som jag döper till headersCORS (eftersom att den ska hantera CORS-förfrågningar)
headersCORS.set("Access-Control-Allow-Origin", "*");  // set lägget till headers i objektet. Dessa 2 tillsammans säger ge access till ALLA origins!

if (request.method === "OPTIONS") {  // Webbläsaren skickar ibland en "preflight request" innan den gör en riktig begäran. Det är en OPTIONS-förfrågan som frågar: “Får jag lov att skicka den här typen av förfrågan?” -- 
  return new Response(null, {headers: headersCORS});  // Om servern får en OPTIONS-förfrågan, svarar den bara direkt med ett tomt svar (null) och skickar med CORS-headrarna. Det betyder: “Ja, det är okej att du skickar din riktiga förfrågan sen!”
}

// 3 endpoints 

}