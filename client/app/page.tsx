"use client";
import {useNavigate} from "react-router-dom"
import Window from "./components/window"
import {useRouter} from "next/navigation";
import RetroButton from "./components/retrobutton";

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

      <RetroButton
      onClick={()=>{handleloginclick()}}
      >
      login
      </RetroButton>

      <br/><br/>

      <RetroButton
      onClick={()=>{handlesignupclick()}}
      >
      signup
      </RetroButton>

    </Window>

  )

}