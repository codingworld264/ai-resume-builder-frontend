import { useEffect, useState } from 'react'
import useApi from '../hooks/useApi';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import { Link } from 'react-router-dom';

const Home = () => {
    const { request, loading, error } = useApi();
    const { request:requestDelete, loading:loadingDelete, error:errorDelete } = useApi();
    const [allResume, setAllResume] =   useState([]);

    useEffect(() => {
        const fetchAll = async() => {
            const response = await request("GET", "resume/all");
            if(response?.status){
                setAllResume(response?.data)
            }
        }
        fetchAll();
    },[])

    const handleDelete = async(id) => {
       const response = await requestDelete("DELETE", `resume/${id}`);
       if(response?.status){
            toast.success(response?.message);
            setAllResume(prev => {
                return prev.filter(resume => resume?._id !== response?.id)
            })
       }
    }
  return (
    <div>
      All Resumes

      <Link to="/resume">Generate New Resume</Link>

      {allResume?.length ? (
        allResume.map((resume, i) => (
            <div key={i}>
                <button type="button" onClick={() => handleDelete(resume?._id)}>Delete</button>
                <button type="button" onClick={() => {
                    const pdf = new jsPDF();
                    const element = document.getElementById(`resume_${i}`);

                    pdf.html(element, {
                                        callback: function (doc) {
                                            doc.save("resume.pdf");
                                        },
                                        margin: [10, 10, 10, 10], 
                                        autoPaging: "text",
                                        x: 10,
                                        y: 10,
                                        width: 190,
                                        windowWidth: element.scrollWidth
                    });
                }}>Download</button>
                <div
                    id={`resume_${i}`}
                    dangerouslySetInnerHTML={{ __html: resume?.content }}
                ></div>
            </div>
        ))
      ):(
        <p>No resume yet.</p>
      )}
      
    </div>
  )
}

export default Home
