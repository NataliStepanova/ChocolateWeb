import React from "react";
import { Row, Col } from 'antd';

// `Рецепт: Какао (гр): ${newKakao} <br/>
// Какао-масло (гр): ${newMaslo} <br/>
// Сахарная пудра (гр): ${newPudra}`

export default function Recipe({data}) {
    return (
        <>
        <h3>Пропорции:</h3>
        <Row>
            <Col>
                <div>
                    Какао (гр): {data.kakao}
                </div>
                <div>
                    Какао-масло (гр): {data.maslo}
                </div>
                <div>
                    Сахарная пудра (гр): {data.pudra} 
                </div>
            </Col>
            <Col>
                <div>
                    Общая калорийность (ккал): {data.commonCcal} 
                </div>
                <div>
                    Белки (гр): {data.commonProt} 
                </div>
                <div>
                    Жиры (гр): {data.commonFat} 
                </div>
                <div>
                    Углеводы (гр): {data.commonCarb} 
                </div>
            </Col>
        </ Row>
        </>
    )
}