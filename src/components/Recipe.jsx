import React from "react";

// `Рецепт: Какао (гр): ${newKakao} <br/>
// Какао-масло (гр): ${newMaslo} <br/>
// Сахарная пудра (гр): ${newPudra}`

export default function Recipe({data}) {
    return (
        <>
        <h3>Рецепт:</h3>
        <div>
            Какао (гр): {data.kakao}
        </div>
        <div>
            Какао-масло (гр): {data.maslo}
        </div>
        <div>
            Сахарная пудра (гр): {data.pudra} 
        </div>
        </>
    )
}