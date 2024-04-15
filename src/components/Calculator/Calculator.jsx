import React, { useEffect, useState } from "react";
import Recipe from "../Recipe";
import {CalculateRecipe} from "../../Utils/Helpers";
//import Polzunok from '../Polzunok/Polzunok';
import "./Calculator.css";
import { Button as AntButton, Col, InputNumber, Row, Slider } from 'antd';
import ArchiveOfRecipes from '../ArchiveOfRecipes/ArchiveOfRecipes';
import { setMl, setVes, setKakao, setMaslo, setPudra } from "../../store/recipeSlicer";
import { useSelector, useDispatch } from 'react-redux'

export default function Calculator() {
    const [recipe, setRecipe] = useState({});
    const [recipes, setRecipes] = useState([]);

    const ml = useSelector(state => state.recipe.ml)
    const ves = useSelector(state => state.recipe.ves)
    const kakao = useSelector(state => state.recipe.kakao)
    const maslo = useSelector(state => state.recipe.maslo)
    const pudra = useSelector(state => state.recipe.pudra)
    const dispatch = useDispatch()

    const isValid = () => {
        return ves !== 0 && (kakao !== 0 || maslo !== 0 || pudra !== 0);
    }  

    const calculate = () => {
        if (!isValid) return
        setRecipe(CalculateRecipe(ves, kakao, maslo, pudra))
    };

    const saveRecipe = () => {
        const newRecipe = {
            key: new Date().getTime(),
            ves: ves,
            kakaoPercent: kakao,
            kakaoVes: recipe.kakao,
            masloPercent: maslo,
            masloVes: recipe.maslo,
            pudraPercent: pudra,
            pudraVes: recipe.pudra,
        }
        const newRecipes = [...recipes, newRecipe]
        setRecipes(newRecipes)
        localStorage.setItem('recipes', JSON.stringify(newRecipes))
    }

    //eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>{calculate()}, [ves, kakao, maslo, pudra])
    useEffect(() => {
        const item = localStorage.getItem('recipes')
        if (item === null) return;
        const recipes = JSON.parse(item)
        setRecipes(recipes)
    }, [])

    const deleteRecipe = (key) => {
        const newRecipeList = recipes.filter((rec) => {
            return rec.key !== key
        })
        setRecipes(newRecipeList)
        localStorage.setItem('recipes', JSON.stringify(newRecipeList))
    }

    return (
        <>
            <div className="calcContainer" style={{padding:"2rem"}}>
                <Row>
                    <Col>
                        <h2>Перерасчет мл в гр: </h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputNumber
                            min={1}
                            max={5000}
                            style={{
                            margin: '0 16px',
                            }}
                            value={ml * 1}
                            onChange={(val) => { dispatch(setMl(val))}}
                        />
                    </Col>  
                    <Col span={8}>
                        <Slider
                            min={1}
                            max={5000}
                            onChange={(val) => { dispatch(setMl(val))}}
                            value={ ml * 1}
                        />
                    </Col> 
                </Row>
                <Row>
                    <Col>
                        <h2>Вес готового продукта гр: </h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputNumber
                            min={1}
                            max={5000}
                            style={{
                            margin: '0 16px',
                            }}
                            value={ves * 1}
                            onChange={(val) => { dispatch(setVes(val))}}
                        />
                    </Col>  
                    <Col span={8}>
                        <Slider
                            min={1}
                            max={5000}
                            onChange={(val) => { dispatch(setVes(val))}}
                            value={ ves * 1}
                        />
                    </Col> 
                </Row>
                <Row>
                    <Col>
                        <h2>Какао %: </h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputNumber
                            
                            min={0}
                            max={100}
                            style={{
                            margin: '0 16px',
                            }}
                            value={kakao * 1}
                            onChange={(value) => {
                                dispatch(setKakao(value));
                            }}
                        />
                    </Col>
                    <Col span={8}>
                        <Slider
                            min={0}
                            max={100}
                            onChange={(value) => {
                                dispatch(setKakao(value)); 
                            }}
                            value={ kakao * 1}
                        />
                    </Col> 
                </Row>
                <Row>
                    <Col>
                        <h2>Какао-масло %: </h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputNumber
                            
                            min={0}
                            max={100}
                            style={{
                            margin: '0 16px',
                            }}
                            value={maslo * 1}
                            onChange={(value) => {
                                dispatch(setMaslo(value)); 
                            }}
                        />
                    </Col>
                    <Col span={8}>
                        <Slider
                            min={0}
                            max={100}
                            onChange={(value) => {
                                dispatch(setMaslo(value));
                            }}
                            value={ maslo * 1}
                        />
                    </Col> 
                </Row>
                <Row>
                    <Col>
                        <h2>Сахарная пудра %: </h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputNumber
                            
                            min={0}
                            max={100}
                            style={{
                            margin: '0 16px',
                            }}
                            value={pudra * 1}
                            onChange={(value) => {
                                dispatch(setPudra(value));
                            }}
                        />
                    </Col>
                    <Col span={8}>
                        <Slider
                            min={0}
                            max={100}
                            onChange={(value) => {
                                dispatch(setPudra(value));
                            }}
                            value={ pudra * 1}
                        />
                    </Col> 
                </Row>
                
                {recipe.kakao && <Recipe data={recipe}/>}
                {recipe.kakao && <AntButton 
                    className="calculateButton" 
                    type="primary" 
                    onClick={saveRecipe}>Сохранить</AntButton> 
                }               
            </div>
            <ArchiveOfRecipes recipes={recipes} deleteFn={deleteRecipe}/>
        </>
    )
}
