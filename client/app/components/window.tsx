"use client";

interface Props{
    title:any
    children:any
}

export default function Window({title, children}: Props){

  return(

    <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[420px] bg-light flex flex-col border border-dark [border-right:2px_solid_var(--lightest)] [border-bottom:2px_solid_var(--lightest)] [box-shadow:3px_3px_0_var(--darkest)]">

      <div className="h-[24px] flex items-center justify-between px-[6px] py-[4px] bg-dark text-white">
        <span>{title}</span>
        <span>✕</span>
      </div>

      <div className="p-[16px] bg-contrastbg border border-darkest [border-right:2px_solid_var(--lightest)] [border-bottom:2px_solid_var(--lightest)]">
        {children}
      </div>

    </div>

  )

}