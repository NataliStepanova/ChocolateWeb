export const CalculateRecipe = (ves, kakao, maslo) => {
    const ONEPERCENT = +ves/100
    const newKakao = +kakao * ONEPERCENT
    const newMaslo = +maslo * ONEPERCENT
    const newPudra = +ves - (newKakao + newMaslo)
    return (
        {
            kakao: newKakao,
            maslo: newMaslo,
            pudra: newPudra
        }
    )        
}

export const normolizeValue = (min, max, value) => {
    if (value < min) {
        value = min
    }
    if (value > max) {
        value = max
    }
    return value
}