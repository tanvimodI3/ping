"use client";
export const dynamic = "force-dynamic";

import {useEffect,useState} from 'react';
import {useSearchParams} from "next/navigation";
import io from 'socket.io-client';
import "./Chat.css";


export const fetchCache = "force-no-store";

interface Message{
  userid:string
  message:string
}

const Chat = () => {
  const params = useSearchParams();

  const userid = params.get("userid");
  const user2id = params.get("user2id");


  const [messages,setMessages] = useState<Message[]>([]);
  const [input,setInput]=useState("");
  const [to,setTo]=useState("");
 

  useEffect(() => {
    if(!userid || !user2id) return;

    fetch("https://ping-backend-d6rp.onrender.com/s/messages",{    //http://localhost:8080/s/messages
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({userid,user2id})
    })
    .then(res=>res.json())
    .then((data:Message[])=>{
      setMessages(data);
    }); 
  },[userid,user2id]);



  const [s,setS] = useState<any>(null); //takes any
  useEffect(()=>{
    if(!userid) return;
    //to stop re rendering []
    const socket = io("https://ping-backend-d6rp.onrender.com", {
    transports:["websocket","polling"]
    }); //http://localhost:8080
    setS(socket);

    socket.emit('register',userid);
    socket.on('newmessage', (data) => {
      setMessages((prev:Message[])=>[...prev,{userid:data.from,message:data.message}]);
    });

    return () => { //cleanup 
      socket.off("newmessage");
      socket.disconnect();
    };
  }, [userid]);

  const sendMessage = ()=>{
    if(!s) return;
    if(input.trim()==="") return;
    s.emit("newmessage",{
      "from":userid,
      "to":user2id ,
      "message":input,

    });
   setMessages((prev: Message[]) => [
    ...prev,
  {
    userid: userid as string,
    message: input
  }
  ]);  
    console.log(`theres smth typed ${input}`);
    setInput("");
  }

  return (
 <div className="chat-container">

      <div className="chat-header">
        Chat with user {user2id}
      </div>

      <div className="chat-box">

        {messages.map((msg,index)=>{

          const mine = msg.userid == userid;

          return(

            <div
              key={index}
              className={`chat-message ${mine ? "my-msg" : "other-msg"}`}
            >
              {msg.message}
            </div>

          )

        })}

      </div>

      <div className="chat-input">

        <input
          value={input}
          placeholder="type message..."
          onChange={(e)=>setInput(e.target.value)}
        />

        <button onClick={sendMessage}>
          Send
        </button>

      </div>

  </div>

  )

}

export default Chat;



  


