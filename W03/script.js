const url = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
const pokemonContainer = document.querySelector('#pokemonContainer');

// Function to fetch and display Basic Pokémon data
async function getPokemonName(url) {
   const response = await fetch(url);
   if (response.ok) {
      const data = await response.json();
      displayPokemon(data.results);
   }
}

//Function to Fetch and display Pokemon Images
async function getPokemonImage(url) {
   const response = await fetch(url);
   const data = await response.json();
   return data;
}

//Create Image Element for div
function createSpriteImage(src, alt) {
   if (!src) return; // Return if no sprite is available
   const img = document.createElement('img');
   img.src = src;
   img.alt = alt;
   img.loading = 'lazy';
   img.classList.add('pokemon-sprite');
   return img;
}

// Function to display Pokémon data on the page
async function displayPokemon(pokemonList) {
   // Loop through each pokemon in the list
   for (const pokemon of pokemonList) {
      const pokemonData = await getPokemonImage(pokemon.url);
      const div = document.createElement('div');
      div.classList.add('pokemonCard');

      //Build h2
      const name = document.createElement('h2');
      name.textContent = pokemon.name;
      div.appendChild(name);

      //Build img
      const sprites = pokemonData.sprites;
      const frontDefaultImg = createSpriteImage(sprites.front_default, 'Front Default');
      div.appendChild(frontDefaultImg);

      //Append the div(card)
      pokemonContainer.appendChild(div);
   }
}

// Call the function to fetch and display Pokémon
getPokemonName(url);