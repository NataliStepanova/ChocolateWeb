import { Kakao as KakaoClass, Maslo as MasloClass, Pudra as PudraClass } from "./Ingredients"

export const CalculateRecipe = (ves, kakaoPercent, masloPercent) => {
    const ONEPERCENT = +ves/100
    const kakaoVes = Math.floor(+kakaoPercent * ONEPERCENT)
    const masloVes = Math.floor(+masloPercent * ONEPERCENT)
    const pudraVes = Math.floor(+ves - (kakaoVes + masloVes))
    const Kakao = new KakaoClass().setGramm(kakaoVes)
    const Maslo = new MasloClass().setGramm(masloVes)
    const Pudra = new PudraClass().setGramm(pudraVes)
    const commonCcal = Math.round(Kakao.ccal + Maslo.ccal + Pudra.ccal, 2)
    const commonProt = Math.round(Kakao.prot + Maslo.prot + Pudra.prot, 2)
    const commonFat = Math.round(Kakao.fat + Maslo.fat + Pudra.fat, 2)
    const commonCarb = Math.round(Kakao.carb + Maslo.carb + Pudra.carb, 2)

    return (
        {
            kakao: Kakao.ves,
            maslo: Maslo.ves,
            pudra: Pudra.ves,
            commonCcal: commonCcal,
            commonProt: commonProt,
            commonFat: commonFat,
            commonCarb: commonCarb
        }
    )        
}

export const AddictedTransform = (changedIngr, secondIngr, thirdIngr) => {
    const sumAll = 100
    const ost = sumAll - changedIngr;
    const sumOther = secondIngr + thirdIngr
    const coef = ost / sumOther
    if (secondIngr !== 0) { 
        secondIngr = Math.floor(secondIngr * coef)
    }
    if (thirdIngr !== 0) { 
        thirdIngr = Math.floor(thirdIngr * coef)
    }
    if (secondIngr === 0 && thirdIngr === 0) {
        secondIngr = Math.floor(ost/2)
        thirdIngr = Math.floor(ost/2)
    }

    return [changedIngr, secondIngr, thirdIngr]
}

export const MlToGr = (ml) => {
    return (ml * 1.185).toFixed(2)
}

export const GrToMl = (ves) => {
    return (ves / 1.185).toFixed(2)
}