"use client";

interface Props{
   onClick: () => void
   children:string
}

export default function RetroButton({onClick,children}:Props){
   
   return(
      <button
      className="flex justify-end font-w95 bg-light px-[16px] py-[8px] border border-lightest [border-right:2px_solid_var(--darkest)] [border-bottom:2px_solid_var(--darkest)] active:[border-right:2px_solid_var(--lightest)] active:[border-bottom:2px_solid_var(--lightest)]"
      onClick={onClick}>
         {children}
      </button> 
      
   )
}