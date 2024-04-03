import React, { useState } from "react";

const INGREDIENTS = [
    {id:'ves', label:'Вес готового продукта гр', value: 0},
    {id:'kakao', label:'Какао %', value: 0}, 
    {id:'maslo', label:'Какао-масло %', value: 0}, 
]


export default function InputSection() {
    const [recipe, setRecipe] = useState('');
    const [ingredients, setIngredients] = useState(INGREDIENTS)
    const onFormSubmit = (event) => {
        event.preventDefault();
        const {ves, kakao, maslo} = event.target;
        const ONEPERCENT = +ves.value/100
        const newKakao = +kakao.value * ONEPERCENT
        const newMaslo = +maslo.value * ONEPERCENT
        const newPudra = +ves.value - (newKakao + newMaslo)

        // setRecipe(
        //     'Рецепт: ' + 
        //     'Какао (гр): ' + newKakao + 
        //     ' Какао-масло (гр): ' + newMaslo + 
        //     ' Сахарная пудра (гр): ' + newPudra
        //     )
        setRecipe(
            `Рецепт: Какао (гр): ${newKakao} <br/>
            Какао-масло (гр): ${newMaslo} <br/>
            Сахарная пудра (гр): ${newPudra}`)
    };

   const handleIngredientsChange = (event, id) => {
        console.log(event.nativeEvent.data)
        console.log(id)
        const newState = [
            {id:'ves', label:'Вес готового продукта гр', value: 10},
            {id:'kakao', label:'Какао %', value: 0}, 
            {id:'maslo', label:'Какао-масло %', value: 0}, 
        ]
        setIngredients(newState)
    } 

    return (
        <div>
            <form onSubmit={onFormSubmit}>
            {
                ingredients.map((ingredient) => 
                (<div key={ingredient.id}>
                    <label>{ingredient.label}</label>
                    <input name={ingredient.id} type="text" className="control" padding='1rem' value={ingredient.value} onChange={(event)=>{handleIngredientsChange(event, ingredient.id)}}/>
                    </div>)
                )
            }
            <button type="submit">Рассчитать</button>
            <p dangerouslySetInnerHTML={{ __html: recipe}}/>
            </form>
        </div>
    )
}