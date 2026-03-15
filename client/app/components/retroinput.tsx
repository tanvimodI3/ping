"use client";

import { ChangeEvent } from "react";

interface Props{
   type:'text' | 'number' | 'email' | 'password'
   value:any
   onChange:(e: ChangeEvent<HTMLInputElement>)=>void
   placeholder:string
} 

export default function RetroInput({type,value,onChange,placeholder}:Props){

   return(

    <div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full box-border p-[8px] mb-[12px] font-w95 border border-darkest [border-right:2px_solid_var(--lightest)] [border-bottom:2px_solid_var(--lightest)]"
      />
    </div>

   ) 
}