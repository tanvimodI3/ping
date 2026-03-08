"use client";
import React, { useEffect, useState } from 'react';
import {useSearchParams} from "next/navigation";
import io from 'socket.io-client';
const socket = io("http://localhost:8080");
import "./Chat.css";

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
    fetch("http://localhost:8080/s/messages",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({userid,user2id})
    })
    .then(res=>res.json())
    .then((data:Message[])=>{
      setMessages(data);
    }); 
  },[]);

  useEffect(()=>{
    socket.emit('register',userid);
    socket.on('newmessage', (data) => {
      setMessages((prev:Message[])=>[...prev,{userid:data.from,message:data.message}]);
    });

    return () => { //cleanup 
      socket.off("newmessage");
    };
  }, []);

  const sendMessage = ()=>{
    if(input.trim()==="") return;
    socket.emit("newmessage",{
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



  


