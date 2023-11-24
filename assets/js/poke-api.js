
const pokeApi = {}

function convertBaseStatsDetailToBaseStats(baseStatsDetail) {
    const newBaseStats = {}
    
    newBaseStats.total = 0

    baseStatsDetail.forEach((statSlot) => {

        const value = statSlot.base_stat
        newBaseStats.total 
        if (statSlot.stat.name == 'hp') {
            newBaseStats.hp = value
        } else if (statSlot.stat.name == 'attack') {
            newBaseStats.attack = value
        } else if (statSlot.stat.name == 'defense') {
            newBaseStats.defense = value
        } else if (statSlot.stat.name == 'special-attack') {
            newBaseStats.specialAttack = value 
        } else if (statSlot.stat.name == 'special-defense') {
            newBaseStats.specialDefense = value 
        } else if (statSlot.stat.name == 'speed') {
            newBaseStats.speed = value 
        }
        newBaseStats.total += value
    })
    
    return newBaseStats
}

function convertPokeApiDetailToPokemon(pokeDetail) {

    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    pokemon.species = pokeDetail.species.name
    pokemon.height = pokeDetail.height / 10
    pokemon.weight = pokeDetail.weight / 10
    pokemon.abilities = pokeDetail.abilities.map((abilitieSlot) => abilitieSlot.ability.name)
    
    pokemon.baseStats = convertBaseStatsDetailToBaseStats(pokeDetail.stats)

    pokemon.gender = [];
    pokemon.eggGroups;
    pokemon.eggCycle;

    return pokemon
}

pokeApi.getPokemon = (url) => {

    return fetch(url)
        .then((response) => response.json())
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemonsResults) => pokemonsResults.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonDetails) => pokemonDetails.map(convertPokeApiDetailToPokemon))
        .then((pokemons) => pokemons)
}
