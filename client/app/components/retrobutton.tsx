"use client";
import {useEffect,useState} from "react"
interface a{
   onClick: () => void
   children:string
}
export default function RetroButton({onClick,children}:a){
   
   return(
      
      <button
      className="font-w95 bg-light px-[16px] py-[8px] border-0.5 border-solid border-lightest [border-right:2px_solid_var(--darkest)] [border-bottom:2px_solid_var(--darkest)] 
      active: border-0.5 dark active:[border-right:2px_solid_var(--lightest)] active:[border-bottom:2px_solid_var(--lightest)]"
      onClick={onClick}>
         {children}
      </button>
      
   )
}

