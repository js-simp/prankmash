import React from 'react'

function Preview(props) {
    //condition check if : preview is requested and the input isn't null
    if(props.need && props.link!== ''){
        return (
            <div>
                <img src = {props.link}/>
            </div>
        )
        }
    else{
        return (
            <div>
                <img src = "" height = "200" width = "250"/>
            </div>
        )
    }

    
}

export default Preview
