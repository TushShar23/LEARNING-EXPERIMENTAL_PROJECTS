import React, { useState } from 'react'
import "../src/Form.css"
import { Standard } from "../Components/Standard" 
import { Metric } from "../Components/Metric"


export function Form() {
  // so in form there will be a heading and after that there should be two buttons one is one for standard calculator and one for metric
  const [showform,setShowForm] = useState("Standard");
  const [click,setClick] = useState(false);

  // i want to show the BMI state in the form so i lifted the state "BMI" and sent the setBmi updator function as prop to the component.
    const [Bmi,setBmi] = useState({
      BMI_Val:"",
      BMI_msge:""
    })

  

  function changeForm(e){
    setShowForm(e.target.id)
    // this e.target.id will give the name of the button clicked
    setClick(false)
    // this method
    setBmi({
      BMI_Val:"",
      BMI_msge:""
    })
    // this is for resetting the BMI state to null values coz when we change the form type we need that result screen should be clear at that moment so for that we reset the state values.
  }

  return (
    <div className='container'>
      <h1>BMI CALCULATOR</h1>
      <div className="btns">
        <button onClick={(e)=>changeForm(e)} id='Standard'>Standard</button>
        <button onClick={(e)=>changeForm(e)} id='Metric'>Metric</button>
      </div>

      {showform === "Standard" ? <Standard setBmi={setBmi} setClick={setClick}/> : <Metric setBmi={setBmi} setClick={setClick}/>}

      {click && Bmi.BMI_Val && <div className="res">
        <p>Your BMI is : <strong>{Bmi.BMI_Val}</strong></p>
        <p>You are <strong>{Bmi.BMI_msge}</strong> according to your BMI</p>
      </div> 
      // we have used this condition instead of (click === true) coz click stayed "true",BMI WAS NOT RESET PROPERLY,IT STILL CONTAINS THE STALE VALUE click === true checks only one condition, while && checks multiple conditions, preventing stale or empty data from rendering.bug was NOT just about click — it was also about stale BMI data.click = true React will show result even if BMI is empty.Old result stays Or empty/incorrect result appears

      /**  
        click must be true
        AND
        Bmi.BMI_Val must exist (truthy) 
      **/
      }
    </div>
  )
}

