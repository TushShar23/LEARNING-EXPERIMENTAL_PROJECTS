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

    const handleSubmit = ()=>{
        e.preventDefault()
    }

    const SendData = ()=>{
        console.log(hello)

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
        <form onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <p>Please fill in this form to create an account</p>

            <section className="FirstName">
                    <label htmlFor="FirstName">
                        <strong>First Name</strong>
                    </label>
                    <input name="FirstName" type="text" placeholder="Enter your first name here" id="fname" value={user.firstname} onChange={(e)=>handleInput(e)}/>
            </section>

            <section className="LastName">
                    <label htmlFor="LastName">
                        <strong>Last Name</strong>
                    </label>
                    <input name="LastName" type="text" placeholder="Enter your Last name here" id="lname" value={user.lastname} onChange={(e)=>handleInput(e)}/>
            </section>

            <section className="Email">
                    <label htmlFor="Email">
                        <strong>Email</strong>
                    </label>
                    <input name="Email" type="text" placeholder="Enter your Email here" id="Email" value={user.email} onChange={(e)=>handleInput(e)}/>
            </section>

            <section className="Password">
                    <label htmlFor="Password">
                        <strong>Password</strong>
                    </label>
                    <input name="Password" type="password" placeholder="Enter your Password here" id="Password" value={user.password} onChange={(e)=>handleInput(e)}/>
            </section>

            <section className="Phone">
                    <label htmlFor="Phone">
                        <strong>Phone Number</strong>
                    </label>
                    <input name="Phone" type="text" placeholder="Enter your Phone number here" id="Phone" value={user.phone} onChange={(e)=>handleInput(e)}/>
            </section>

            <section className="buttons">
                <button onClick={SendData}>Sign Up</button>
            </section>
        </form>
    )
}


