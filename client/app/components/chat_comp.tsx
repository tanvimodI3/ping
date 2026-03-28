"use client"

interface Message{
  userid:string
  messages:string
  username?:string
}

interface Props{
  messages:Message[]
  currentUser:string | null
}

export default function ChatBox({messages,currentUser}:Props){

  return(
    <div
      className="h-[280px] overflow-y-auto border border-darkest bg-white p-[10px] mb-[10px] flex flex-col gap-[8px]"
    >
      {messages.map((msg,index)=>{
        const mine = msg.userid === currentUser

        return(
          <div key={index} className={`flex ${mine ? "justify-end" : "justify-start"}`}>

            <div
              className={`max-w-[70%] px-[10px] py-[6px] text-[14px] border border-darkest rounded-[6px] [box-shadow:3px_3px_0_var(--darkest)] ${
                mine ? "bg-light" : "bg-mid"
              }`}
            >
              <div className="flex flex-col">
               <span>{msg.messages}</span>

            {!mine && msg.username && (
                <span className="text-[10px] opacity-60 mt-[2px]">
                   {msg.username}
                </span>
            )}
            </div>
            </div>

          </div>
        )
      })}
    </div>
  )
}