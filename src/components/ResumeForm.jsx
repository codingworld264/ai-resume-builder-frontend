import { useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import { TagsInput } from "react-tag-input-component";
import jsPDF from "jspdf";
import useApi from '../hooks/useApi';
import { toast } from 'react-toastify';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const ResumeForm = () => {
    
    const {
        register,
        handleSubmit,
        formState:{errors},
        control,
        reset 
    } = useForm();
    const navigate = useNavigate();
    const [skills, setSkills] = useState([]);
    const { request, loading, error } = useApi();
    const [content, setContent] = useState("");

    const onSubmit = async(data) => {

        const formData = {
            ...data,
            skills:skills?.join(", ")
        }

        const response = await request("POST","/resume/generate",formData);
        if(response?.status){
            toast.success(response?.message)
            setContent( response?.data?.content || "");
        }
    }
  return (
    <>
        <Navbar/>
        <div className="container mt-5 mb-5">
            <div className="card create-resume-card p-4">
                <div className="mb-3">
                    <button
                        type="button"
                        className="btn btn-outline-light btn-sm"
                        onClick={() => navigate(-1)}
                    >
                        ← Back
                    </button>
                </div>
                <h3 className="mb-4 text-center">Create Resume</h3>

                <form onSubmit={handleSubmit(onSubmit)}>

                {/* Name */}
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                    type="text"
                    placeholder="Enter Name"
                    className="form-control"
                    {...register("name", {
                        required: "Name is required",
                        pattern: {
                        value: /^[A-Za-z]+( [A-Za-z]+)*$/,
                        message: "Please enter a valid name."
                        }
                    })}
                    />
                    {errors?.name && (
                    <p className="error-text">{errors?.name?.message}</p>
                    )}
                </div>

                {/* Skills */}
                <div className="mb-3">
                    <label className="form-label" htmlFor="skills">Skills</label>

                    <div className="tags-container">
                        <Controller
                        name="skills"
                        control={control}
                        defaultValue={[]}
                        rules={{
                            validate: (value) =>
                            value.length > 0 || "Please add at least one skill"
                        }}
                        render={({ field }) => (
                            <TagsInput
                            value={skills}
                            onChange={(value) => {
                                setSkills(value);
                                field.onChange(value);
                            }}
                            name="skills"
                            placeHolder="Type skill and press enter"
                            />
                        )}
                        />
                    </div>

                    {errors?.skills && (
                        <p className="error-text">{errors?.skills?.message}</p>
                    )}
                </div>

                {/* Experience */}
                <div className="mb-3">
                    <label htmlFor="experience" className="form-label">Experience (Years)</label>
                    <input
                    type="text"
                    placeholder="Enter Experience"
                    className="form-control"
                    {...register("experience", {
                        required: "Experience is required",
                        pattern: {
                        value: /^[1-9][0-9]*$/,
                        message: "Please enter valid positive number"
                        }
                    })}
                    />
                    {errors?.experience && (
                    <p className="error-text">{errors?.experience?.message}</p>
                    )}
                </div>

                {/* Job */}
                <div className="mb-4">
                    <label htmlFor="job" className="form-label">Job Title</label>
                    <input
                    type="text"
                    placeholder="Enter Job"
                    className="form-control"
                    {...register("job", {
                        required: "Job is required"
                    })}
                    />
                    {errors?.job && (
                    <p className="error-text">{errors?.job?.message}</p>
                    )}
                </div>

                {/* Buttons */}
                <div className="d-flex gap-3">
                    <button type="submit" className="btn btn-gradient">
                    {content ? "Re-generate" : "Generate"}
                    </button>

                    <button
                    type="button"
                    className="btn btn-outline-light"
                    onClick={() => {
                        reset();
                        setSkills([]);
                        setContent("");
                    }}
                    >
                    Reset
                    </button>
                </div>
                </form>
            </div>

            {/* Preview Section */}
            {content && (
                <div className="card preview-card p-4 mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4>Preview</h4>
                    <button
                    type="button"
                    className="btn btn-gradient"
                    onClick={() => {
                        const pdf = new jsPDF();
                        const element = document.getElementById("resume");

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
                    }}
                    >
                    Download PDF
                    </button>
                </div>

                <div id="resume" className="resume-preview">
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>
                </div>
            )}
            </div>
    </>
  )
}

export default ResumeForm
