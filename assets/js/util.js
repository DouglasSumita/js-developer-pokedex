function convertKGtoLBS(weight) {
    return weight * 2.20462
}

function convertMetersToFeetAndInches(pokemonHeight) {
    const inch = 0.0254
    const totalInch = pokemonHeight / inch
    const totalFoot = Math.trunc(totalInch / 12)
    const totalInchRemainder = totalInch - (totalFoot * 12)
    const footAndInches = `${totalFoot}'${(totalInchRemainder).toFixed(1)}`
    
    return footAndInches
}