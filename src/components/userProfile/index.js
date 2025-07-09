import React,{useState,useEffect} from "react";
import {Link} from "react-router-dom"

import { Navbar } from "../navbar";


import "./index.css";

export function UserProfile(){
    const [userData,setUserData]=useState([]);
    const[loading,setLoading]=useState(false);

      useEffect(
           ()=>{
            const fetchUserData=async()=>{
                setLoading(true);
                const api="https://jsonplaceholder.typicode.com/users";
                const response=await fetch(api);
                const responseData=await response.json();
                console.log("responsedData:",responseData);
                setUserData(responseData[0])
                setLoading(false);
            }
    
            fetchUserData();
    
           },[]
        )


    return(

        <div>
            <Navbar/>
            
            <div className="user-profile-bg">

            {loading?"Loading...":
            
            
            <div className="user-profile-data">
                {userData.name?

                <div>
                     <div>
                        <Link className="back-to-dashboard-link" to="/comments-dashboard">&larr;&nbsp;Welcome,{userData.name}</Link>
                    </div>


                <div className="user-card">
                    <div className="users-names">
                        <span className="user-round-name-profile">
                          {userData.name.split(" ")[0]?.[0]}
                          {userData.name.split(" ")[1]?.[0] || ""}
                        </span>

                        &nbsp;

                       <div>
                       <div className="users-name">{userData.name}</div>
                        <br/>
                       <div className="users-email"> {userData.email}</div>
                       </div>
            `       </div>
                    

                    <div>
                        <div className="user-details">
                            <div className="each">
                        User ID <br/><span className="data">{userData.id}</span>
                            </div>
                            <div className="each">
                        Name <br/><span className="data">{userData.name}</span>
                            </div>
                        </div>
                        <div className="user-details">
                            <div className="each">
                        Email <br/> <span className="data">{userData.email}</span>
                            </div>
                            <div className="each">
                        Address <br/><span className="data">{userData.address.city}</span>
                            </div>
                        </div>
                        <div className="phone">
                        Phone<br/> <span className="data">{userData.phone}</span>
                        </div>
                    </div>

                </div>

                </div>

                    :"User data is not available"
                
                }


            </div>





            }
            </div>


        </div>
    )
}