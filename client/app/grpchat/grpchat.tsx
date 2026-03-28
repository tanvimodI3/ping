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
  roomid:string
  messages:string
  userid:string
  username:string
}

interface Groups{
  name:string
}

const Room=()=>{
  const params=useSearchParams();

  const userid=params.get("userid");
  const roomid=params.get("roomid");


  const [messages,setMessages] = useState<Message[]>([]);
  const [name,setName]=useState<Groups[]>([]);
  const [input,setInput]=useState("");
  const [to,setTo]=useState("");
 
  useEffect(()=>{
      if(!roomid) return; //this ones for the name 
      fetch("https://ping-backend-d6rp.onrender.com/s/grpname",{//http://localhost:8080/s/username
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({roomid})
    })
    .then(res=>res.json())
    .then((data:Groups[])=>{
      setName(data);
    }); 
  },[roomid]);

//old msgs
  useEffect(() => {
    if(!userid || !roomid) return;

    fetch("https://ping-backend-d6rp.onrender.com/s/msgs",{//http://localhost:8080/s/messages
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({userid,roomid})
    })
    .then(res=>res.json())
    .then((data:Message[])=>{
      const Data = data.map(msg => ({
        ...msg,
        userid: String(msg.userid),
        roomid: String(msg.roomid)
      }));
      setMessages(Data);
      console.log(Data);
    }); 
  },[userid,roomid]);

  const [s,setS] = useState<any>(null); //takes any
  useEffect(()=>{
    if(!userid || !roomid) return;
    //to stop re rendering []
    const socket = io("https://ping-backend-d6rp.onrender.com", {
    transports:["websocket","polling"]
    }); //http://localhost:8080
    setS(socket);

    socket.emit('register',userid);
    socket.emit('joinRoom', roomid);
    
    socket.on('groupmessage', (data) => {
      setMessages((prev:Message[])=>[...prev,{userid:String(data.from),messages:data.messages,roomid:String(data.roomid),username:data.username}]);
    });

    return () => { //cleanup 
      socket.off("groupmessage");
      socket.disconnect();
    };
  }, [userid, roomid]);

  const sendMessage = ()=>{
    if(!s || !roomid) return;
    if(input.trim()==="") return;
    s.emit("groupmessage",{
      "from":userid,
      "roomid":roomid,
      "messages":input,
    });
   setMessages((prev: Message[]) => [
    ...prev,
  {
    userid: userid as string,
    messages: input,
    roomid: roomid as string,
    username: "you"
  }
  ]);  
    console.log(`theres smth typed ${input}`);
    setInput("");
  }

  return (
 <Window title={`chat w ${name[0]?.name}`}>
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

export default Room;



  


