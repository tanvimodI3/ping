"use client";
export const dynamic = "force-dynamic";

import {useEffect,useState} from 'react';
import {useSearchParams} from "next/navigation";
import io from 'socket.io-client';

import Window from "../components/window";
import ChatBox from '../components/chat_comp';
import RetroInput from '../components/retroinput';
import RetroButton from '../components/retrobutton';



export const fetchCache = "force-no-store";

interface Message{
  userid:string
  messages:string
}

interface User{
  username:string
}

const Chat=()=>{
  const params=useSearchParams();

  const userid=params.get("userid");
  const user2id=params.get("user2id");
  const roomid=params.get("roomid");


  const [messages,setMessages] = useState<Message[]>([]);
  const [username,setUsername]=useState<User[]>([]);
  const [input,setInput]=useState("");
  const [to,setTo]=useState("");
 
  useEffect(()=>{
      if(!user2id) return;
      fetch("https://ping-backend-d6rp.onrender.com/s/username",{//http://localhost:8080/s/username
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({user2id})
    })
    .then(res=>res.json())
    .then((data:User[])=>{
      setUsername(data);
    }); 
  },[user2id]);

//old msgs
  useEffect(() => {
    if(!userid || !user2id) return;

    fetch("https://ping-backend-d6rp.onrender.com/s/messages",{//http://localhost:8080/s/messages
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({userid,user2id})
    })
    .then(res=>res.json())
    .then((data:any[])=>{
      const formatted = data.map((msg)=>({
      userid: String(msg.userid),
      messages: msg.messages
      }));
      setMessages(formatted);
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
      setMessages((prev:Message[])=>[...prev,{userid:data.from,messages:data.messages}]);
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
      "messages":input,

    });
   setMessages((prev: Message[]) => [
    ...prev,
  {
    userid: userid as string,
    messages: input
  }
  ]);  
    console.log(`theres smth typed ${input}`);
    setInput("");
  }

  return (
 <Window title={`chat w ${username[0]?.username}`}>
      <ChatBox messages={messages} currentUser={userid}>
      </ChatBox>

      <div className="chat-input">

        <RetroInput
          type="text"
          value={input}
          placeholder="type message..."
          onChange={(e)=>setInput(e.target.value)}>
        </RetroInput>
      

        <RetroButton
          onClick={sendMessage}>
          send
        </RetroButton>

      </div>

  </Window>

  )

}

export default Chat;



  


