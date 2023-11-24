const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const closeDialogButton = document.getElementById('closeDialogButton')

const dialog = document.getElementById('pokemonDetail') 

const aboutInfoButton = document.getElementById('aboutInfo')
const baseStatsInfoButton = document.getElementById('baseStatsInfo')
const evolutionInfoButton = document.getElementById('evolutionInfo')
const movesInfoButton = document.getElementById('movesInfo')

const pokemonInfoMenu = document.querySelectorAll('.item-menu')

const maxRecords = 151
const limit = 100
let offset = 0;
let currentPokemonModal = {};

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onclick="loadPokemonDetail(${pokemon.number})">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}"
                         alt="${pokemon.name}">
                </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml 
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {

    offset += limit
  
    const qtdRecordsWithNexPage = offset + limit
    
    let newLimit = limit;

    if (qtdRecordsWithNexPage >= maxRecords) {
        newLimit = maxRecords - offset
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }

    loadPokemonItens(offset, newLimit)
})

closeDialogButton.addEventListener('click', () => {
    dialog.className = 'modal'
    removeItemMenuAtivo()
    dialog.close()
})

function removeItemMenuAtivo() {
    pokemonInfoMenu.forEach((item) => {
        item.classList.remove('ativo')
    })
}

function selectItemMenuInfo() {
    removeItemMenuAtivo()

    this.classList.add('ativo')
    displayInfo(currentPokemonModal, this.id)
}

pokemonInfoMenu.forEach((item) => {
    item.addEventListener('click', selectItemMenuInfo)
})



function displayInfo(pokemon, id) {
    let pokemonInfo = ''

    if (id == 'aboutInfo') {
        pokemonInfo = getAboutInfo(pokemon)
    } else if (id == 'baseStatsInfo') {
        pokemonInfo = getBaseStatsInfo(pokemon)
    } else if (id == 'evolutionInfo') {
        pokemonInfo = getEvolutionInfo(pokemon)
    } else if (id == 'movesInfo') { 
        pokemonInfo = getMovesInfo(pokemon)
    }

    document.getElementById('pokemonInfoStats').innerHTML = pokemonInfo;
}

function pokemonDefaultInfo(pokemon) {
    return `
        <span class="name">${pokemon.name}</span>
        <span class="number">#${pokemon.number}</span>
        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
        </div>
        <img src="${pokemon.photo}"
            alt="${pokemon.name}">
    `
}

function getAboutInfo(pokemon) {
    
    return `
        <table class="pokemonInfo">
            <tr>
                <th>Species</th>
                <td class="capitalize">${pokemon.species}</td>
            </tr>
            <tr>
                <th>Height</th>
                <td>${convertMetersToFeetAndInches(pokemon.height)}*(${pokemon.height.toFixed(2)})</td>
            </tr>

            <tr>
                <th>Weight</th>
                <td>${convertKGtoLBS(pokemon.weight).toFixed(1)} lbs (${(pokemon.weight).toFixed(1)}kg)</td>
            </tr>
            <tr>
                <th>Abilities</th>
                <td class="capitalize">${pokemon.abilities.join(', ')}</td>
            </tr>
        </table>
        <h2>Breeding</h2>
        <table class="pokemonInfo">
            <tr>
                <th>Gender</th>
                <td>87.5%</td>
                <td>12.5%</td>
            </tr>
            <tr>
                <th>Egg Groups</th>
                <td>Monster</td>
            </tr>
            <tr>
                <th>Egg Cycle</th>
                <td>Grass</td>
            </tr>
        </table>
    `
    
}

function getBaseStatsInfo(pokemon) {
    return `
    <table class="pokemonInfo base-stats">
        <tr>
            <th>HP</th>
            <td>${pokemon.baseStats.hp}</td>
        </tr>
        <tr>
            <th>Attack</th>
            <td>${pokemon.baseStats.attack}</td>
        </tr>
        <tr>
            <th>Defense</th>
            <td>${pokemon.baseStats.defense}</td>
        </tr>
        <tr>
            <th>Sp. Atk</th>
            <td>${pokemon.baseStats.specialAttack}</td>
        </tr>
        <tr>
            <th>Sp. Def</th>
            <td>${pokemon.baseStats.specialDefense}</td>
        </tr>
        <tr>
            <th>Speed</th>
            <td>${pokemon.baseStats.speed}</td>
        </tr>
        <tr>
            <th>Total</th>
            <td>${pokemon.baseStats.total}</td>
        </tr>
    </table>
    <h2>Type defenses</h2>
    <span>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout</span>
    `
}

/* Não encontrado informações na API */
function getEvolutionInfo(pokemon) {
    return `
    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. 
    `
}

/* Não encontrado informações na API */
function getMovesInfo(pokemon) {
    return `
    The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. 
    `
}

function displayPokemonDetail(pokemon) {
    
    document.getElementById('pokemonInfo').innerHTML = pokemonDefaultInfo(pokemon)
    dialog.className += ` ${pokemon.type}`
    displayInfo(pokemon, 'aboutInfo')
    aboutInfoButton.classList.add('ativo')
    dialog.showModal()

}

function loadPokemonDetail(pokemonNumber) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`

    pokeApi.getPokemon(url).then((pokemonDetail) => {
        const pokemon = convertPokeApiDetailToPokemon(pokemonDetail)
        currentPokemonModal = pokemon
        displayPokemonDetail(pokemon)
    })
}