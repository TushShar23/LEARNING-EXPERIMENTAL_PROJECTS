import { useState } from "react"
import "../src/Login.css"

export const LoginForm = ()=>{
    const [user,setUser] = useState({
        email:"",
        password:""
    })

    const [msge,setMsge] = useState("")

    const handleSubmit = (e)=>{
        e.preventDefault()
        sendData()
    }

    const sendData = ()=>{
        fetch('http://localhost:3000/api/v1/user/signin',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(user)
        })
        .then((res)=>{
            return res.json()
        })
        .then((data)=>{
            if(data.success){
                setMsge(data.name)
            }
            else{
                setMsge(data.message)
            }
        })
        .catch((err)=>{
            setMsge("SOMETHING WENT WRONG WHILE LOGGING IN!!")
        })
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
                    <strong>Password</strong>
                </label>
                <input name="password" type="password" placeholder="Enter your password" id="lname" value={user.password} onChange={(e)=>handleInput(e)}/>
        </section>

        <section className="buttons">
            <button type="submit">Sign In</button>
        </section>

        <section className="outputmsge">
            {msge && <p>{JSON.stringify(msge)}</p>}
            {/* empty string is also a FALSY VALUE */}
        </section>

    </form> 
    )
}
    
 