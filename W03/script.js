const url1 = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
const pokemonContainer = document.querySelector('#pokemonContainer');

// Function to fetch and display Pokémon data
async function getPokemon(url) {
   const response = await fetch(url);
   const data = await response.json(url);

   // console.table(data.results);
   displayPokemon(data.results);
}

// Function to display Pokémon data on the page
function displayPokemon(results) {
   results.forEach((results) => {
      //Build div .cards elements
      let card = document.createElement("div");
      let name = document.createElement("h2");
      let image = document.createElement("img");

      card.setAttribute('id', 'pokemonCard');

      //Build h2
      name.textContent = `${results.name}`;
      
      //Build img
      image.setAttribute('src', results.url);
      image.setAttribute('alt', `${results.name}`);

      //Append the div(card)
      card.appendChild(name);
      card.appendChild(image);

      pokemonContainer.appendChild(card);
   });
}

// Call the function to fetch and display Pokémon
getPokemon(url);