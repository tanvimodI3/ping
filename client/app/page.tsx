import {useNavigate} from "react-router-dom"
import Window from "./components/window"

export default function Home(){

  const nav = useNavigate()

  return(

    <Window title="welcome">

      <h3>Ping</h3>

      <p>a small messaging place</p>

      <button
      className="retro-button"
      onClick={()=>nav("/login")}
      >
      login
      </button>

      <br/><br/>

      <button
      className="retro-button"
      onClick={()=>nav("/signup")}
      >
      signup
      </button>

    </Window>

  )

}