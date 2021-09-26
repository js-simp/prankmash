import React, {useState} from 'react'
import Import from './Import';
import Top from './Top';
import BattleMash from './BattleMash';
import { Button } from '@material-ui/core';
import shuffle from './shuffle.js'
import './Main.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";


function Main(props) {

    /*startMash function is used to shuffle the array of pranks when route changes or reloads
    or new prank is imported*/
    const startMash = (event) => {
      // event.preventDefault();
      props.addPrank(shuffle(props.prankArr))
    }
    
    return(
        <Router>
          <Switch>
                <Route path="/admin_panel"> 
                {/* allowing admin to import new pranks into database */}
                  <div className = "Form">
                    <div className="importForm">
                      <Import prankArr = {props.prankArr} addPrank = {props.addPrank}/>
                    </div>
                    <div className = "PrankMash">
                      <Link to="">
                          <Button type = "button" onClick = {(event) => {startMash(event)}} 
                          variant = "contained" color = "primary">PrankMash!</Button>
                      </Link>
                    </div>
                  </div>
              </Route>
              <Route path="/top3">
                <div>
                  <Top/>
                    <div className = "HomePageBtn">
                        <Link to="">
                            <Button type = "button" onClick = {(event) => {startMash(event)}} 
                            variant = "contained" color = "primary">PrankMash!</Button>
                        </Link>
                    </div>
                </div>
              
            </Route>
              <Route path="">
              <div className = "battlezone">
                <BattleMash  prankArr = {props.prankArr} updateArr = {props.addPrank}/>
              </div>
              <div className = "top3">
                      <Link to="/top3">
                          <Button type = "button" variant = "contained" color = "primary">
                            Top 3 of the past 24h!
                            </Button>
                      </Link>
                    </div>
            </Route>
          </Switch>
        </Router>
    )
    
}

export default Main
