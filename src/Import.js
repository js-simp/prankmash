import React, {useState} from 'react'
import { Button, Input } from '@material-ui/core';
import Preview from './Preview'
import db from './firebase';
import './Import.css'


function Import(props) {

   const [input, setInput] = useState('') ;
   const [previewSts, setPreviewSts] = useState(false);
   const [length, setLength] = useState(props.prankArr.length + 1);

        function submitNow(event){
            event.preventDefault();
            //create a document for the new prank in the pranks collection
            db.collection("pranks").doc(`${length}`).set({
                link: input,
                rating: 0,
                id: length
            })
            // props.addPrank([...props.prankArr, {"link" : input , "rating" : 0}]);
            setPreviewSts(false);
            setInput("");
            setLength(length + 1)
        }
        ///handling the preview status as changes happen to the input
        function dothis(potLink){
            setInput(potLink);
            if(potLink == ""){
                setPreviewSts(false)
            }
            else{
                if(previewSts){
                    setPreviewSts(!previewSts)
                }
                
            }
        }
    return (
        <>
            <form className = "importPrank">
                <div >
                    <Preview link = {input} need = {previewSts}/>
                 </div>
                <div className = "insert">
                    <label>Link to GIF:</label><br></br>
                    <input value = {input} type="text" id="link" name="link" 
                    onChange = {(event) => dothis(event.target.value)}></input>
                 </div>
                 <div className = "Preview">
                    <Button disabled = {!input} type = "button" onClick = {() => setPreviewSts(true)} variant="contained" 
                    disableElevation>Preview
                    </Button>
                    <Button disabled = {!input} type = "button" onClick = {(event) => submitNow(event)} variant = "contained" 
                    color = "secondary"  disableElevation > 
                    Submit 
                    </Button>
                 </div>
            </form>
        </>
    )
    }
export default Import
