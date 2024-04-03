import { useState } from "react"
import "./Polzunok.css"

export default function Polzunok ({percent, setValue, setCondition, keyValue}) {
    const [mouseTracking, setMouseTracking] = useState(false)
    let wait = false

    const handleMouseDown = (ev) => {
        setMouseTracking(true) 
    }

    const handleMouseUp = (ev) => {
        setMouseTracking(false)
    }

    const handleMouseMove = (ev) => {
        if (wait) return
        wait = true
        setTimeout(() => {wait = false}, 50)
        const cursorPercentPosition = Math.floor(
            (ev.clientX - ev.target.getBoundingClientRect().x)
             / ev.target.getBoundingClientRect().width * 100)
        setValue(cursorPercentPosition)
        setCondition(keyValue)
    }

    return (
        <div 
            className="polzunokContainer" 
            onMouseDown={handleMouseDown} 
            onMouseUp={handleMouseUp} 
            onMouseOut={handleMouseUp}
            >
            <div 
                className="polzunok" 
                style={{width: percent + '%'}}>
            </div>
            <div 
                className="ghostController" 
                onMouseMove={mouseTracking ? handleMouseMove : () => {} }
                onClick={handleMouseMove}>
            </div>
        </div>
    )
        

}