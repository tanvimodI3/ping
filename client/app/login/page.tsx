"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";

export default function Login(){

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const router = useRouter();


  async function login(){

    const res = await fetch(
      "https://ping-backend-d6rp.onrender.com/auth/login", //http://localhost:5000/auth/login
      {
        method:"POST",
        headers:{ "Content-Type":"application/json"},
        body:JSON.stringify({email,password})
      }
    );

    const data = await res.json();

    if(res.ok){

      const userid = data.user.id;

      router.push(`/usersearch?userid=${userid}`);

    }

    else alert("invalid credentials");

  }


  return(

    <div>

      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button onClick={login}>
        Login
      </button>

    </div>

  );

}