"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";

import Window from "../components/window";

export default function Signup() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [username,setUsername] = useState("");
  const router = useRouter();

  const signup = async () => {
    const res = await fetch("https://ping-backend-d6rp.onrender.com/auth/signup", { //http://localhost:5000/auth/signup
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({email,password,username})
    });

    if (res.ok) router.push("/login");
    else alert("signup failed");
  };

  return (

    <Window title="signup">

      <input 
      className="retro-input"
      placeholder="email"
      onChange={e => setEmail(e.target.value)} 
      />

      <input 
      className="retro-input"
      placeholder="username" 
      onChange={e => setUsername(e.target.value)} 
      />

      <input 
      className="retro-input"
      type="password" 
      placeholder="Password" 
      onChange={e => setPassword(e.target.value)} 
      />

      <button 
      className="retro-button"
      onClick={signup}>
        Create Account
        </button>

    </Window>
  );
}
