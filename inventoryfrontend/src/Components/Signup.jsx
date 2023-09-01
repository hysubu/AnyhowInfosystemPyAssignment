import React, { useState } from 'react'

const Signup = () => {


    const[username , PickUsername] = useState("")
    const[email , PickEmail] = useState("")
    const [password , PickPassword ]=useState("");


    const handelSignup = () =>{
        let input = {
            username : username,
            email : email, 
            password : password
        }

        let reqestOptions = {
            method: "POST",  
            headers:{"Content-type":"application/json"}, 
            body:JSON.stringify(input)
        }
        fetch("http://127.0.0.1:8000/api/signup/" ,reqestOptions)
        .then(response => response.json())
        .then(data =>{
            if(data.success == true){
                alert(data.message)
            }else{
                alert (data.message)
            }
        })
    }




  return (
    <div className='signup-div'>
        <h2>Signup Here </h2>
    <div>
        <form action="">
        <input type="text" onChange={obj => PickUsername(obj.target.value)} placeholder='Username' />
        <br />
        <input type="email" onChange={obj => PickEmail(obj.target.value)}  placeholder='Email' />
        <br />
        <input type="password" onChange={obj => PickPassword(obj.target.value)}  placeholder='Password' />
        <button onClick={handelSignup}>Submit</button>
        </form>
    </div>

    </div>
  )
}

export default Signup