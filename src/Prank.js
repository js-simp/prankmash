import React, {useState} from 'react'
import shuffle from './shuffle.js'
import ELOrank from './eloranking.js'
import db from './firebase';
import './Prank.css'


//creating the pranks that will clash each other
function Prank(props) {
    const [clicked, setClick] = useState(null);

    function clickTransit(index, prankArr){
        setClick('active')
        props.giveRating(index, prankArr)
        
    }

    
    return (
        <div className = "image-container">
            <img className = {`${clicked} prank-image`}
                src = {props.prankArr[props.index].link} 
                alt =""
                // prankindex = {props.prankArr[h2h[props.side]].index} 
                height = "200" 
                width = "250"
                onClick = {()=>(clickTransit(props.index, props.prankArr))}
                />
        </div>
                
            // {/* <div className = {`prank-image ${display[1]}`}>
            //     <img className = "prank-gif"
            //     src = {props.prankArr[b2b[props.side]].link} 
            //     alt =""
            //     prankindex = {props.prankArr[b2b[props.side]].index} 
            //     height = "200" 
            //     width = "250"
            //     onClick = {(event)=>(giveRating(event, props.prankArr, h2h, setH2h))}
            //     />
            // </div>     */}
            // {/* <div className= "icon-Container">
            //     <img className = "like-icon" src = "https://svgshare.com/i/Y5h.svg" alt = "joker"/>
            // </div> */}
    )
}

export default Prank
