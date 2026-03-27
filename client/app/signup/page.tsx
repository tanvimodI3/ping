"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";

import Window from "../components/window";
import RetroButton from "../components/retrobutton";
import RetroInput from "../components/retroinput"


export default function Signup() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [username,setUsername] = useState("");
  const router = useRouter();

  const signup = async () => {
    const res = await fetch("https://hshswfizifxcerowmyuf.supabase.co/auth/signup", { //http://localhost:5000/auth/signup
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({email,password,username})
    });

    if (res.ok) router.push("/login");
    else alert("signup failed");
  };

  return (

    <Window title="signup">

      <RetroInput
      placeholder="email"
      type="email"
      value={email}
      onChange={e => setEmail(e.target.value)}>
      </RetroInput>
    

      <RetroInput
      placeholder="username" 
      type="text"
      value={username}
      onChange={e => setUsername(e.target.value)}>
      </RetroInput>

      <RetroInput
        type="password"
        placeholder="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}>
      </RetroInput>

      <RetroButton
      onClick={signup}>
        create account
        </RetroButton>

    </Window>
  );
}
