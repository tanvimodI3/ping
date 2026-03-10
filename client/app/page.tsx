"use client";
import {useNavigate} from "react-router-dom"
import Window from "./components/window"
import {useRouter} from "next/navigation";

export default function Home(){
    const router = useRouter();

    const handleloginclick=()=>{
        router.push("/login");
    }

    const handlesignupclick=()=>{
        router.push("/signup");
    }


  return(

    <Window title="welcome">

      <h3>ping indie web chat</h3>

      <p>a small messaging place</p>

      <button
      className="retro-button"
      onClick={()=>{handleloginclick()}}
      >
      login
      </button>

      <br/><br/>

      <button
      className="retro-button"
      onClick={()=>{handlesignupclick()}}
      >
      signup
      </button>

    </Window>

  )

}