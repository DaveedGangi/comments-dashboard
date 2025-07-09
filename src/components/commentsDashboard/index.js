import React,{ useEffect,useState} from "react";

import { Navbar } from "../navbar";

import "./index.css";

export function CommentsDashboard(){
    const [userCommentData,setUserCommentData]=useState([]);
    const [currentPage,setCurrentPage]=useState(()=>Number(localStorage.getItem("currentPage"))|| 1);
    const [itemsPerPage,setItemsPerPage]=useState(()=>Number(localStorage.getItem("itemsPerPage"))|| 10);
    
    const[searchTerm,setSearchTerm]=useState(()=>localStorage.getItem("searchTerm")|| "");
    const [sortConfig,setSortConfig]=useState(()=>{
        const savedSort=localStorage.getItem("sortConfig");
        return savedSort?JSON.parse(savedSort):{key:null,direction:null}
    })

    // for api fetch
    useEffect(
        ()=>{
            const fetchCommentData=async()=>{
                const api="https://jsonplaceholder.typicode.com/comments";
                const response=await fetch(api);
                const responsedData=await response.json();
                console.log("Comments Data :",responsedData);
                setUserCommentData(responsedData);

            }
            fetchCommentData();
        },[]
    )


    useEffect(() => {
        localStorage.setItem("currentPage", currentPage);
        }, [currentPage]);

        useEffect(() => {
        localStorage.setItem("itemsPerPage", itemsPerPage);
        }, [itemsPerPage]);

        useEffect(() => {
        localStorage.setItem("searchTerm", searchTerm);
        }, [searchTerm]);






    const filteredData=userCommentData.filter((each)=>{
        const term=searchTerm.toLowerCase();
        return (each.name.toLowerCase().includes(term)||
                each.email.toLowerCase().includes(term)||
                each.body.toLowerCase().includes(term)
            )
    })

    const totalItems=filteredData.length;
    const totalPages=Math.ceil(totalItems/itemsPerPage);

    const startIndex=(currentPage-1)*itemsPerPage 
    const endIndex=startIndex+itemsPerPage
    let sortedData = [...filteredData];

    if (sortConfig.key && sortConfig.direction) {
    sortedData.sort((a, b) => {
        const aValue = a[sortConfig.key]?.toString().toLowerCase();
        const bValue = b[sortConfig.key]?.toString().toLowerCase();

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
    });
    }



    const currentItems=sortedData.slice(startIndex,endIndex);


    const handleItemsPerPageChange=(e)=>{
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1); // reset to first page
    }

    const handlePageChange=(page)=>{
        if(page>=1 && page<=totalPages){
            setCurrentPage(page);
        }
    }

    const handleSort = (column) => {
        let direction = "asc";

        if (sortConfig.key === column) {
            if (sortConfig.direction === "asc") direction = "desc";
            else if (sortConfig.direction === "desc") direction = null;
            else direction = "asc";
        }

        const newSort = {
            key: direction ? column : null,
            direction,
        };

        setSortConfig(newSort);
        localStorage.setItem("sortConfig", JSON.stringify(newSort));
        };


    return(

        <div>
            <Navbar/>

          
            
            <div className="comment-body">
                <div className="search-and-sorting">
                    <div>
                    <button className="sort-postId-button" onClick={() => handleSort("postId")}>
                    Sort Post Id {sortConfig.key === "postId" ? (sortConfig.direction === "asc" ? "↑" : sortConfig.direction === "desc" ? "↓" : "") : ""}
                    </button>

                    <button className="sort-name-button" onClick={() => handleSort("name")}>
                    Sort Name {sortConfig.key === "name" ? (sortConfig.direction === "asc" ? "↑" : sortConfig.direction === "desc" ? "↓" : "") : ""}
                    </button>

                    <button className="sort-email-button" onClick={() => handleSort("email")}>
                    Sort Email {sortConfig.key === "email" ? (sortConfig.direction === "asc" ? "↑" : sortConfig.direction === "desc" ? "↓" : "") : ""}
                    </button>
                    </div>

                    <div>
                  <input className="search-value" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} type="search" placeholder="Search name,email,comment" />
                    </div>
                </div>
           
            <div className="comment-headings">
                <div className="post-id">Post Id</div>
                <div className="commented-user-name">Name</div>
                <div className="comment-email">Email</div>
                <div className="comment-data">Comment</div>
            </div>

                {
                    currentItems.map((comment)=>{
                        return(<div key={comment.id}>
                            <div className="each-comment">
                               <div className="post-id"> {comment.postId}</div>
                               <div className="commented-user-name"> {comment.name.slice(0,22)} </div>
                                <div className="comment-email">{comment.email}</div>
                                <div className="comment-data">{comment.body.slice(0,44)}...</div>
                            </div>
                        </div>)
                    })
                }


            <div className="pagination">
                {startIndex===0?startIndex+1:startIndex}-{endIndex} of {totalItems} items

                <button className="lessThan-page-button" onClick={()=>handlePageChange(currentPage-1)}>&lt;</button>
                <button className="current-page-button" onClick={()=>handlePageChange(currentPage)}>{currentPage}</button>
                {currentPage<totalPages&&
                <button className="next-page-button" onClick={()=>handlePageChange(currentPage+1)}>{currentPage+1}</button>
                }
                <button className="greaterThan-page-button" onClick={()=>handlePageChange(currentPage+1)}>&gt;</button>

                <select className="select-options-per-page" onChange={handleItemsPerPageChange} value={itemsPerPage}>
                    <option value="10">10/Page</option>
                    <option value="50">50/Page</option>
                    <option value="100">100/Page</option>
                </select>
            </div>



            </div>
        </div>
    )
}