"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";


export default function Login() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const router = useRouter();

  async function login() {
    const res = await fetch("http://localhost:5000/auth/login", {
      method:"POST",
      headers:{ "Content-Type": "application/json" },
      body:JSON.stringify({email,password}),
    });


    if (res.ok) router.push("/chat");
    else alert("Invalid credentials");
  }

  return (
    <div className="container">
      <h2>Login</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  );
}
