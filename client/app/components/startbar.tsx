"use client"

import {useEffect,useState} from "react"

export default function StartBar(){

  const [time,setTime]=useState("")

  useEffect(()=>{

    const update=()=>{
      const now=new Date()

      setTime(
        now.toLocaleTimeString([],{
          hour:"2-digit",
          minute:"2-digit"
        })
      )
    }

    update()
    const interval=setInterval(update,1000)
    return()=>clearInterval(interval)
  },[])

  return(

    <div className="start-bar">
      <button className="start-button">
        <img src="/images/start.png"/>
        start
      </button>
      <div className="task-area"/>
      <div className="clock">
        {time}
      </div>
    </div>

  )

}