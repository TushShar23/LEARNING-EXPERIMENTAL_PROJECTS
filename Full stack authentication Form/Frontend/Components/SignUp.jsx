import { useState } from "react"
import "../src/SignUp.css"

export const SignUpForm = ()=>{

    const [user,setUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        phone: ""
    })
    
    const [msge,setMsge] = useState("")
    // for handling output from the http request
    const [form,setForm] = useState(true)

    const handleSubmit = (e)=>{
        e.preventDefault()
        SendData()
    }

    const SendData = ()=>{

        fetch('http://localhost:3000/api/v1/user/signup',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body : JSON.stringify(user)
            // because http requests can only handle text data not JSON OBJECTS.So we converted the JSON OBJECT(user) into string and in CONTENT TYPE we mentioned IT IS JSON FORMAT content.
       })
       .then((res)=>{
         return res.json()
       })
       .then((data)=>{
        setMsge(data.message)
       })
       .catch((err)=>{
        setMsge("Something went wrong!!",err)
       })

        // here we have write the logic for submitting data to backend
    }

    const handleInput = (e)=>{
        const value = e.target.value
        const name = e.target.name
        // OR
        // const { name , value } = e.target
        setUser((prev)=>({...prev,[name]:value}))
    }

    return(
        <form onSubmit={(e)=>handleSubmit(e)}>
            <h1>Sign Up</h1>
            <p>Please fill in this form to create an account</p>

            <section className="firstname">
                    <label htmlFor="firstname">
                        <strong>First Name</strong>
                    </label>
                    <input name="firstname" type="text" placeholder="Enter your first name here" id="fname" value={user.firstname} onChange={(e)=>handleInput(e)}/>
            </section>

            <section className="lastname">
                    <label htmlFor="lastname">
                        <strong>Last Name</strong>
                    </label>
                    <input name="lastname" type="text" placeholder="Enter your Last name here" id="lname" value={user.lastname} onChange={(e)=>handleInput(e)}/>
            </section>

            <section className="email">
                    <label htmlFor="email">
                        <strong>Email</strong>
                    </label>
                    <input name="email" type="text" placeholder="Enter your Email here" id="email" value={user.email} onChange={(e)=>handleInput(e)}/>
            </section>

            <section className="password">
                    <label htmlFor="password">
                        <strong>Password</strong>
                    </label>
                    <input name="password" type="password" placeholder="Enter your Password here" id="password" value={user.password} onChange={(e)=>handleInput(e)}/>
            </section>

            <section className="phone">
                    <label htmlFor="phone">
                        <strong>Phone Number</strong>
                    </label>
                    <input name="phone" type="text" placeholder="Enter your Phone number here" id="phone" value={user.phone} onChange={(e)=>handleInput(e)}/>
            </section>

            <section className="buttons">
                <button type="submit">Sign Up</button>
            </section>

            <section className="outputmsge">
                {msge && <p>{msge}</p>}
                {/* empty string is also a FALSY VALUE */}
            </section>

        </form> 

       
    )
}


