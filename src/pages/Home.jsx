import { useEffect, useState } from 'react'
import useApi from '../hooks/useApi';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

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
    <>
        <Navbar/>
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="page-title">My Resumes</h3>

                <Link to="/resume/create" className="create-resume-link">
                + Create Resume
                </Link>
            </div>
            <div className="row">
                {allResume?.length ? (
                    allResume.map((resume, i) => (
                        <div className="col-md-4 mb-4"  key={i}>
                            <div className="card resume-card p-3">
                                <h5>MERN Developer Resume</h5>
                                <p className="text-muted">Created on: 27 Feb 2026</p>

                                <div className="mt-3">
                                <button type="button" className="btn btn-primary btn-sm me-2" onClick={() => {
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
                                    }}>
                                    Download
                                </button>

                                <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDelete(resume?._id)}>
                                    Delete
                                </button>
                                </div>

                                  <div
                                    id={`resume_${i}`}
                                    dangerouslySetInnerHTML={{ __html: resume?.content }}
                                ></div>
                            </div>
                        </div>
                       
                    ))
                ):(
                    <p>No resume yet.</p>
                )}
            </div>
        </div>
    </>
  )
}

export default Home
