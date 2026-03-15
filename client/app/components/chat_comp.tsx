"use client"

interface Message{
  userid:string
  messages:string
}

interface Props{
  messages:Message[]
  currentUser:string | null
}

export default function ChatBox({messages,currentUser}:Props){

  return(
    <div
      className="h-[280px] overflow-y-auto border-0.5 border-darkest bg-[white]p-[10px]mb-[10px]flexflex-colgap-[8px]">
      {messages.map((msg,index)=>{
        const mine = msg.userid === currentUser
        return(
          <div key={index} className={`flex ${mine?"justify-end":"justify-start"}`}>
            <div className={`max-w-[70%] px-[10px] py-[6px] text-[14px] border-0.5 border-darkest  rounded-[6px] shadow-[3px_3px_0_var(--darkest)] ${mine? "bg-light": "bg-mid"}`}>
              {msg.messages}
            </div>
          </div>
        )
      })}
    </div>
  )
}