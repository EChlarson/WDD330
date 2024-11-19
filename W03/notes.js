//Asking the server for information about "Ditto" (a Pokémon).
const url = "https://pokeapi.co/api/v2/pokemon/ditto";
//The fetch function returns a "Promise," not the actual data yet.
const results = fetch(url);
//If you console.log(results), it will just show the Promise.
console.log(results);

//Promises are placeholders for data that isn’t ready yet. If you try to use the data before it’s ready, your program will fail.

//The async keyword makes the function asynchronous, meaning it can wait for things.
async function getPokemon(url) {
   //The await keyword pauses the function until the fetch is done.
   const results = await fetch(url);
   doStuff(results);
}

//Converting the Response into Usable Data:
async function getPokemon(url) {
   //The response from fetch is a "data stream," not usable directly.
   const response = await fetch(url);
   if (response.ok) {
      //.json() converts the stream into a JavaScript object we can use.
      const data = await response.json();
      doStuff(data);
   }
}

//Once the data is ready, you can display it, use it in calculations, or update your webpage.
function doStuff(data) {
   console.log("Data:", data); // Do something with the data
}

//Even with async/await, JavaScript moves on to the next lines while waiting. That’s why you carefully control when to use the data.
getPokemon(url);
console.log("This runs before the data is ready!");