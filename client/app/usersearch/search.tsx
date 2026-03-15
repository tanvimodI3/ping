"use client";
export const dynamic = "force-dynamic";

import {useState} from "react";
import {useRouter,useSearchParams} from "next/navigation";
import {useEffect} from "react";

import Window from "../components/window";
import RetroInput from "../components/retroinput";
import ResultList from "../components/resultlist";




interface User {
  userid:string;
  username:string;
}

interface Group{
  roomid:string;
  name:string;
}

export default function Users() {
  const router=useRouter();
  const searchParams=useSearchParams();

  const userid=searchParams.get("userid");

  useEffect(() => {
    fetch('https://ping-backend-d6rp.onrender.com/users/usersearch') //http://localhost:5000/users/usersearch
      .then(res => res.json()) //back to js obj 
      .then(data => {
        console.log(data)
        setUsers(data.rows)
        setFilteredUsers(data.rows)
      })
      .catch(err => console.log(err))
  }, [])

  const[users,setUsers]=useState<User[]>([]);
  const [searchItem, setSearchItem] = useState('')
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)
    console.log(searchItem) 

    const filteredItems = users.filter((user) => //filter inbuilt funct
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log(filteredItems)
    setFilteredUsers(filteredItems);
    //const result = filteredUsers;
  }

  const handleclick = async (user:User) => {
    router.push(`/chat?userid=${userid}&user2id=${user.userid}`);
    //   const res = await fetch("https://ping-backend-d6rp.onrender.com/s/connection", { //http://localhost:8080/s/connection
    //     method:"POST",
    //     headers:{ "Content-Type": "application/json" },
    //     body:JSON.stringify({userid,user2id:user.userid})
  }
  
    useEffect(() => {
    fetch('https://ping-backend-d6rp.onrender.com/users/grpsearch') //http://localhost:5000/users/usersearch
      .then(res => res.json()) //back to js obj 
      .then(data => {
        console.log(data)
        setGrps(data.rows)
        setFilteredGrps(data.rows)
      })
      .catch(err => console.log(err))
  }, [])

 
  const[grps,setGrps]=useState<Group[]>([]);
  const [searchGrp, setSearchGrp] = useState('')
  const [filteredGrps, setFilteredGrps] = useState<Group[]>([])

  const handleInputChange2 = (e: React.ChangeEvent<HTMLInputElement>) => { 
    const searchGrp = e.target.value;
    setSearchGrp(searchGrp)
    console.log(searchGrp) 

    const filteredGrps = grps.filter((grp) =>
    grp.name.toLowerCase().includes(searchGrp.toLowerCase())
    );
    console.log(filteredGrps)
    setFilteredGrps(filteredGrps);
  }

  const handleclick2 = async (grp:Group) => {
  router.push(`/grpchat?userid=${userid}&roomid=${grp.roomid}`);
}

  

  return (
    <div className="flex-box">
    <Window title="search">
      <RetroInput
        type="text"
        value={searchItem}
        onChange={handleInputChange}
        placeholder="who do u wanna talk to?">
      </RetroInput>
      <ResultList>
          {filteredUsers.map(user => (
            <div key={user.userid} className="result-item"  onClick={()=>handleclick(user)}>
              {user.username}
            </div>
          ))} 
      </ResultList>
        
    </Window>

    <br/><br/><br/>

      <Window title="grps">
      <RetroInput
        type="text"
        value={searchGrp}
        onChange={handleInputChange2}
        placeholder="search rooms">
      </RetroInput>
      <ResultList>
          {filteredGrps.map(grp => (
            <div key={grp.roomid} className="result-item"  onClick={()=>handleclick2(grp)}>
              {grp.name}
            </div>
          ))} 
      </ResultList>
        
    </Window>
    </div>
  )
}



    




    



