const pokeBaseURL = "https://pokeapi.co/api/v2"

async function getTotalPokemons(){
    const totalPokemonsURL = pokeBaseURL + "/pokemon-species/?limit=0"
    const response = await fetch(totalPokemonsURL)
    const data = await response.json()
    return data.count || 0;
}

function getRandomPokemonID(totalPokemons){
    const minValue = 1
    const maxValue = totalPokemons
    const totalNumbers = maxValue - minValue + 1
    const randomNumber = Math.floor(Math.random()*totalNumbers)
    const randomID =  randomNumber + minValue
    return randomID;
}

async function fetchPokemon(pokemonID){
    const getPokemonURL = pokeBaseURL + `/pokemon/${pokemonID}/`;
    const response = await fetch(getPokemonURL)
    return response.json();
}

async function generateRandomPokemonCard(){
    const totalPokemons = await getTotalPokemons()
    const pokemonID = await getRandomPokemonID(totalPokemons)
    const pokemon = await fetchPokemon(pokemonID)
    
    document.getElementById("pokemonID").innerHTML = pokemonID;
    document.getElementById("pokemonName").innerHTML = pokemon.name;
    document.getElementById("pokemonImage").src = pokemon.sprites.front_default;
}

function redirectToDetailPage(){
    const pokemonName = document.getElementById("pokemonName").innerHTML
    const detailPageURL = `https://pokemondb.net/pokedex/${pokemonName}`
    window.open(detailPageURL, "_blank")
}

document.getElementById("knowMoreBtn").addEventListener(
    "click", redirectToDetailPage
)

generateRandomPokemonCard()