import "./Polzunok.css"

export default function Polzunok ({percent}) {
    return (
        <div className="polzunokContainer">
            <div className="polzunok" style={{width: percent + '%'}}>

            </div>
        </div>
    )
        

}