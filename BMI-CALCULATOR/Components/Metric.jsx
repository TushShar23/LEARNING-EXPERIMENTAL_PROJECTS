import { useState } from "react"

export const Metric = ({setBmi})=>{

    const [userData,setUserdata] = useState({
        height:"",
        weight:""
    })

    const handleSubmit = (e)=>{
        e.preventDefault()

        const weight = parseFloat(userData.weight)
        const height = parseFloat(userData.height)

        if(!weight || !height){
            alert("Enter valid values")
        }
        else{
            const res = weight / (height*height)
            const bmi = Number(res.toFixed(2))

            let message = "";
            if(bmi < 18.5){
                message = "UnderWeight"
            }
            else if(bmi < 25){
                message = "Normal"
            }
            else if(bmi < 30){
                message = "OverWeight"
            }
            else{
                message = "Obese"
            }

            setBmi({
                BMI_Val:bmi,
                BMI_msge:message
            })

        }
    }

    const handleInput = (e)=>{
        const name = e.target.name
        const value = e.target.value

        setUserdata((prev)=>({...prev,[name]:value}))
    }

    return(
        <form onSubmit={(e)=>handleSubmit(e)}>
        <section className="weight">
            <label htmlFor="Weight">
                <strong>Weight(kg)</strong>
            </label>
            <input type="text" placeholder="Enter your weight" id="Weight" name="weight" value={userData.weight} onChange={(e)=>handleInput(e)}/>
        </section>

        <section className="height">
            <label htmlFor="Height">
                <strong>Height(m)</strong>
            </label>
            <input type="text" placeholder="Enter your height" id="Height" name="height" value={userData.height} onChange={(e)=>handleInput(e)}/>
        </section>

        <button id="calculate" type="submit">CALCULATE</button>
       </form>
    )
}