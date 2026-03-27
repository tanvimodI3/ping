"use client";

import {SetStateAction, useState} from "react";
import {useRouter} from "next/navigation";
import Window from "../components/window";
import RetroButton from "../components/retrobutton";
import RetroInput from "../components/retroinput"


export default function Login(){

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const router = useRouter();


  async function login(){

    const res = await fetch(
      "https://hshswfizifxcerowmyuf.supabase.co/auth/login", //http://localhost:5000/auth/login
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

    <Window title="login">

      <RetroInput 
        type="email"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}  
        value={email}>
        </RetroInput>
      
      <RetroInput
        type="password"
        placeholder="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}>
      </RetroInput>
      
      <RetroButton
        onClick={login}>
        login
      </RetroButton>

    </Window>

  );

}