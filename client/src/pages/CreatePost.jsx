import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components"


const CreatePost = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', prompt: '', photo: '', })
    const [generatingImg, setGeneratingImg] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.prompt && form.photo) {
            setLoading(true);
            try {
                const response = await fetch('https://dalle-clone-project.onrender.com', {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(form)
                })

                await response.json();
                navigate("/")
            } catch (error) {
                alert(error)
            } finally {
                setLoading(false);
            }
        } else {
            alert("Please Enter Name and Prompt and Click Generate")
        }
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSurpriseMe = () => {
        const randomPrompt = getRandomPrompt(form.prompt);
        setForm({ ...form, prompt: randomPrompt })
    }

    const generateImage = async () => {
        if (form.prompt) {
            try {
                setGeneratingImg(true);
                const response = await fetch("https://dalle-clone-project.onrender.com", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ prompt: form.prompt })
                })
                const data = await response.json();
                setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` })
            } catch (error) {
                alert(error);
            } finally {
                setGeneratingImg(false);
            }
        } else {
            alert("Please Enter a Prompt")
        }
    }

    return (
        <section className="max-w-7xl mx-auto">
            <div>
                <h1 className="font-extrabold text-3xl">Create</h1>
                <p className="mt-3 text-[15px] text-[#666e75] w-full">Create imaginative and visually stunning images through DALL-E AI and share them with the community</p>
            </div>

            <form className="mt-16 max-w-31" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-5">
                    <FormField
                        LabelName="Your name"
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={form.name}
                        handleChange={handleChange}
                    />
                    <FormField
                        LabelName="Prompt"
                        type="text"
                        name="prompt"
                        placeholder='A plush toy robot sitting against a yellow wall'
                        value={form.prompt}
                        handleChange={handleChange}
                        isSurpriseMe
                        handleSurpriseMe={handleSurpriseMe}
                    />
                    <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
                        {form.photo ? (
                            <img src={form.photo} alt={form.prompt} className="w-full h-full object-contain" />
                        ) : (
                                <img src={preview} alt="preview" className="w-40 h-40 object-contain opacity-40" />
                            )}
                        {generatingImg && (
                            <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0, 0, 0, 0.5)]">
                                <Loader />
                            </div>
                        )}
                    </div>
                </div>
                <div className="mt-5 flex gap-5">
                    <button type="button"
                        className="bg-green-700 text-white font-medium rounded-lg text-sm w-full px-5 py-2.5"
                        onClick={generateImage}>
                        {generatingImg ? "Generating..." : "Generate"}</button>
                </div>
                <div className="mt-10">
                    <p className="mt-2 text-[#666e75] text-[14px]">Once you have created your image, you can share it with other in the community</p>
                    <button type="submit" className="w-full mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm px-5 py-2.5 text-center">
                        {loading ? "Sharing..." : "Share with the Community"}
                    </button>
                </div>
            </form>
        </section>
    )
}

export default CreatePost