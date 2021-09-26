import React, {useState} from 'react'
import Prank from './Prank'
import "./BattleMash.css";
import shuffle from './shuffle.js'
import ELOrank from './eloranking.js'
import db from './firebase';

function BattleMash(props) {

    
    //h2h pranks that go head to head ( contenders)
    const [h2h, setH2h] = useState([0,1])
    // updating the rating after the vote
    // function giveRating(event,prankArr){// testing purposes
    
    function giveRating(prankindex , prankArr){
        // // console.log(clicked);
        // setClick("active");
        //first we need to identify the index that won and the index of gif that lost
        console.log(prankindex);
        let winIndex = prankindex
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
                setH2h([minIndex + 2, minIndex + 3]);
            }
            else{
                
                db.collection("pranks").get().then((querySnapshot) => {
                    let updatedArr = querySnapshot.docs.map((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        return doc.data();
                    });
                    props.updateArr(shuffle(updatedArr));
                    props.setH2h([0,1]);
                    // console.log('This is the shuffled array:' , props.prankArr);
                });
                
            }
            // setClick(null)
        })

        //now we have to load the next two indices into the arena
        //if we have exhausted the list we need to start at h2h = [0,1]
        // again after shuffling the array

            

    }
    return (
    <div className = "box">
        <div id ="left" className = "Prank">
            <Prank
            // side = {0}
            index = {h2h[0]}  
            prankArr = {props.prankArr}
            giveRating = {giveRating}  
            //updateArr is function to update the ratings of the pranks
            updateArr = {props.updateArr}/>
        </div>  
        <div>
            <h1>Vs</h1>
        </div>
        <div id = "right" className = "Prank">
            <Prank 
            // side = {1}
            index = {h2h[1]}
            prankArr = {props.prankArr}
            giveRating = {giveRating}  
            //updateArr is function to update the ratings of the pranks  
            updateArr = {props.updateArr}/ >
        </div>
    </div>
    )
}


export default BattleMash
