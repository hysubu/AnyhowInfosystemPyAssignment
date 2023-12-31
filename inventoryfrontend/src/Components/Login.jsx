import React, { useState } from 'react'

const Login = () => {


    const [username , PickUsername] = useState("")
    const[password , PickPassword] = useState("")



// when User Login this function is work 
    const handleLogin = () =>{
        let input ={
            username :username, 
            password : password
        }


        let requestoption = {
            method: "POST",
            headers:{"Content-type":"application/json"}, 
            body:JSON.stringify(input)
        }

        fetch("http://127.0.0.1:8000/api/login/" ,requestoption)
        .then(response => response.json())
        .then(data => {
            if(data.success == true){
                localStorage.setItem("token" , username)
                localStorage.setItem("role", data.role)
                alert(data.message)
            }else if (data.success == false){
                alert(data.message)
            }
        })
    }





  return (
    <div className='login-div'>
        <h2>Login</h2>

        <div >
            <form action="">
                <input type="text" onChange={obj=> PickUsername(obj.target.value)} placeholder='username' required/>
                <input type="password" onChange={obj=> PickPassword(obj.target.value)} placeholder='password' required  />
                <button onClick={handleLogin} >Login</button>
            </form>
        </div>
        
    </div>
  )
}

export default Login