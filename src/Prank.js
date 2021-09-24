import React, {useState} from 'react'
import shuffle from './shuffle.js'
import ELOrank from './eloranking.js'
import db from './firebase';
import './Prank.css'


//creating the pranks that will clash each other
function Prank(props) {
    const [clicked, setClick] = useState(null);
    const [h2h, setH2h] = useState([0,1])
    const [b2b, setB2b] = useState([2,3])
    const [display, setDisplay] = useState(["show", "noshow"])
    // updating the rating after the vote
    function giveRating(event,prankArr, h2h, setIndex){
        console.log(clicked);
        setClick("active");
        setDisplay(display.reverse());
        //first we need to identify the index that won and the index of gif that lost
        console.log(event);
        let winIndex = event.target.attributes['prankindex'].value
        let loseIndex;
        h2h.forEach((item) => {
            if(item != winIndex){
                loseIndex = item;
            }
        }
            )
        //get the new ratings in the form [winner score, loser score]
        let newRatings = ELOrank(props.prankArr, [winIndex, loseIndex])

        //Obtaining the id's of the pranks for which the rating needs to be 
        //updated
        //update the oldRatings with the new ones
        let winId = props.prankArr[winIndex].id;
        let loseId = props.prankArr[loseIndex].id;

        // console.log(winId, loseId)
        let winningPrank = db.collection("pranks").doc(`${winId}`);
        let losingPrank = db.collection("pranks").doc(`${loseId}`);
        // Set the "rating" field to the "newratings"
        winningPrank.update({
            rating: newRatings[0]
        })
        losingPrank.update({
            rating: newRatings[1]
        })
        .then(() => {
            let minIndex = Math.min(h2h[0], h2h[1])
            if(minIndex + 3 < prankArr.length){
                setIndex([minIndex + 2, minIndex + 3]);
            }
            else{
                
                db.collection("pranks").get().then((querySnapshot) => {
                    let updatedArr = querySnapshot.docs.map((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        return doc.data();
                    });
                    props.updateArr(shuffle(updatedArr));
                    props.setIndex([0,1]);
                    // console.log('This is the shuffled array:' , props.prankArr);
                });
                
            }
            setClick(null)
        })

        //now we have to load the next two indices into the arena
        //if we have exhausted the list we need to start at h2h = [0,1]
        // again after shuffling the array

            

    }
    return (
        <div className= {`image-container ${clicked}`}>
            <div className = {`prank-image ${display[0]}`}>
                <img className = "prank-gif"
                src = {props.prankArr[h2h[props.side]].link} 
                alt =""
                prankindex = {props.prankArr[h2h[props.side]].index} 
                height = "200" 
                width = "250"
                onClick = {(event)=>(giveRating(event, props.prankArr, b2b, setB2b))}
                />
            </div>
            <div className = {`prank-image ${display[1]}`}>
                <img className = "prank-gif"
                src = {props.prankArr[b2b[props.side]].link} 
                alt =""
                prankindex = {props.prankArr[b2b[props.side]].index} 
                height = "200" 
                width = "250"
                onClick = {(event)=>(giveRating(event, props.prankArr, h2h, setH2h))}
                />
            </div>    
            {/* <div className= "icon-Container">
                <img className = "like-icon" src = "https://svgshare.com/i/Y5h.svg" alt = "joker"/>
            </div> */}
        </div>
    )
}

export default Prank
