"use client";
import {useEffect,useState} from "react"
interface a{
   children:any
}
export default function ResultList({children}:a){
   
   return(
    <div className="w-full bg-contrastbg border-0.5 border-solid border-darkest max-h-[250px] overflow-y-auto">
      {children}
    </div>
   ) 
}

