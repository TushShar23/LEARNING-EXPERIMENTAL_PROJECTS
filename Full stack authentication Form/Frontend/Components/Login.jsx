import { useState } from "react"
import "../src/Login.css"

export const LoginForm = ()=>{
    const [user,setUser] = useState({
        email:"",
        password:""
    })

    const handleSubmit = (e)=>{
        e.preventDefault()

        fetch('')
       

    }

    const handleInput = (e)=>{
        const {value, name} = e.target
        // we have extracted value and name attribute from the TARGET WHICH IS INPUT BOX.
        setUser((prev)=>({...prev,[name]:value}))// implicitly returning an object
    }
    
    return (
        <form onSubmit={(e)=>handleSubmit(e)}>
        <h1>Sign In</h1>

        <section className="email">
                <label htmlFor="email">
                    <strong>Email</strong>
                </label>
                <input name="email" type="text" placeholder="Enter your email" id="email" value={user.email} onChange={(e)=>handleInput(e)}/>
        </section>

        <section className="password">
                <label htmlFor="password">
                    <strong>Last Name</strong>
                </label>
                <input name="password" type="password" placeholder="Enter your password" id="lname" value={user.password} onChange={(e)=>handleInput(e)}/>
        </section>

        <section className="buttons">
            <button type="submit">Sign In</button>
        </section>

        <section className="outputmsge">
            {msge && <p>{msge}</p>}
            {/* empty string is also a FALSY VALUE */}
        </section>

    </form> 
    )
}
    
 