"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function Signup() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [username,setUsername] = useState("");
  const router = useRouter();

  const signup = async () => {
    const res = await fetch("https://ping-backend-eight.vercel.app/auth/signup", { //http://localhost:5000/auth/signup
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({email,password,username})
    });

    if (res.ok) router.push("/login");
    else alert("Signup failed");
  };

  return (
    <div className="container">
      <h2>Signup</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={signup}>Create Account</button>
    </div>
  );
}
