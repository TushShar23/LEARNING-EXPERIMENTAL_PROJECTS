import { useState } from "react"
import { SignUpForm } from "./SignUp"
import { LoginForm } from "./Login"
import "../src/Form.css"


export const Form = ()=>{
    const [state,setState] = useState(true)
    const [signup,setSignup] = useState(true)

    const changeState = (e)=>{
        e.preventDefault()
        setState((prev)=>(!prev))//implicit return so no need to put in curly braces(it means we have write return explicitly)
        setSignup((prev)=>(!prev)) //implicit return so no need to put in curly braces(it means we have write return explicitly) 
    }

    return(
        <div className="container">
            { state === true ? <SignUpForm/> : <LoginForm/>}
            { signup === true ? <a href="#" onClick={(e)=>changeState(e)}>Already have an account</a> : <a href="#" onClick={(e)=>changeState(e)}>New User ? Create an account</a>}
        </div>
    )
}