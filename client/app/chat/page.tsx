"use client";
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
const socket = io("http://localhost:8080");
import "./Chat.css";


const Chat = () => {
  const [messages,setMessages] = useState<string[]>([]);
  const [input,setInput]=useState("");
 

  useEffect(() => {
    socket.on('newmessage', (message) => {
      setMessages(prev => [...prev, message]);
    });

    return () => { //cleanup 
      socket.off("newmessage");
    };
  }, []);

  const sendMessage = ()=>{
    if(input.trim()==="") return;
    socket.emit("newmessage",input);
    console.log(`theres smth typed ${input}`);
    setInput("");
  }

  return (
  <div className="chat-container">
      <h2>Socket Chat Test</h2>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>

      <div className="input-area">
        <input
          type="text"
          placeholder="type smth.."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;



  


