import React, { useState } from "react";
import Recipe from "../Recipe";
import {CalculateRecipe} from "../../Utils/Helpers";
import Button from "../Button/Button";
import { normolizeValue } from "../../Utils/Helpers";
import Polzunok from '../Polzunok/Polzunok';
import "./InputSection.css";

// const INGREDIENTS = [
//     {id:'ves', label:'Вес готового продукта гр', value: 0},
//     {id:'kakao', label:'Какао %', value: 0}, 
//     {id:'maslo', label:'Какао-масло %', value: 0}, 
// ]
//const KAKAOFATPERCENT = 53


export default function InputSection() {
    const [recipe, setRecipe] = useState({});
    const [ves, setVes] = useState(100);
    const [kakao, setKakao] = useState(50);
    const [maslo, setMaslo] = useState(25);
    const [pudra, setPudra] = useState(25);

    const isValid = () => {
        return ves !== 0 && (kakao !== 0 || maslo !== 0 || pudra !== 0);
    }

    const handleVesChange = (ev) => {
        const newValue = ev.target.value
        if (isNaN(newValue * 1)) {
            return
        }
        setVes(newValue)
    }

    const handleKakaoChange = (ev) => {
        let newValue = ev.target.value
        if (isNaN(newValue * 1)) {
            return
        }
        //newValue = normolizeValue(0, 100 - (+pudra + +maslo), newValue)
        newValue = normolizeValue(0, 100, newValue)
        setKakao(newValue)
    }

    const handleMasloChange = (ev) => {
        let newValue = ev.target.value
        if (isNaN(newValue * 1)) {
            return
        }
        //newValue = normolizeValue(0, 100 - (+pudra + +kakao), newValue)
        newValue = normolizeValue(0, 100, newValue)
        setMaslo(newValue)
    }

    const handlePudraChange = (ev) => {
        let newValue = ev.target.value
        if (isNaN(newValue * 1)) {
            return
        }
        //newValue = normolizeValue(0, 100 - (+maslo + +kakao), newValue)
        newValue = normolizeValue(0, 100, newValue)
        setPudra(newValue)
    }

    const handleKeyDown = (ev, key) => {
        if (ev.code === 'Enter') {
             setCondition(key)
         }
    }

    const handleBlur = (key) => {
        setCondition(key)
    }

    const setCondition = (field) => {
        const intKakao = +kakao
        const intMaslo = +maslo
        const intPudra = +pudra
        const sumOfIngredients = intKakao + intMaslo + intPudra
        if (field === 'kakao') {
            const ost = 100 - intKakao
            const sumOther = intMaslo + intPudra
            const coef = ost / sumOther
            if (sumOfIngredients > 100) {
                setMaslo(Math.floor(coef * intMaslo))
                setPudra(Math.floor(coef * intPudra))
            } else if (sumOfIngredients < 100) {
                intMaslo !== 0 && setMaslo(Math.floor(coef / intMaslo))
                intPudra !== 0 && setPudra(Math.floor(coef / intPudra))
            }
        }
        if (field === 'maslo') {
            const ost = 100 - maslo
            const sumOther = intKakao + intPudra
            const coef = ost / sumOther
            if (sumOfIngredients > 100) {
                setKakao(Math.floor(coef * intKakao))
                setPudra(Math.floor(coef * intPudra))
            } else if (sumOfIngredients < 100) {
                intKakao !== 0 && setKakao(Math.floor(coef / intKakao))
                intPudra !== 0 && setPudra(Math.floor(coef / intPudra))
            }
        }
        if (field === 'pudra') {
            const ost = 100 - intPudra
            const sumOther = intMaslo + intKakao
            const coef = ost / sumOther
            if (sumOfIngredients > 100) {
                setKakao(Math.floor(coef * intKakao))
                setMaslo(Math.floor(coef * intMaslo))
            } else if (sumOfIngredients < 100) {
                intKakao !== 0 && setKakao(Math.floor(coef / intKakao))
                intMaslo !== 0 && setMaslo(Math.floor(coef / intMaslo))
            }
        }
    }

    const calculate = () => {
        setRecipe(CalculateRecipe(ves, kakao, maslo, pudra))
    };

    return (
        <div>
            <div>
                <label>Вес готового продукта гр: </label>
                <input type="text" className="control" padding="1rem" value={ves} onChange={handleVesChange} />
            </div>
            <div className="ingredientContainer">
                <label>Какао %: </label>
                <input 
                    name="kakao"
                    type="text"
                    className="control"
                    padding="1rem"
                    value={kakao}
                    onChange={handleKakaoChange}
                    onKeyDown={(ev)=>{handleKeyDown(ev,'kakao')}}
                    onBlur={()=>{handleBlur('kakao')}}
                />
                <Polzunok percent={kakao}/>
            </div>
            <div className="ingredientContainer">
                <label>Какао-масло %</label>
                <input
                    type="text"
                    className="control"
                    padding="1rem"
                    value={maslo}
                    onChange={handleMasloChange}
                    onKeyDown={(ev)=>{handleKeyDown(ev,'maslo')}}
                    onBlur={()=>{handleBlur('maslo')}}
                    />
                    <Polzunok percent={maslo}/>
            </div>
            <div className="ingredientContainer">
                <label>Сахарная пудра %</label>
                <input
                    type="text" 
                    className="control" 
                    padding="1rem" 
                    value={pudra} 
                    onChange={handlePudraChange} 
                    onKeyDown={(ev)=>{handleKeyDown(ev,'pudra')}} 
                    onBlur={()=>{handleBlur('pudra')}}
                />
                <Polzunok percent={pudra}/>
            </div>
            
            <Button disabled={!isValid()} onClick={calculate}>Рассчитать</Button>
            {recipe.kakao && <Recipe data={recipe}/>}
        </div>
    )
}