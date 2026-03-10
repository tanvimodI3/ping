"use client";
interface a{
    title:any
    children:any
}

export default function Window({title, children}: a){
  return(
    <div className="window">
      <div className="window-header">
        <span>{title}</span>
        <span>✕</span>
      </div>
      <div className="window-body">
        {children}
      </div>
    </div>
  )

}