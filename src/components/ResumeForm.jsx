import { useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import { TagsInput } from "react-tag-input-component";
import jsPDF from "jspdf";
import useApi from '../hooks/useApi';

const ResumeForm = () => {
    
    const {
        register,
        handleSubmit,
        formState:{errors},
        control,
        reset 
    } = useForm();

    const [skills, setSkills] = useState([]);
    const { request, loading, error } = useApi();
    const [content, setContent] = useState("");

    const onSubmit = async(data) => {

        const formData = {
            ...data,
            skills:skills?.join(", ")
        }

        const response = await request("POST","/resume/generate",formData);
        if(response?.data?.content){
             setContent( response?.data?.content);
        }
    }
  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor='name'>Name</label>
                <input type="text" placeholder="Enter Name" name="name" id="name" {...register("name", {required:"Name is required", pattern:{
                    value: /^[A-Za-z]+( [A-Za-z]+)*$/,
                    message: "Please enter a valid name."
                }})}/>
                {errors?.name && (
                    <p>{errors?.name?.message}</p>
                )}
               
            </div>
            <div>
                <label htmlFor='skills'>Skills</label>
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
                        placeHolder="Enter skills"
                    />
                    )}
                />
               
                {errors?.skills && (
                    <p>{errors?.skills?.message}</p>
                )}
            </div>
             <div>
                <label htmlFor='experience'>Experience</label>
                <input type="text" placeholder="Enter Experience" name="experience" id="experience" {...register("experience",  {
                    required: "Experience is required",
                    pattern: {
                        value: /^[1-9][0-9]*$/,
                        message: "Please enter a valid experience must include positive number"
                    }
                })}/>
                {errors?.experience && (
                    <p>{errors?.experience?.message}</p>
                )}
            </div>
               <div>
                <label htmlFor='job'>Job</label>
                <input type="text" placeholder="Enter Job" name="job" id="job" {...register("job",{required:"Job is required"})}/>
                   {errors?.job && (
                     <p>{errors?.job?.message}</p>
                )}
            </div>
            <div>
                <button type="submit">{content ? "Re-generate":"Generate"}</button>
                <button type="button" onClick={() => {
                    reset();
                    setSkills([]);
                    setContent("");
                }}>Reset</button>
            </div>
        </form>
        {content && (
            <div>
                <button type="button" onClick={() => {
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
                }}>Download</button>
                Preview:
            <div
                id="resume"
                dangerouslySetInnerHTML={{ __html: content }}
            ></div>
            </div>
        )}
        
    </div>
  )
}

export default ResumeForm
