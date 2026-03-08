"use client";


import {useRouter} from "next/navigation";

export default function Flow(){
    const router = useRouter();
    const handleclick = () =>{
        router.push("/login");
    };
    
return (
    <div>
        <button onClick={handleclick}>click</button>
    </div>
);

}