import axios from 'axios'
import React, { useEffect, useState} from 'react'
import { useNavigate,useParams,Link } from 'react-router'
import api from '../lib/axios.js'
import toast from 'react-hot-toast'
import { Trash2Icon,ArrowLeftIcon } from 'lucide-react'

const NoteDetailPage = () => {
  const navigate = useNavigate();
  const [title,setTitle] = useState("")
  const [content,setContent] = useState("")
  const [loading,setLoading] = useState(false)
  const [notes,setNotes] = useState([])
  const [init_title,setinit_title] = useState("")
  const [init_content,setinit_content] = useState("")
  const handleSubmit = async (e) =>{
    e.preventDefault();
    console.log(title)
    console.log(content)
    if (!title.trim() || !content.trim()){
      toast.error('All fields are required');
    }
    setLoading(true);
    try {
    await api.put(`/notes/${id}`,{
      title,content
    })
    navigate("/")    
    } catch (error) {
      console.log(error)
    }
    
    
  }
  const  handleDelete =  async(e,id) =>{
    e.preventDefault()

    if (!window.confirm("Are you sure that you want to delete this Note? ")){
      return ;
    }
    try {
      await api.delete(`/notes/${id}`)
      setNotes((prev) => prev.filter(note => note._id != id))
      toast.success("Deleted Note")
      navigate("/")
    } catch (error) {
      toast.error("Error while deleted Note")
      console.log(error)
    }
     
  }
  const [note,setNote] = useState(false)
  const [saving,setSaving] = useState(false)

  const {id} = useParams();
  const fetchNote = async () =>{
    try {
      const res =await api.get(`/notes/${id}`)
      setNote(res.data)
      console.log(res.data)
      setContent(res.data.content)
      setTitle(res.data.title)
      const {title,content} = res.data
    } catch (error) {
      toast.error('Cannot get note')
      console.log(error)
    }
    finally{
      setLoading(false)
    }

    
  }
  useEffect(()=>{
    fetchNote();

  },[id])

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="btn btn-ghost">
          <ArrowLeftIcon className="size-5 btn btn-ghost"/>
          Back to Notes
          </Link>
          <button onClick={(e)=>{handleDelete(e,note._id)}} className="btn btn-error btn-outline">
            <Trash2Icon className="size-5"/>
            Delete Note
          </button>
        </div>
        <div className="max-w-2l mx-auto">
                    <div className='card bg-base-100'>
                      <div className="card-body">
                        <h2 className="form-control text-2xl mb-4"> Edit Note </h2>
                          <form onSubmit={handleSubmit}>
                            <div className="form-control mb-4">
                              <label className="label">
                                <span className="label-text">
                                  Title
                                </span>
                              </label>
                              <input type="text" 
                              placeholder={title}
                              className='input input-bordered'
                              value={title}
                              onChange={(e)=>setTitle(e.target.value)}
                              />
                            </div>
                            <div className="form-control mb-4">
                              <label className="label">
                                <span className="label-text">
                                  Content
                                </span>
                              </label>
                              <textarea 
                              placeholder={content}
                              className='input input-bordered'
                              value={content}
                              onChange={(e)=>setContent(e.target.value)}
                              />
                            </div> 
                            <div className="card-actions justify-end">
                            <button type='submit' className="btn btn-primary">Edit Note</button>
        
                            </div>
                            
                          </form>
                      </div>
                    </div>
                </div>

      </div>

      
    </div>
  )
}

export default NoteDetailPage
