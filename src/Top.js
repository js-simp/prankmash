import React, {useState, useEffect} from 'react'
import db from './firebase'
import LinearProgress from "@material-ui/core/LinearProgress";
import './Top.css'

function Top() {
    const [top3, settop3] = useState([]);
    const [topLoaded, setLoad] = useState(false);

    

    useEffect( ()=> {
        
        let nowTime = Date.now();
        let lastUpdate = 0;
        const lastTime = db.collection("updateTime").doc("lastupdatedone");
        lastTime.get().then((doc) => {
            if (doc.exists) {
                lastUpdate = doc.data().time;
                // console.log(lastUpdate);

                if((nowTime-lastUpdate)/1000 < 86400){
                    db.collection("top3").get().then(
                        (docs) => {
                            let mytop3 = [];
                            docs.forEach((doc) => {
                                // doc.data() is never undefined for query doc snapshots
                                // console.log(doc.data().link);
                                mytop3.push(doc.data().link)
                            })
                            settop3(mytop3);
                            setLoad(true);
                        }
                    );
                }
                else{
                    console.log("Wow we need to get this shit updated!!")
                    const pranksRef = db.collection("pranks")
                    const timeRef = db.collection("updateTime");
                    const top3Ref = db.collection("top3");
                    pranksRef.orderBy("rating", "desc").limit(3).get().then(
                        (docs) => {
                            let mytop3 = [];
                           docs.forEach((doc) => {
                                // doc.data() is never undefined for query doc snapshots
                                top3Ref.doc(`${mytop3.length + 1}`).update({
                                    link : doc.data().link,
                                    prankId: doc.data().id,
                                    rating : doc.data().rating    

                                })
                                mytop3.push(doc.data().link);
                                
                                // settop3(top3.push(doc.data().link));
                            })
                         settop3(mytop3); 
                         setLoad(true);  
                        }
                    );
                    timeRef.doc('lastupdatedone').update({
                        time: nowTime
                    })
        
                }
                // console.log("Document data:", doc.data().time);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

    }, [])

        
    if(topLoaded){
        // console.log(top3.length)
        return(
            <div>
                <h1>Top 3 of the past 24 Hours!</h1>
                <div className = "topImageHolder">
                {top3.map((top) => (
                    
                        <img src = {top}
                            height = "200"
                            width = "250"
                            alt = ""/>
                    
                     )
                )}
                </div>
            </div>
        )
    }
    else{
        return(
            <div>
                <LinearProgress/>
            </div>
        )
    }
    
}



export default Top;