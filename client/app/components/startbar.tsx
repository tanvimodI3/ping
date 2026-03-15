"use client"

import {useEffect,useState} from "react"
import {useRouter} from "next/navigation"


export default function StartBar(){

  const [time,setTime]=useState("")
  useEffect(()=>{

    const update=()=>{
      const now=new Date()
      setTime(
        now.toLocaleTimeString([],{
          hour:"2-digit",
          minute:"2-digit",
          second:"2-digit"
        })
      )
    }

    update()
    const interval=setInterval(update,1000)
    return()=>clearInterval(interval)
  },[])

    const router=useRouter();
    const handleclick=()=>{
      router.push("/page.tsx");
    }
    

  return(

    <div className="fixed bottom-[0] left-[0] w-full h-[32px] flex items-center p-[4px] bg-light [border-top:2px_solid_var(--lightest)]">
      <button className="flex items-center gap-[6px] font-w95 px-[10px] py-[4px] bg-light border-0.5 border-solid border-lightest [border-right:2px_solid_var(--darkest)] [border-bottom:2px_solid_var(--darkest)]"
              onClick={()=>{handleclick()}}>
        <img className="h-[16px]" src="/images/berry.png"/>
        start
      </button>
      <div className="flex-1"/>
      <div className="px-[8px] py-[4px] border-0.5 border-solid border-lightest [border-left:2px_solid_var(--darkest)] [border-top:2px_solid_var(--darkest)]">
        {time}
      </div>
    </div>

  )

}