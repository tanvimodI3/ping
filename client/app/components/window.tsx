"use client";
interface a{
    title:any
    children:any
}

export default function Window({title, children}: a){
  return(
    <div className="absolute w-[420px] bg-light flex flex-col border-0.5 border-solid border-dark [border-right:2px_solid_var(--lightest)] [border-bottom:2px_solid_var(--lightest)] [box-shadow:3px_3px_0_var(--darkest)]">
      <div className="h-[24px] flex items-center justify-between px-[6px] py-[4px] bg-dark">
        <span>{title}</span>
        <span>✕</span>
      </div>
      <div className="p-[16px] bg-contrastbg border-0.5 border-solid border-darkest [border-right:2px_solid_var(--lightest)] [border-bottom:2px_solid_var(--lightest)]">
        {children}
      </div>
    </div>
  )

}