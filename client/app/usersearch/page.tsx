"use client";
import {useState} from "react";
import {useRouter,useSearchParams} from "next/navigation";
import {useEffect} from "react";

import "./filter.css"

interface User {
  userid:string;
  username:string;
}

export default function Users() {
  const router=useRouter();
  const searchParams=useSearchParams();

  const userid=searchParams.get("userid");

  useEffect(() => {
    fetch('http://localhost:5000/users/usersearch')
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
      const res = await fetch("http://localhost:8080/s/connection", {
        method:"POST",
        headers:{ "Content-Type": "application/json" },
        body:JSON.stringify({userid,user2id:user.userid})
  });
  
      router.push(`/chat?userid=${userid}&user2id=${user.userid}`);
  }

  return (
    <div>
      <input
        type="text"
        value={searchItem}
        onChange={handleInputChange}
        placeholder='Type to search'
      />
      <div className="results-list">
          {filteredUsers.map(user => (
            <div key={user.userid} className="result-item"  onClick={()=>handleclick(user)}>
              {user.username}
            </div>
          ))} 
      </div>
        
      
    </div>
  )
}



    



// "use client";
// import {useState} from "react";
// import {useRouter} from "next/navigation";
// import { useEffect } from "react";

// interface User {
//   userid: string;
//   username: string;
// }

// export default function Users() {
//   const [apiUsers, setApiUsers] = useState<User[]>([])
//   const [searchItem, setSearchItem] = useState('')
//   //initial state of filteredUsers to an empty array
//   const [filteredUsers, setFilteredUsers] = useState<User[]>([])


//   // fetch the users
//   useEffect(() => {
//     fetch('http://localhost:5000/users/usersearch')  
//       .then(response => response.json())
//       //.then(data=>console.log(data))
//       // save the complete list of users to the new state
//       .then(data => setApiUsers(data))
//       // if there's an error we log it to the console
//       .catch(err => console.log(err))
//   }, [])

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
//     const searchTerm = e.target.value;
//     setSearchItem(searchTerm)

//     // filter the items using the apiUsers state
//     const filteredItems = apiUsers.filter((user) =>
//       user.username.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     setFilteredUsers(filteredItems);
//   }

//   return (
//     <>
//       <input
//         type="text"
//         value={searchItem}
//         onChange={handleInputChange}
//         placeholder='Type to search'
//       />
//       <ul>
//         {filteredUsers.map(user => <li key={user.userid}>{user.username}</li>)}
//       </ul>
//     </>
//   )
// }



    



