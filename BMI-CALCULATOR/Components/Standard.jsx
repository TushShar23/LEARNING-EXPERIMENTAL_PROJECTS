import { useState } from "react"
import "../src/Global.css"


export const Standard = ({setBmi,setClick})=>{
    const [userData,setUserdata] = useState({
        weight:"",
        height:""
    })

  

    const handleSubmit = (e)=>{
        e.preventDefault()

        const weight = parseFloat(userData.weight);
        const height = parseFloat(userData.height);
        
        if(!weight || !height){
            alert("Enter valid values");
        }
        else{
            const result = 703 *( (weight) / (height * height));
            const finalRes = Number(result.toFixed(2))

            let message = "";
            if(finalRes < 18.5){
                message = "UnderWeight"
            }
            else if(finalRes < 25){
                message = "Normal"
            }
            else if(finalRes < 30){
                message = "OverWeight"
            }
            else{
                message = "Obese"
            }


            setBmi({
                BMI_Val:finalRes,
                BMI_msge:message
            })

        }




//         if (bmi < 18.5) category = "Underweight"
// else if (bmi < 25) category = "Normal"
// else if (bmi < 30) category = "Overweight"
// else category = "Obese"
    }

    const handleInput = (e)=>{
        const name = e.target.name
        const value = e.target.value

        setUserdata((prev)=>({...prev,[name]:value}))
        // Implicitly returning object

    }
    //handleInput() will set the data inside userData state.


    return(
       <form onSubmit={(e)=>handleSubmit(e)}>
        <section className="fields">
            <section className="weight">
                <label htmlFor="Weight">
                    <strong>Weight(lbs) </strong>
                </label>
                <input type="text" placeholder="Enter your weight" id="Weight" name="weight" value={userData.weight} onChange={(e)=>handleInput(e)}/>
            </section>

            <section className="height">
                <label htmlFor="Height">
                    <strong>Height(in) </strong>
                </label>
                <input type="text" placeholder="Enter your height" id="Height" name="height" value={userData.height} onChange={(e)=>handleInput(e)}/>
            </section>
        </section>
        

        <button id="calculate" type="submit" onClick={setClick(true)}>CALCULATE</button>
       </form>
    )
}