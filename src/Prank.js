import React, {useState} from 'react'
import shuffle from './shuffle.js'
import ELOrank from './eloranking.js'
import db from './firebase';
import './Prank.css'



//creating the pranks that will clash each other

function Prank(props) {
    
    //checking clicked status for animation effect of selection
    const [clicked, setClick] = useState('');
    
    return (
        <div className = {`${clicked} image-container`}>
            <img className = 'prank-image'
                src = {props.prankArr[props.index].link} 
                alt =""
                // prankindex = {props.prankArr[h2h[props.side]].index} 
                height = "300" 
                width = "400"
                onClick = {()=>(props.giveRating(props.index, props.prankArr, setClick))}
                />
        </div>
    )
}

export default Prank
