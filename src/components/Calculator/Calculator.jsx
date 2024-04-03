import React, { useState } from "react";
import Recipe from "../Recipe";
import {CalculateRecipe} from "../../Utils/Helpers";
//import Polzunok from '../Polzunok/Polzunok';
import "./Calculator.css";
import { Button as AntButton, Col, InputNumber, Row, Slider } from 'antd';

// const INGREDIENTS = [
//     {id:'ves', label:'Вес готового продукта гр', value: 0},
//     {id:'kakao', label:'Какао %', value: 0}, 
//     {id:'maslo', label:'Какао-масло %', value: 0}, 
// ]
//const KAKAOFATPERCENT = 53


export default function Calculator() {
    const [recipe, setRecipe] = useState({});
    const [ves, setVes] = useState(100);
    const [kakao, setKakao] = useState(50);
    const [maslo, setMaslo] = useState(25);
    const [pudra, setPudra] = useState(25);

    const isValid = () => {
        return ves !== 0 && (kakao !== 0 || maslo !== 0 || pudra !== 0);
    }

    const setCondition = (field) => {
        const intKakao = +kakao
        const intMaslo = +maslo
        const intPudra = +pudra
        if (field === 'kakao') {
            const ost = 100 - intKakao
            const sumOther = intMaslo + intPudra
            const coef = ost / sumOther
            intMaslo !== 0 && setMaslo(Math.floor(intMaslo*coef))
            intPudra !== 0 && setPudra(Math.floor(intPudra*coef))
            if (intMaslo === 0 && intPudra === 0) {
                setMaslo(Math.floor(ost/2))
                setPudra(Math.floor(ost/2))
            }
        }
        if (field === 'maslo') {
            const ost = 100 - maslo
            const sumOther = intKakao + intPudra
            const coef = ost / sumOther
            intKakao !== 0 && setKakao(Math.floor(intKakao*coef))
            intPudra !== 0 && setPudra(Math.floor(intPudra*coef))
            if (intKakao === 0 && intPudra === 0) {
                setKakao(Math.floor(ost/2))
                setPudra(Math.floor(ost/2))
            }

        }
        if (field === 'pudra') {
            const ost = 100 - intPudra
            const sumOther = intMaslo + intKakao
            const coef = ost / sumOther
            intKakao !== 0 && setKakao(Math.floor(intKakao*coef))
            intMaslo !== 0 && setMaslo(Math.floor(intMaslo*coef))
            if (intKakao === 0 && intMaslo === 0) {
                setKakao(Math.floor(ost/2))
                setMaslo(Math.floor(ost/2))
            }
        }
    }

    const calculate = () => {
        setRecipe(CalculateRecipe(ves, kakao, maslo, pudra))
    };

    return (
        <div className="calcContainer" style={{padding:"2rem"}}>
            <Row>
                <Col>
                    <h2>Вес готового продукта: </h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <InputNumber
                        block
                        min={1}
                        max={5000}
                        style={{
                        margin: '0 16px',
                        }}
                        value={ves * 1}
                        onChange={setVes}
                    />
                </Col>  
                <Col span={8}>
                    <Slider
                        min={1}
                        max={5000}
                        onChange={setVes}
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
                        block
                        min={0}
                        max={100}
                        style={{
                        margin: '0 16px',
                        }}
                        value={kakao * 1}
                        onChange={(value) => {
                            setKakao(value); 
                            setCondition('kakao');
                        }}
                    />
                </Col>
                <Col span={8}>
                    <Slider
                        min={0}
                        max={100}
                        onChange={(value) => {
                            setKakao(value); 
                            setCondition('kakao');
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
                        block
                        min={0}
                        max={100}
                        style={{
                        margin: '0 16px',
                        }}
                        value={maslo * 1}
                        onChange={(value) => {
                            setMaslo(value); 
                            setCondition('maslo');
                        }}
                    />
                </Col>
                <Col span={8}>
                    <Slider
                        min={0}
                        max={100}
                        onChange={(value) => {
                            setMaslo(value); 
                            setCondition('maslo');
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
                        block
                        min={0}
                        max={100}
                        style={{
                        margin: '0 16px',
                        }}
                        value={pudra * 1}
                        onChange={(value) => {
                            setPudra(value); 
                            setCondition('pudra');
                        }}
                    />
                </Col>
                <Col span={8}>
                    <Slider
                        min={0}
                        max={100}
                        onChange={(value) => {
                            setPudra(value); 
                            setCondition('pudra');
                        }}
                        value={ pudra * 1}
                    />
                </Col> 
            </Row>
            <AntButton 
                className="calculateButton" 
                type="primary" 
                onClick={calculate} 
                disabled={!isValid()}>Рассчитать</AntButton>
            {recipe.kakao && <Recipe data={recipe}/>}                
        </div>
    )
}