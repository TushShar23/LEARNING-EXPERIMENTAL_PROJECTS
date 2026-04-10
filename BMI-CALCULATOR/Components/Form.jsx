import React, { useState } from 'react'
import "../src/Form.css"
import { Standard } from "../Components/Standard" 
import { Metric } from "../Components/Metric"


export function Form() {
  // so in form there will be a heading and after that there should be two buttons one is one for standard calculator and one for metric
  const [showform,setShowForm] = useState("Standard");

  // i want to show the BMI state in the form so i lifted the state "BMI" and sent the setBmi updator function as prop to the component.

  const [Bmi,setBmi] = useState({
        BMI_Val:"",
        BMI_msge:""
    })

  function changeForm(e){
    setShowForm(e.target.id)
    // this e.target.id will give the name of the button clicked
  }

  return (
    <div className='container'>
      <h1>BMI CALCULATOR</h1>
      <div className="btns">
        <button onClick={(e)=>changeForm(e)} id='Standard'>Standard</button>
        <button onClick={(e)=>changeForm(e)} id='Metric'>Metric</button>
      </div>

      {showform === "Standard" ? <Standard setBmi = {setBmi}/> : <Metric/>}

      <div className="res">
        <h3>{Bmi.BMI_Val}</h3>
        <p>{Bmi.BMI_msge}</p>
      </div>
    </div>
  )
}

