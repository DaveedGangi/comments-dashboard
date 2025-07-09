import React,{useEffect,useState} from "react";

import "./index.css";

export function Navbar(){
    const [userName,setUsername]=useState("");
    const [loading,setLoading]=useState(false);

    useEffect(
       ()=>{
        const fetchUserData=async()=>{
            setLoading(true)
            const api="https://jsonplaceholder.typicode.com/users";
            const response=await fetch(api);
            const responseData=await response.json();
            console.log("userInfo: ",responseData)
            setUsername(responseData[0].name)
            setLoading(false);
        }

        fetchUserData();

       },[]
    )


    return(

        <div className="nav-bar">

            <div>
                SWIFT
            </div>

            {loading?"loading...":

            <div className="user-name">
                <span className="user-round-name">
                    
                      {userName.split(" ")[0]?.[0]}
                      {userName.split(" ")[1]?.[0] || ""}
                </span>

                        &nbsp;
                {userName?userName:""}
              
            </div>

            }

        </div>
    )
}