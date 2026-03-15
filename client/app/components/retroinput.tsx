"use client";
import { ChangeEvent } from "react";
import {Children, useEffect,useState} from "react"
  interface a{
   type:'text' | 'number' | 'email' | 'password'
   value:any
   onChange:(e: ChangeEvent<HTMLInputElement>)=>void
   placeholder:string
  } 

export default function RetroInput({type,value,onChange,placeholder}:a){
   return(
   <div>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full box-border p-[8px] mb-[12px] font-w95 border-0.5 border-solid border-darkest [border-right:2px_solid_var(--lightest)] [border-bottom:2px_solid_var(--lightest"
    />
    </div>
   ) 
}

