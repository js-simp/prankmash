import React, {useState, useEffect} from "react";
import './App.css';
import LinearProgress from "@material-ui/core/LinearProgress";
import Main from './Main'
import db from './firebase';
import shuffle from './shuffle';
import { Button } from '@material-ui/core';

    
// function Category(props) {
//   return (
//     <header>
//       <h2>{props.category} Pranks Clash</h2>
//     </header>
//   )
// }

function App() {
  const [prankArray, setPranks] = useState([])

  useEffect(() => {
    db.collection("pranks").get().then((querySnapshot) => {
      //get the array of pranks
      let prankArr = querySnapshot.docs.map((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log("New Array being generated!")
          return doc.data();
      });
      //rearrange the order of the pranks using shuffle.js
      setPranks(shuffle(prankArr));
  });
  }, [])
  
  
  if(prankArray.length !== 0){
    // console.log(prankArray);
    return (
      <div className="App">
        <h1>PrankMash</h1>
        <div className = "homeBtn">
          <Button variant="contained" color="primary" href="https://pranksbank.com">
          Pranks Bank
          </Button>
        </div> 
        
        <div className = "Battlezone">
          <Main prankArr = {prankArray} addPrank = {setPranks}/>
        </div>
      </div>
    );
  }
  else{
    return(
      <div>
        <LinearProgress/>
      </div>
      
    )
  }
  
}

export default App;