import React from 'react'
import NavBar from '../components/NavBar.jsx'
import RateLimitedUI from '../components/RateLimitedUI.jsx'
import { useState,useEffect} from 'react'
import axios from "axios"
import toast from 'react-hot-toast'
import NoteCard from '../components/NoteCard.jsx'
import api from '../lib/axios.js'
const HomePage = () => {
  
  const [isRateLimited,setIsRateLimited] = useState(false)
  const [notes,setNotes] = useState([])
  const [loading,isLoading] = useState(true)
  const fetchNotes = async ()=>{
    try{
    const res = await api.get("/notes")
    console.log(res.data);
    setNotes(res.data);
    setIsRateLimited(false);
    }
    catch(error){
      console.log("Error fetching Notes")
      if (error.response.status==429){
        setIsRateLimited(true);
      } 
      else{
        toast.error("Failed to load notes");
      }

    }
    finally{
      isLoading(false)
    }
  }
  useEffect(()=>{

    fetchNotes();

  },[])

  return (
    <div className = "min-h-screen"> 
    <NavBar/>

    {isRateLimited && <RateLimitedUI/>}
    <div className="max-w-7xl mx-auto p-4 mt-6">
      {loading && <div className="text-center text-primary py-10"> Notes Loading </div>}
      {notes.length>0 && !isRateLimited && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map(note => (
            <NoteCard key={note._id} note={note} setNotes={setNotes} />
          ))}

        </div>

      )}

    </div>
    </div>

  )
}

export default HomePage
