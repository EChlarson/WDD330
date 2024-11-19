const url = "https://pokeapi.co/api/v2/pokemon";
let results = null;

async function getPokemon(url) {
  const response = await fetch(url);
  //check to see if the fetch was successful
  if (response.ok) {
    // the API will send us JSON...but we have to convert the response before we can use it
    // .json() also returns a promise...so we await it as well.
    const data = await response.json();
    doStuff(data);
  }
}
function doStuff(data) {
    results = data;
    console.log('Pokemon data:', results);
   
    // Iterate over each Pokémon result
    results.results.forEach(async (pokemon) => {
        const pokemonData = await fetchPokemonDetails(pokemon.url); // Fetch individual Pokémon details
       
        // Create a div for each Pokémon
        const div = document.createElement('div');
        div.classList.add('pokemon-card');
 
        // Create and display the Pokémon name
        const name = document.createElement('h2');
        name.textContent = pokemon.name;
        div.appendChild(name);
       
        // Create and display the sprites
        const sprites = pokemonData.sprites;
 
        const frontDefaultImg = createSpriteImage(sprites.front_default, 'Front Default');
        div.appendChild(frontDefaultImg);
       
        // Add the div to the main container
        document.querySelector('#pokemonContainer').appendChild(div);
  });
}
 
async function fetchPokemonDetails(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
 
function createSpriteImage(src, alt) {
    if (!src) return;  // Return if no sprite is available
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.classList.add('pokemon-sprite');
    return img;
}
 
getPokemon(url);