import React, {useState} from 'react'
import Prank from './Prank'
import "./BattleMash.css";

function BattleMash(props) {
    
    return (
    <div className = "box">
        <div id ="left" className = "Prank">
            <Prank
            side = {0}  
            prankArr = {props.prankArr}  
            updateArr = {props.updateArr}/>
        </div>  
        <div>
            <h1>Vs</h1>
        </div>
        <div id = "right" className = "Prank">
            <Prank 
            side = {1}
            prankArr = {props.prankArr}  
            updateArr = {props.updateArr}/ >
        </div>
    </div>
    )
}


export default BattleMash
